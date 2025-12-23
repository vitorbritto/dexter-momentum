Caching é a técnica de **armazenar dados temporariamente** em um local de acesso rápido para reduzir latência, diminuir carga em sistemas de origem e melhorar a experiência do usuário. Em sistemas distribuídos e de alta escala, cache não é otimização — é parte da arquitetura.

## Tipos de Cache

Existem diferentes tipos de cache, aplicados em camadas distintas da aplicação. Cada um resolve um problema específico.

### Database Cache

Usado para reduzir leituras repetidas no banco de dados.

**Onde acontece:**

- Redis
- Memcached
- Cache interno do próprio banco

**O que costuma ser cacheado:**

- Queries frequentes
- Agregações custosas
- Dados de leitura intensa

**Vantagens:**

- Reduz carga no banco
- Melhora tempo de resposta
- Escala melhor leitura

**Cuidados:**

- Invalidação de cache
- Consistência dos dados
- TTL bem definido

### CDN Cache

Cache voltado para conteúdo distribuído globalmente.

**Onde acontece:**

- Cloudflare
- AWS CloudFront

**O que é cacheado:**

- Imagens
- CSS / JS
- HTML estático
- APIs públicas (em alguns casos)

**Vantagens:**

- Baixa latência geográfica
- Reduz tráfego no backend
- Alta disponibilidade

**Cuidados:**

- Controle de headers (`Cache-Control`)
- Cache busting
- Conteúdo dinâmico

### Web Cache

Cache aplicado na camada de aplicação web ou HTTP.

**Onde acontece:**

- Browser
- Reverse proxy (Nginx, Varnish)
- API Gateway

**Exemplos:**

- Cache de responses HTTP
- ETags
- `If-None-Match`

**Vantagens:**

- Reduz chamadas repetidas
- Melhora UX
- Menos custo de infra

---

### General Cache

Cache genérico usado para qualquer tipo de dado.

**Exemplos:**

- Feature flags
- Configurações
- Permissões
- Resultados de cálculo

**Ferramentas comuns:**

- Redis
- In-memory cache
- LRU cache

**Uso típico:**

- Cache-aside
- Read-through
- Write-through

### Storage Management Cache

Cache aplicado sobre sistemas de armazenamento.

**Exemplos:**

- Cache de arquivos
- Cache de blobs
- Cache local para S3 ou GCS

**Cenários comuns:**

- Downloads frequentes
- Processamento de arquivos
- Sistemas de mídia

## Boas Práticas

- Definir TTL adequado para cada tipo de dado
- Entender o custo de inconsistência
- Evitar cache eterno
- Monitorar hit rate
- Implementar invalidação explícita quando necessário
- Preferir dados imutáveis
- Não cachear tudo sem critério
- Tratar cache como camada descartável

## Conclusão

O uso de caching é uma decisão arquitetural. Quando bem aplicado, melhora performance e reduz custo. Mas quando mal aplicado, cria bugs difíceis de rastrear.

Cache acelera, mas **consistência sempre cobra seu preço**.
