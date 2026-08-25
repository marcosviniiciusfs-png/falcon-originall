const META_PIXEL_ID = "1197021958481791";

type Fbq = (
  action: "init" | "track",
  eventOrPixel: string,
  parameters?: Record<string, unknown>,
  options?: { eventID?: string },
) => void;

declare global {
  interface Window {
    fbq?: Fbq & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
    };
    _fbq?: Window["fbq"];
  }
}

export const initializeMetaPixel = () => {
  if (!window.fbq) {
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue?.push(args);
    }) as Window["fbq"];

    if (!fbq) return;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  window.fbq?.("init", META_PIXEL_ID);
  window.fbq?.("track", "PageView");
};

export const trackLead = (eventId: string) => {
  window.fbq?.("track", "Lead", {}, { eventID: eventId });
};

export const createEventId = () =>
  `lead_${Date.now()}_${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;
