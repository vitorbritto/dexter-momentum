# AWS Lambda

AWS Lambda é um serviço de computação serverless que permite executar código sem provisionar ou gerenciar servidores. Você paga apenas pelo tempo de computação consumido e o Lambda escala automaticamente, executando seu código em resposta a eventos ou requisições.

## Características Principais

### Serverless

Lambda elimina a necessidade de gerenciar servidores. Você apenas envia seu código e o Lambda cuida de tudo: provisionamento, escalabilidade, patches de segurança e monitoramento.

### Escalabilidade Automática

Lambda escala automaticamente de algumas requisições por dia a milhares por segundo. Cada execução é isolada e o Lambda distribui as requisições entre múltiplas instâncias.

### Modelo de Cobrança

Você paga apenas pelo tempo de computação consumido:
- Primeiros 1 milhão de requisições gratuitas por mês
- Cobrança por 100ms de tempo de execução
- Sem custos quando o código não está em execução

### Suporte a Múltiplas Linguagens

Lambda suporta:
- Node.js
- Python
- Java
- C# (.NET)
- Go
- Ruby
- Custom Runtime (qualquer linguagem)

## Conceitos Fundamentais

### Função Lambda

Uma função é o código que você escreve e executa no Lambda. Cada função tem:
- **Código fonte**: Seu código de aplicação
- **Handler**: Ponto de entrada da função
- **Runtime**: Ambiente de execução (Node.js, Python, etc.)
- **Configuração**: Memória, timeout, variáveis de ambiente, etc.

### Handler

O handler é a função que o Lambda invoca quando sua função é executada:

```javascript
// Node.js
exports.handler = async (event, context) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda!' })
  };
};
```

```python
# Python
def lambda_handler(event, context):
    print(f"Event: {event}")
    return {
        'statusCode': 200,
        'body': 'Hello from Lambda!'
    }
```

### Event Object

O objeto `event` contém dados sobre o evento que disparou a função. A estrutura varia dependendo do serviço que invocou o Lambda.

### Context Object

O objeto `context` fornece informações sobre o ambiente de execução:
- `requestId`: ID único da requisição
- `functionName`: Nome da função
- `functionVersion`: Versão da função
- `memoryLimitInMB`: Limite de memória
- `remainingTimeInMillis`: Tempo restante antes do timeout

## Fontes de Eventos (Triggers)

Lambda pode ser invocado por diversos serviços AWS:

### API Gateway
Criar APIs RESTful e WebSocket que invocam funções Lambda.

### S3
Executar código quando objetos são criados, atualizados ou deletados.

### DynamoDB Streams
Processar mudanças em tempo real em tabelas DynamoDB.

### SQS
Processar mensagens de filas.

### SNS
Responder a notificações.

### EventBridge
Executar código em resposta a eventos agendados ou de outros serviços.

### CloudWatch Events/Logs
Responder a métricas e logs.

### Cognito
Executar código durante fluxos de autenticação.

## Configuração

### Memória e CPU

Você aloca memória para sua função (128 MB a 10 GB). Lambda aloca CPU proporcionalmente à memória.

### Timeout

Tempo máximo de execução (até 15 minutos). Após o timeout, a execução é encerrada.

### Variáveis de Ambiente

Configure variáveis de ambiente para armazenar configurações:
- Credenciais (use Secrets Manager para sensíveis)
- URLs de APIs
- Flags de feature
- Configurações de ambiente

### VPC

Opcionalmente, configure sua função para acessar recursos em uma VPC (RDS, ElastiCache, etc.). Isso adiciona latência de cold start.

### Layers

Layers permitem compartilhar código e dependências entre múltiplas funções:
- Reduz tamanho do deployment
- Facilita reutilização
- Permite atualizar dependências sem redeployar funções

## Cold Start vs Warm Start

### Cold Start

Primeira execução ou após período de inatividade:
- Lambda precisa inicializar o runtime
- Pode levar alguns segundos
- Mais comum com funções não utilizadas frequentemente

### Warm Start

