# @agora/contracts

Contratos compartidos del ecosistema Agora — schemas Zod, fixtures HMAC, payloads sync, registry de paneles UI.

Consumido por:
- **AgoraFront** (Next.js / Vercel): valida payloads en bordes red/disco, registry de paneles del agente IA.
- **AgoraBack** (Express / Cloud Run): parsers para rutas `/api/*`, fixtures de tests.
- **AgoraWorker** (Docker): fixtures HMAC compartidas con el sync HTTP.

## Estructura

```
src/
  api-payloads.ts       Payloads HTTP request/response (zod)
  api-responses.ts      Tipos de respuestas comunes
  document-record.ts    Document Firestore + dotfile legacy
  forgejo.ts            Tipos del cliente Forgejo
  outbox.ts             Outbox para sync events
  result.ts             Result<T, E>
  sync-event.ts         Payload RTDB + parser
  sync-state.ts         Modelo formal de estados sync
  ui-panels.ts          Registry compartido de paneles agente IA
  worker-payloads.ts    Sync HTTP HMAC payloads
  index.ts              Exports

fixtures/
  st-integration.json   Casos ST consumidos por Front
  sync-events.json      RTDB events válidos/inválidos
  worker-hmac.json      Firmas HMAC compartidas Back↔Worker
```

## Build

```bash
npm run build      # tsc → dist/
npm run typecheck  # tsc --noEmit
```

## Cómo lo consumen los repos

Hoy los repos hermanos lo declaran como `file:../packages/agora-contracts` en su `package.json`:

```json
{
  "dependencies": {
    "@agora/contracts": "file:../packages/agora-contracts"
  }
}
```

Para desplegar en CI/Vercel/Cloud Run aislado, usar el flujo `prepare-deploy.mjs`
de cada repo consumidor — empaqueta este paquete con `npm pack` y lo deja como
tarball en `.tarballs/`.

## Reglas

- Cualquier dato que cruza red o disco debe validarse aquí, NO con `as Tipo` directo en el borde.
- Cambios breaking requieren bumping `version` y coordinar con consumidores antes de merge.
- Las fixtures (`fixtures/*.json`) son contrato versionado: cambiar fixture = breaking change.
