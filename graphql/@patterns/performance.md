# Performance

Otimizar a execução e entrega de respostas GraphQL.

## Client-side caching

Clientes podem implementar estratégias de cache no lado do cliente para melhorar performance e consistência da interface.

## GET requests for queries

Além de `POST`, GraphQL pode suportar `GET` em queries, permitindo cache HTTP/CDN. Para operações grandes, usam-se _persisted queries_ (hash da query).

## The N+1 Problem

Queries podem gerar múltiplas chamadas redundantes.

> Solução: **batching** com ferramentas como **DataLoader** para juntar requisições.

## Demand control

Evitar queries muito complexas usando:

- Paginação em listas
- Limite de profundidade/largura
- Análise de complexidade

## JSON (with GZIP)

Respostas usam JSON, que comprime bem com GZIP/deflate/brotli. Produção deve habilitar compressão.

## Performance monitoring

Monitorar APIs ao longo do tempo com métricas, traces e logs. **OpenTelemetry** é indicado para instrumentação e análise de gargalos.

## Recap

- Usar `GET` + queries persistidas para cache/CDN
- Resolver N+1 com batching/caching
- Controlar demanda com paginação, limites e rate limiting
- Habilitar GZIP para respostas JSON
- Monitorar performance com ferramentas como OpenTelemetry