Execuções subsequentes:
- Runtime já está inicializado
- Muito mais rápido
- Lambda mantém instâncias "quentes" por um tempo

### Otimizações

- **Provisioned Concurrency**: Mantém instâncias sempre prontas
- **Minimize dependências**: Reduz tempo de inicialização
- **Use conexões persistentes**: Reutilize conexões de banco de dados
- **Escolha runtime apropriado**: Alguns são mais rápidos que outros

## Versionamento e Aliases

### Versões

Cada deploy cria uma nova versão imutável da função. Versões permitem:
- Rollback para versões anteriores
- Testes A/B
- Histórico de mudanças

### Aliases

Aliases são ponteiros para versões específicas:
- `$LATEST`: Versão mais recente (desenvolvimento)
- `PROD`: Aponta para versão de produção
- `STAGING`: Aponta para versão de staging

## Integração com Outros Serviços

### DynamoDB

```javascript
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const params = {
    TableName: 'Users',
    Item: {
      id: event.id,
      name: event.name,
      email: event.email
    }
  };
  
  await dynamodb.put(params).promise();
  return { statusCode: 200 };
};
```

### S3

```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;
    
    const object = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    // Processar objeto
  }
};
```

### API Gateway

```javascript
exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: 'Success',
      data: body
    })
  };
};
```

## Tratamento de Erros

### Retry Automático

Lambda retenta automaticamente em caso de erro para:
- Invocações assíncronas
- Streams (DynamoDB, Kinesis)
- SQS

### Dead Letter Queues (DLQ)

Configure uma DLQ para capturar eventos que falharam após múltiplas tentativas:

```javascript
exports.handler = async (event) => {
  try {
    // Processar evento
  } catch (error) {
    console.error('Erro:', error);
    throw error; // Lambda retentará ou enviará para DLQ
  }
};
```

## Monitoramento e Logging

### CloudWatch Logs

Lambda automaticamente envia logs para CloudWatch:
- `console.log()` / `print()` aparecem nos logs
- Cada execução gera um log stream
- Logs são retidos por padrão (configurável)

### CloudWatch Metrics

Métricas automáticas incluem:
- Invocações
- Duração
- Erros
- Throttles
- ConcurrentExecutions

### X-Ray

AWS X-Ray permite rastrear requisições através de múltiplos serviços:
- Visualizar tempo de execução
- Identificar gargalos
- Mapear arquitetura

## Boas Práticas

### Performance

1. **Minimize dependências**: Menos dependências = cold start mais rápido
2. **Use conexões persistentes**: Reutilize conexões de banco/HTTP
3. **Otimize código**: Evite operações desnecessárias
4. **Configure memória apropriadamente**: Mais memória = mais CPU

### Segurança

1. **Use IAM roles**: Conceda apenas permissões necessárias
2. **Armazene secrets no Secrets Manager**: Não hardcode credenciais
3. **Valide inputs**: Sempre valide dados de entrada
4. **Use VPC quando necessário**: Para recursos privados

### Custo

1. **Otimize duração**: Código mais rápido = menos custo
2. **Configure timeout apropriado**: Evite timeouts desnecessários
3. **Use provisioned concurrency com cuidado**: Pode aumentar custos
4. **Monitore uso**: Use CloudWatch para identificar otimizações

### Arquitetura

1. **Mantenha funções pequenas e focadas**: Single responsibility
2. **Use layers para dependências comuns**: Reduz duplicação
3. **Implemente idempotência**: Para operações críticas
4. **Trate erros adequadamente**: Use DLQ quando apropriado

## Casos de Uso

- **APIs Serverless**: Backend para aplicações web e móveis
- **Processamento de Dados**: ETL, transformação de dados
- **Automação**: Tarefas agendadas, limpeza de recursos
- **Microserviços**: Componentes de arquitetura serverless
- **IoT**: Processamento de dados de dispositivos
- **Chatbots**: Processamento de mensagens
- **Processamento de Imagens/Vídeo**: Thumbnails, transcodificação

