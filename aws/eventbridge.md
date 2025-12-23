# Amazon EventBridge

Amazon EventBridge (anteriormente CloudWatch Events) é um serviço de barramento de eventos serverless que facilita a conexão de aplicações usando dados de eventos. Ele permite que você construa aplicações orientadas a eventos usando eventos de suas próprias aplicações, aplicações de software como serviço (SaaS) integradas e serviços AWS.

## Características Principais

### Barramento de Eventos Serverless

EventBridge é totalmente gerenciado e serverless. Você não precisa provisionar ou gerenciar servidores, e ele escala automaticamente.

### Múltiplas Fontes de Eventos

EventBridge pode receber eventos de:
- **Aplicações customizadas**: Seus próprios aplicativos
- **Serviços AWS**: Lambda, S3, EC2, DynamoDB, etc.
- **SaaS Partners**: Integrações com parceiros (Datadog, PagerDuty, etc.)
- **EventBridge Schemas**: Schemas para validação e descoberta

### Roteamento Baseado em Regras

EventBridge usa regras para rotear eventos para targets (destinos) baseado no conteúdo do evento.

### Integração com Serviços AWS

Integração nativa com mais de 20 serviços AWS, permitindo criar arquiteturas orientadas a eventos.

## Conceitos Fundamentais

### Event Bus

Um event bus recebe eventos. EventBridge fornece:
- **Default event bus**: Para eventos de serviços AWS
- **Custom event buses**: Para suas próprias aplicações
- **Partner event buses**: Para integrações SaaS

### Events

Eventos são representações JSON de algo que aconteceu:
```json
{
  "version": "0",
  "id": "event-id",
  "detail-type": "Order Placed",
  "source": "com.mycompany.order",
  "account": "123456789012",
  "time": "2024-01-15T10:30:00Z",
  "region": "us-east-1",
  "resources": [],
  "detail": {
    "orderId": "12345",
    "customerId": "67890",
    "amount": 99.99
  }
}
```

### Rules

Regras definem como eventos são roteados:
- **Event pattern**: Filtra quais eventos correspondem à regra
- **Targets**: Para onde enviar eventos correspondentes
- **Transformations**: Transformar eventos antes de enviar

### Targets

Targets são destinos para eventos:
- **Lambda**: Executar função
- **SQS**: Enviar para fila
- **SNS**: Enviar notificação
- **Step Functions**: Iniciar state machine
- **EventBridge**: Enviar para outro event bus
- **API Destination**: Chamar API HTTP
- **ECS Task**: Executar task
- **Batch Job**: Executar job
- **Kinesis**: Enviar para stream
- **SageMaker**: Executar pipeline

## Event Patterns

Event patterns filtram eventos baseado em conteúdo:

### Exemplo Simples

```json
{
  "source": ["com.mycompany.order"],
  "detail-type": ["Order Placed"]
}
```

### Exemplo com Filtros Avançados

```json
{
  "source": ["com.mycompany.order"],
  "detail-type": ["Order Placed"],
  "detail": {
    "amount": [{
      "numeric": [">", 100]
    }],
    "customerId": ["12345", "67890"]
  }
}
```

### Operadores Suportados

- `equals`: Igualdade exata
- `prefix`: Prefixo
- `suffix`: Sufixo
- `exists`: Campo existe
- `numeric`: Comparações numéricas (>, <, >=, <=)
- `anything-but`: Excluir valores

## Integração com Serviços AWS

### Eventos Automáticos

Muitos serviços AWS emitem eventos automaticamente:

**S3**:
```json
{
  "source": ["aws.s3"],
  "detail-type": ["Object Created"]
}
```

**DynamoDB**:
```json
{
  "source": ["aws.dynamodb"],
  "detail-type": ["Table Stream Record"]
}
```

**EC2**:
```json
{
  "source": ["aws.ec2"],
  "detail-type": ["EC2 Instance State-change Notification"]
}
```

### Exemplo: Processar Upload de S3

```javascript
// Lambda function triggered by EventBridge
exports.handler = async (event) => {
  const bucket = event.detail.bucket.name;
  const key = event.detail.object.key;
  
  console.log(`Processando: s3://${bucket}/${key}`);
  // Processar arquivo
};
```

## Custom Events

Envie eventos de suas próprias aplicações:

```javascript
const AWS = require('aws-sdk');
const eventbridge = new AWS.EventBridge();

await eventbridge.putEvents({
  Entries: [{
    Source: 'com.mycompany.order',
    DetailType: 'Order Placed',
    Detail: JSON.stringify({
      orderId: '12345',
      customerId: '67890',
      amount: 99.99
    })
  }]
}).promise();
```

## Event Transformations

Transforme eventos antes de enviar para targets:

### Input Transformer

```json
{
  "InputPath": "$.detail",
  "InputTemplate": "{\"orderId\":\"<orderId>\",\"amount\":<amount>}"
}
```

### Input Transformer com Múltiplos Campos

```json
{
  "InputPathsMap": {
    "orderId": "$.detail.orderId",
    "amount": "$.detail.amount"
  },
  "InputTemplate": "{\"id\":<orderId>,\"total\":<amount>}"
}
```

## Scheduled Events (Cron)

EventBridge pode agendar eventos usando expressões cron ou rate:

### Rate Expression

```javascript
// A cada 5 minutos
rate(5 minutes)

