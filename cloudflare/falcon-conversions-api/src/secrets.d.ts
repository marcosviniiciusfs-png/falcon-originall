// Secrets cannot be inferred from wrangler.jsonc because their values and names
// are stored remotely. This declaration merges them into Wrangler's generated Env.
interface Env {
  META_CAPI_ACCESS_TOKEN: string;
  LEAD_DESTINATION_WEBHOOK_URL: string;
}
