# Security

Protegendo APIs GraphQL contra operações maliciosas.

## Transport layer security

- Usar HTTPS para queries/mutations.
- Controlar timeouts e cache seguro.
- Subscriptions geralmente via WebSockets/Server-Sent Events.

## Demand control

- **Trusted documents**: usar allowlist de queries (persisted queries) para clientes internos.
- **Paginated fields**: sempre paginar listas grandes.
- **Depth limiting**: limitar profundidade máxima das queries.
- **Breadth/batch limiting**: limitar número de campos de topo, aliases e operações em batch.
- **Rate limiting**: aplicar limites de taxa no nível de negócio ou rede.
- **Query complexity analysis**: atribuir peso a campos/tipos e rejeitar queries muito caras.

## Schema considerations

- Validar e sanitizar argumentos de entrada.
- Controlar introspecção em produção.
- Padronizar mensagens de erro sem expor detalhes internos.
- Implementar autenticação e autorização consistentes.

## Recap

- Use TLS/HTTPS.
- Controle demanda: paginação, profundidade, complexidade.
- Proteja schema: sanitize inputs, restrinja introspecção, masque erros.
- Sempre aplique autenticação e autorização robustas.