// A cada 1 hora
rate(1 hour)

// A cada 1 dia
rate(1 day)
```

### Cron Expression

```javascript
// Todos os dias às 10:00 UTC
cron(0 10 * * ? *)

// Toda segunda-feira às 9:00 UTC
cron(0 9 ? * MON *)

// Primeiro dia do mês às 00:00 UTC
cron(0 0 1 * ? *)
```

### Exemplo: Lambda Agendada

```javascript
// Lambda executada a cada hora
exports.handler = async (event) => {
  console.log('Executando tarefa agendada');
  // Executar lógica
};
```

## EventBridge Schemas

Schemas definem a estrutura de eventos:
- **Descoberta**: Descobrir schemas de eventos existentes
- **Validação**: Validar eventos contra schemas
- **Geração de código**: Gerar código a partir de schemas
- **Documentação**: Documentar estrutura de eventos

### Usar Schema Registry

```javascript
const schemas = new AWS.Schemas();

// Descobrir schema
const schema = await schemas.describeSchema({
  RegistryName: 'my-registry',
  SchemaName: 'OrderPlaced'
}).promise();
```

## API Destinations

API Destinations permitem chamar APIs HTTP externas:

### Configuração

1. Criar Connection (com autenticação)
2. Criar API Destination
3. Criar Rule que usa API Destination como target

### Exemplo

```javascript
// EventBridge chama API externa quando evento ocorre
// Configurado via console ou CloudFormation
```

## Arquitetura Orientada a Eventos

### Padrão Pub/Sub

```
Aplicação → EventBridge → Múltiplos Targets
```

### Padrão Fan-Out

```
Um evento → EventBridge → Múltiplas regras → Múltiplos targets
```

### Padrão Event Sourcing

```
Eventos são a fonte da verdade
Aplicação → EventBridge → Múltiplos consumidores
```

## Boas Práticas

### Design de Eventos

1. **Use estrutura consistente**: Facilita processamento
2. **Inclua metadados relevantes**: Timestamp, source, etc.
3. **Mantenha eventos pequenos**: Evite payloads grandes
4. **Versionamento**: Inclua versão no evento para evolução

### Event Patterns

1. **Seja específico**: Filtros específicos são mais eficientes
2. **Use múltiplas regras**: Separe lógica por regra
3. **Teste patterns**: Valide que patterns funcionam corretamente
4. **Documente patterns**: Facilita manutenção

### Performance

1. **Use batch quando possível**: Agrupe eventos relacionados
2. **Monitore throttling**: Ajuste rate limits se necessário
3. **Use dead-letter queues**: Para eventos que falharam
4. **Otimize transformations**: Evite transformações complexas

### Segurança

1. **Use IAM policies**: Controle acesso a event buses
2. **Valide eventos**: Use schemas para validação
3. **Criptografe dados sensíveis**: Não envie dados sensíveis em eventos
4. **Use VPC endpoints**: Para acesso privado

### Monitoramento

1. **Use CloudWatch Metrics**: Monitore invocações, erros
2. **Configure alarmes**: Para falhas e throttling
3. **Use CloudWatch Logs**: Para debugging
4. **Rastreie eventos**: Use X-Ray para rastreamento

## Casos de Uso

- **Microserviços**: Comunicação entre serviços
- **ETL Pipelines**: Processamento de dados
- **Automação**: Tarefas agendadas e workflows
- **Integração SaaS**: Conectar com serviços externos
- **Event Sourcing**: Arquitetura baseada em eventos
- **Notificações**: Alertas e notificações em tempo real
- **Orquestração**: Coordenar múltiplos serviços
- **Auditoria**: Rastrear eventos do sistema

## Exemplo Completo: Sistema de Pedidos

```javascript
// 1. Aplicação envia evento quando pedido é criado
await eventbridge.putEvents({
  Entries: [{
    Source: 'com.mycompany.order',
    DetailType: 'Order Created',
    Detail: JSON.stringify({
      orderId: '12345',
      customerId: '67890',
      amount: 99.99,
      items: [...]
    })
  }]
}).promise();

// 2. Regra 1: Enviar email de confirmação (Lambda)
// Pattern: source = "com.mycompany.order", detail-type = "Order Created"

// 3. Regra 2: Atualizar estoque (Lambda)
// Pattern: source = "com.mycompany.order", detail-type = "Order Created"

// 4. Regra 3: Processar pagamento (Step Functions)
// Pattern: source = "com.mycompany.order", detail-type = "Order Created", amount > 100
```

