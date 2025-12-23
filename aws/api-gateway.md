# Amazon API Gateway

Amazon API Gateway é um serviço totalmente gerenciado que permite criar, publicar, manter, monitorar e proteger APIs REST, HTTP e WebSocket em qualquer escala. Ele atua como um ponto de entrada único para aplicações backend, gerenciando tarefas como autenticação, rate limiting, caching e monitoramento.

## Características Principais

### Totalmente Gerenciado

API Gateway é serverless, então você não precisa provisionar ou gerenciar servidores. Ele escala automaticamente para lidar com qualquer volume de tráfego.

### Múltiplos Tipos de API

- **REST APIs**: APIs RESTful tradicionais
- **HTTP APIs**: Versão simplificada e mais barata (suporta apenas integrações HTTP)
- **WebSocket APIs**: Conexões bidirecionais em tempo real

### Integração com Serviços AWS

API Gateway pode integrar com:
- **Lambda**: Funções serverless
- **DynamoDB**: Acesso direto ao banco de dados
- **HTTP Endpoints**: Qualquer endpoint HTTP público
- **AWS Services**: Outros serviços AWS via integração direta
- **Mock**: Respostas mockadas para desenvolvimento

## REST API vs HTTP API

### REST API

- Mais recursos e funcionalidades
- Suporta API Keys, autorizadores customizados
- Caching mais avançado
- Request/Response transformation
- Mais caro

### HTTP API

- Mais simples e rápido
- Menor latência
- Mais barato (até 70% mais econômico)
- Suporta CORS nativamente
- Integração simplificada com Lambda e HTTP

## Componentes

### Resources e Methods

- **Resource**: Representa um caminho na URL (ex: `/users`)
- **Method**: Verbo HTTP (GET, POST, PUT, DELETE, etc.)
- **Integration**: Como o método se conecta ao backend

### Endpoints

API Gateway cria endpoints HTTPS para sua API:
```
https://{api-id}.execute-api.{region}.amazonaws.com/{stage}/{resource-path}
```

### Stages

Stages são versões nomeadas da API (ex: `dev`, `staging`, `prod`):
- Permitem diferentes configurações por ambiente
- Cada stage tem sua própria URL
- Permitem versionamento

## Integrações

### Lambda Integration

Conecta métodos da API a funções Lambda:

```javascript
// Lambda function
exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Lambda!',
      path: event.path
    })
  };
};
```

### HTTP Integration

Conecta a qualquer endpoint HTTP:

```
https://api.example.com/users
```

### AWS Service Integration

Integração direta com serviços AWS (DynamoDB, S3, etc.) sem Lambda intermediário.

### Mock Integration

Retorna respostas mockadas para desenvolvimento e testes.

## Request e Response

### Request Flow

1. Cliente faz requisição para API Gateway
2. API Gateway valida requisição (autenticação, rate limiting)
3. Request é transformado (opcional)
4. Request é enviado para backend
5. Response é recebido do backend
6. Response é transformado (opcional)
7. Response é retornado ao cliente

### Mapping Templates

Templates VTL (Velocity Template Language) permitem transformar requests e responses:

```json
{
  "method": "$context.httpMethod",
  "path": "$context.resourcePath",
  "body": $input.json('$'),
  "headers": {
    #foreach($header in $input.params().header.keySet())
    "$header": "$input.params().header.get($header)"
    #end
  }
}
```

## Autenticação e Autorização

### API Keys

Chaves simples para identificar aplicações:
- Úteis para rate limiting e monitoramento
- Não são seguras por si só
- Devem ser combinadas com outros métodos

### IAM

Autenticação usando credenciais AWS IAM:
- Seguro e integrado com AWS
- Requer assinatura de requisições (SigV4)
- Ideal para acesso entre serviços AWS

### Cognito User Pools

Autenticação de usuários usando Amazon Cognito:
- Suporta login social (Google, Facebook, etc.)
- Gerenciamento de usuários
- Tokens JWT

### Lambda Authorizer

Autorizador customizado usando Lambda:
- Máxima flexibilidade
- Pode validar tokens customizados
- Pode integrar com sistemas externos

### Exemplo Lambda Authorizer

```javascript
exports.handler = async (event) => {
  const token = event.authorizationToken;
  
  // Validar token
  if (token === 'allow') {
    return {
      principalId: 'user123',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: event.methodArn
        }]
      }
    };
  }
  
  throw new Error('Unauthorized');
};
```

## Rate Limiting e Throttling

### Throttling

Limita número de requisições por segundo:
- **Burst**: Pico de requisições permitidas
- **Rate**: Taxa sustentada de requisições

