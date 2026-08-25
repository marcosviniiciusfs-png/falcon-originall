interface EventPayload {
  event_name: "Lead";
  event_id: string;
  event_source_url: string;
  lead_data: Record<string, unknown>;
  user_data?: {
    ph?: string;
    fn?: string;
    ln?: string;
    ct?: string;
    fbp?: string;
    fbc?: string;
  };
  custom_data?: Record<string, unknown>;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isEventPayload = (value: unknown): value is EventPayload => {
  if (!isRecord(value) || value.event_name !== "Lead") return false;
  return typeof value.event_id === "string" && value.event_id.length > 0 &&
    typeof value.event_source_url === "string" && value.event_source_url.length > 0 &&
    isRecord(value.lead_data);
};

const json = (body: unknown, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });

const normalize = (value = "") =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

const normalizePhone = (value = "") => {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("55") ? digits : `55${digits}`;
};

const sha256 = async (value: string) => {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const getCorsHeaders = (request: Request, env: Env) => {
  const origin = request.headers.get("Origin") ?? "";
  const allowed = env.ALLOWED_ORIGINS.split(",").map((item) => item.trim());
  if (!allowed.includes(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
};

const createMetaUserData = async (payload: EventPayload, request: Request) => {
  const user = payload.user_data ?? {};
  const userData: Record<string, string | string[]> = {
    client_ip_address: request.headers.get("CF-Connecting-IP") ?? "",
    client_user_agent: request.headers.get("User-Agent") ?? "",
  };

  if (user.ph) userData.ph = [await sha256(normalizePhone(user.ph))];
  if (user.fn) userData.fn = [await sha256(normalize(user.fn))];
  if (user.ln) userData.ln = [await sha256(normalize(user.ln))];
  if (user.ct) userData.ct = [await sha256(normalize(user.ct))];
  if (user.fbp) userData.fbp = user.fbp;
  if (user.fbc) userData.fbc = user.fbc;
  return userData;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(request.url);
      const cors = getCorsHeaders(request, env);

      if (url.pathname === "/health" && request.method === "GET") {
        return json({ ok: true, service: "falcon-conversions-api" });
      }

      if (url.pathname !== "/events") return json({ success: false, error: "Not found" }, 404);
      if (!cors) return json({ success: false, error: "Origin not allowed" }, 403);
      if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
      if (request.method !== "POST") return json({ success: false, error: "Method not allowed" }, 405, cors);

      const contentLength = Number(request.headers.get("Content-Length") ?? 0);
      if (contentLength > 64 * 1024) return json({ success: false, error: "Payload too large" }, 413, cors);

      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return json({ success: false, error: "Invalid JSON" }, 400, cors);
      }

      if (!isEventPayload(body)) return json({ success: false, error: "Invalid event payload" }, 400, cors);
      const payload = body;

      const metaUserData = await createMetaUserData(payload, request);
      const metaBody = {
      data: [{
        event_name: payload.event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: payload.event_id,
        event_source_url: payload.event_source_url,
        action_source: "website",
        user_data: metaUserData,
        custom_data: payload.custom_data ?? {},
      }],
      access_token: env.META_CAPI_ACCESS_TOKEN,
      };

      const [leadResult, metaResult] = await Promise.allSettled([
      fetch(env.LEAD_DESTINATION_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload.lead_data),
      }),
      fetch(`https://graph.facebook.com/${env.META_GRAPH_API_VERSION}/${env.META_PIXEL_ID}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metaBody),
      }),
      ]);

      const leadStatus = leadResult.status === "fulfilled" ? leadResult.value.status : 0;
      const metaStatus = metaResult.status === "fulfilled" ? metaResult.value.status : 0;
      const leadSuccess = leadResult.status === "fulfilled" && leadResult.value.ok;
      const metaSuccess = metaResult.status === "fulfilled" && metaResult.value.ok;

      console.log(JSON.stringify({
        message: "conversion event processed",
        event_id: payload.event_id,
        lead_success: leadSuccess,
        lead_status: leadStatus,
        meta_success: metaSuccess,
        meta_status: metaStatus,
      }));

      return json({
        success: leadSuccess,
        lead_webhook: { success: leadSuccess, status: leadStatus },
        meta: { success: metaSuccess, status: metaStatus },
      }, leadSuccess ? 200 : 502, cors);
    } catch (error) {
      console.error(JSON.stringify({
        message: "unhandled conversion API error",
        error: error instanceof Error ? error.message : "Unknown error",
      }));
      return json({ success: false, error: "Internal server error" }, 500);
    }
  },
} satisfies ExportedHandler<Env>;
