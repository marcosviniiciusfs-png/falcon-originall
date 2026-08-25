# Falcon Conversions API

Worker intermediário entre o simulador e a Meta Conversions API.

Secrets obrigatórios, cadastrados pelo Wrangler e nunca versionados:

```sh
npx wrangler secret put META_CAPI_ACCESS_TOKEN --config cloudflare/falcon-conversions-api/wrangler.jsonc
```

Deploy e validação:

```sh
npx wrangler deploy --config cloudflare/falcon-conversions-api/wrangler.jsonc --dry-run
npx wrangler deploy --config cloudflare/falcon-conversions-api/wrangler.jsonc
curl https://SEU-WORKER.workers.dev/health
```

Endpoint de produção:

```text
https://falcon-conversions-api.marcosviniicius-fs.workers.dev/events
```