### Quotas

Limita número total de requisições em um período (ex: por dia, mês).

### Usage Plans

Agrupa APIs e aplica limites:
- Associado a API Keys
- Permite diferentes limites para diferentes clientes
- Útil para monetização de APIs

## Caching

API Gateway pode cachear respostas para melhorar performance:

- **TTL**: Tempo de vida do cache
- **Cache Keys**: Parâmetros que definem cache único
- **Encryption**: Criptografia de dados em cache
- **Invalidation**: Invalidação manual ou automática

## CORS (Cross-Origin Resource Sharing)

HTTP API suporta CORS nativamente. Para REST API, configure headers:

```javascript
{
  "statusCode": 200,
  "headers": {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
  },
  "body": "..."
}
```

## WebSocket API

WebSocket permite comunicação bidirecional em tempo real:

### Route Selection

WebSocket usa routes para direcionar mensagens:
- `$connect`: Quando cliente conecta
- `$disconnect`: Quando cliente desconecta
- `$default`: Rota padrão
- Custom routes: Para lógica específica

### Exemplo WebSocket

```javascript
// $connect route handler
exports.handler = async (event) => {
  const connectionId = event.requestContext.connectionId;
  // Salvar connectionId no DynamoDB
  return { statusCode: 200 };
};

// Custom route handler
exports.handler = async (event) => {
  const message = JSON.parse(event.body);
  // Processar mensagem
  return { statusCode: 200 };
};
```

## Versionamento

### API Versioning

Crie múltiplas versões da API:
- `/v1/users`
- `/v2/users`

### Stage Variables

Variáveis que podem ser usadas em configurações:
- URLs de backend diferentes por stage
- Configurações de ambiente

## Monitoramento e Logging

### CloudWatch Metrics

Métricas automáticas incluem:
- Count: Número de requisições
- Latency: Tempo de resposta
- 4XXError: Erros do cliente
- 5XXError: Erros do servidor

### CloudWatch Logs

Habilite logging para:
- Requests e responses
- Erros
- Debugging

### X-Ray

Integração com AWS X-Ray para rastreamento distribuído:
- Visualizar latência
- Identificar gargalos
- Mapear arquitetura

## Boas Práticas

### Design de API

1. **Use recursos aninhados**: `/users/{userId}/posts`
2. **Siga convenções REST**: GET para ler, POST para criar, etc.
3. **Use status codes apropriados**: 200, 201, 400, 404, 500
4. **Documente sua API**: Use OpenAPI/Swagger

### Performance

1. **Habilite caching**: Para dados que não mudam frequentemente
2. **Use HTTP API quando possível**: Mais rápido e barato
3. **Otimize payloads**: Retorne apenas dados necessários
4. **Configure timeout apropriado**: Evite timeouts desnecessários

### Segurança

1. **Use HTTPS sempre**: API Gateway força HTTPS
2. **Implemente autenticação**: Escolha método apropriado
3. **Valide inputs**: Sempre valide dados de entrada
4. **Use rate limiting**: Prevenir abuso
5. **Configure CORS corretamente**: Não use `*` em produção

### Custo

1. **Use HTTP API quando possível**: Mais barato que REST API
2. **Configure cache**: Reduz chamadas ao backend
3. **Monitore uso**: Use CloudWatch para identificar otimizações
4. **Use API Keys com cuidado**: Podem aumentar custos

### Integração

1. **Use Lambda para lógica complexa**: API Gateway + Lambda é poderoso
2. **Considere integração direta**: Para casos simples (DynamoDB)
3. **Implemente tratamento de erros**: Retorne erros apropriados
4. **Use stages para ambientes**: Dev, staging, prod

## Casos de Uso

- **APIs RESTful**: Backend para aplicações web e móveis
- **Microserviços**: Gateway para múltiplos serviços
- **Serverless Applications**: Integração com Lambda
- **WebSocket Applications**: Chat, gaming, dashboards em tempo real
- **API Monetization**: Vender acesso a APIs
- **Legacy System Integration**: Expor sistemas legados como APIs modernas

## Exemplo Completo: API REST com Lambda

```javascript
// Lambda function
exports.handler = async (event) => {
  const method = event.httpMethod;
  const path = event.path;
  
  if (method === 'GET' && path === '/users') {
    // Buscar usuários
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ users: [...] })
    };
  }
  
  if (method === 'POST' && path === '/users') {
    const body = JSON.parse(event.body);
    // Criar usuário
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ user: {...} })
    };
  }
  
  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'Not Found' })
  };
};
```

