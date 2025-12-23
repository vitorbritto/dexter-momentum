# Amazon SNS (Simple Notification Service)

Amazon SNS é um serviço de mensageria pub/sub totalmente gerenciado que permite desacoplar microserviços, sistemas distribuídos e aplicações serverless. Ele permite enviar mensagens para um grande número de assinantes (subscribers) simultaneamente através de múltiplos protocolos.

## Características Principais

### Pub/Sub Serverless

SNS é totalmente gerenciado e serverless. Você não precisa provisionar ou gerenciar servidores, e ele escala automaticamente para lidar com qualquer volume de mensagens.

### Múltiplos Protocolos

SNS suporta múltiplos protocolos de entrega:
- **HTTP/HTTPS**: Webhooks
- **Email**: Email (texto e HTML)
- **SMS**: Mensagens de texto
- **SQS**: Filas SQS
- **Lambda**: Funções serverless
- **Mobile Push**: APNS, FCM, ADM, etc.

### Fan-Out

SNS permite enviar uma única mensagem para múltiplos assinantes simultaneamente, implementando o padrão fan-out.

### Alta Disponibilidade

SNS é altamente disponível e durável, garantindo entrega de mensagens mesmo em caso de falhas.

## Conceitos Fundamentais

### Topic

Um topic é um canal de comunicação para publicar mensagens. Cada topic tem:
- **ARN único**: Identificador único do topic
- **Nome**: Nome do topic
- **Políticas**: Controle de acesso

### Subscription

Uma subscription conecta um topic a um endpoint (destino):
- **Protocol**: Tipo de entrega (HTTP, email, SQS, Lambda, etc.)
- **Endpoint**: Destino da mensagem
- **Attributes**: Configurações específicas do protocolo

### Publisher

Componente que envia mensagens para um topic.

### Subscriber

Componente que recebe mensagens de um topic através de uma subscription.

## Operações Básicas

### Criar Topic

```javascript
const AWS = require('aws-sdk');
const sns = new AWS.SNS();

const params = {
  Name: 'my-topic'
};

const data = await sns.createTopic(params).promise();
console.log('Topic ARN:', data.TopicArn);
```

### Publicar Mensagem

```javascript
const params = {
  TopicArn: 'arn:aws:sns:region:account:my-topic',
  Message: JSON.stringify({
    default: 'Mensagem padrão',
    email: 'Versão para email',
    sms: 'Versão para SMS'
  }),
  MessageStructure: 'json',
  Subject: 'Assunto da mensagem' // Para email
};

await sns.publish(params).promise();
```

### Criar Subscription

```javascript
// Subscription para email
const params = {
  Protocol: 'email',
  TopicArn: 'arn:aws:sns:region:account:my-topic',
  Endpoint: 'user@example.com'
};

const data = await sns.subscribe(params).promise();
console.log('Subscription ARN:', data.SubscriptionArn);
```

### Confirmar Subscription (Email/SMS)

Para email e SMS, o assinante deve confirmar:

```javascript
// Usuário recebe email com link de confirmação
// Ou confirma via código SMS

// Confirmar programaticamente
await sns.confirmSubscription({
  TopicArn: 'arn:aws:sns:region:account:my-topic',
  Token: 'token-recebido-no-email'
}).promise();
```

## Protocolos de Entrega

### HTTP/HTTPS

Enviar mensagens para endpoints HTTP:

```javascript
const params = {
  Protocol: 'https',
  TopicArn: 'arn:aws:sns:region:account:my-topic',
  Endpoint: 'https://api.example.com/webhook'
};

await sns.subscribe(params).promise();
```

**Endpoint HTTP deve:**
- Retornar 200 OK para confirmar recebimento
- Validar assinatura da mensagem
- Processar mensagem rapidamente

### Email

Enviar mensagens por email:

```javascript
const params = {
  Protocol: 'email',
  TopicArn: 'arn:aws:sns:region:account:my-topic',
  Endpoint: 'user@example.com'
};

await sns.subscribe(params).promise();
```

### SMS

Enviar mensagens de texto:

```javascript
const params = {
  Protocol: 'sms',
  TopicArn: 'arn:aws:sns:region:account:my-topic',
  Endpoint: '+5511999999999'
};

await sns.subscribe(params).promise();
```

**Publicar SMS diretamente:**

```javascript
await sns.publish({
  PhoneNumber: '+5511999999999',
  Message: 'Sua mensagem aqui'
}).promise();
```

### SQS

Enviar mensagens para fila SQS:

```javascript
const params = {
  Protocol: 'sqs',
  TopicArn: 'arn:aws:sns:region:account:my-topic',
  Endpoint: 'arn:aws:sqs:region:account:my-queue'
};

await sns.subscribe(params).promise();
```

### Lambda

Invocar função Lambda:

```javascript
const params = {
  Protocol: 'lambda',
  TopicArn: 'arn:aws:sns:region:account:my-topic',
  Endpoint: 'arn:aws:lambda:region:account:function:MyFunction'
};

await sns.subscribe(params).promise();
```

**Lambda function:**

```javascript
exports.handler = async (event) => {
  for (const record of event.Records) {
    const message = JSON.parse(record.Sns.Message);
    console.log('Mensagem recebida:', message);
    // Processar mensagem
  }
};
```

### Mobile Push

Enviar notificações push para dispositivos móveis:

```javascript
// APNS (iOS)
const params = {
  Protocol: 'application',
  TopicArn: 'arn:aws:sns:region:account:my-topic',
  Endpoint: 'arn:aws:sns:region:account:endpoint/APNS/my-app/device-token'
};

await sns.subscribe(params).promise();
```

## Message Attributes

Adicione metadados estruturados às mensagens:

```javascript
const params = {
  TopicArn: 'arn:aws:sns:region:account:my-topic',
  Message: 'Mensagem principal',
  MessageAttributes: {
    'priority': {
      DataType: 'String',
      StringValue: 'high'
    },
    'category': {
      DataType: 'String',
      StringValue: 'order'
    },
    'amount': {
      DataType: 'Number',
      StringValue: '99.99'
    }
  }
};

await sns.publish(params).promise();
```

## Filter Policies

Filter policies permitem que subscriptions recebam apenas mensagens que correspondem a critérios específicos:

```javascript
// Criar subscription com filter policy
await sns.subscribe({
  Protocol: 'sqs',
  TopicArn: 'arn:aws:sns:region:account:my-topic',
  Endpoint: 'arn:aws:sqs:region:account:high-priority-queue',
  Attributes: {
    FilterPolicy: JSON.stringify({
      priority: ['high', 'critical']
    })
  }
}).promise();
```

### Operadores de Filtro

- **Exact match**: `"value"`
- **Anything-but**: `{"anything-but": "value"}`
- **Prefix**: `{"prefix": "pref"}`
- **Numeric**: `{"numeric": [">", 100]}`
- **Exists**: `{"exists": true}`

## Dead Letter Queues (DLQ)

Configure DLQ para capturar mensagens que falharam na entrega:

```javascript
await sns.subscribe({
  Protocol: 'https',
  TopicArn: 'arn:aws:sns:region:account:my-topic',
  Endpoint: 'https://api.example.com/webhook',
  Attributes: {
    RedrivePolicy: JSON.stringify({
      deadLetterTargetArn: 'arn:aws:sqs:region:account:dlq'
    })
  }
}).promise();
```

## Message Filtering

### Subscription Filter Policies

Filtrar mensagens na subscription:

```javascript
const filterPolicy = {
  store: ['store1', 'store2'],
  price: [{ numeric: ['>=', 100] }],
  category: [{ exists: true }]
};

await sns.setSubscriptionAttributes({
  SubscriptionArn: 'arn:aws:sns:...',
  AttributeName: 'FilterPolicy',
  AttributeValue: JSON.stringify(filterPolicy)
}).promise();
```

## Segurança

### IAM Policies

Controle acesso usando IAM:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "sns:Publish",
        "sns:Subscribe"
      ],
      "Resource": "arn:aws:sns:region:account:my-topic"
    }
  ]
}
```

### Topic Policies

Políticas de topic para controle de acesso:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::account:user/username"
      },
      "Action": "SNS:Publish",
      "Resource": "arn:aws:sns:region:account:my-topic"
    }
  ]
}
```

### Encryption

- **Encryption at rest**: Criptografia usando AWS KMS
- **Encryption in transit**: HTTPS para HTTP endpoints
- **Message encryption**: Criptografar conteúdo da mensagem

## Integração com Outros Serviços

### S3 Events

S3 pode publicar eventos para SNS:

```javascript
// Configurado via S3 bucket notification
// Quando objeto é criado, S3 publica para SNS
```

### CloudWatch Alarms

CloudWatch pode enviar alarmes para SNS:

```javascript
// Configurado via CloudWatch alarm
// Quando alarm dispara, envia para SNS
```

### EventBridge

EventBridge pode enviar eventos para SNS como target.

### API Gateway

API Gateway pode invocar SNS via service integration.

## Monitoramento

### CloudWatch Metrics

Métricas automáticas incluem:
- **NumberOfMessagesPublished**: Mensagens publicadas
- **NumberOfNotificationsDelivered**: Notificações entregues
- **NumberOfNotificationsFailed**: Notificações falhadas
- **PublishSize**: Tamanho das mensagens publicadas

### CloudWatch Logs

Habilite logging para debugging:
- Logs de entrega de mensagens
- Logs de erros
- Logs de filter policies

## Boas Práticas

### Design de Topics

1. **Use topics específicos**: Separe por domínio/funcionalidade
2. **Nomeie claramente**: Facilita identificação
3. **Use filter policies**: Para reduzir mensagens desnecessárias
4. **Considere hierarquia**: Topics por ambiente (dev, prod)

### Mensagens

1. **Mantenha mensagens pequenas**: Máximo 256 KB
2. **Use JSON structure**: Para múltiplos formatos
3. **Inclua metadados**: Use message attributes
4. **Versionamento**: Inclua versão na mensagem

### Subscriptions

1. **Configure DLQ**: Para capturar falhas
2. **Use filter policies**: Para reduzir processamento
3. **Valide endpoints**: Certifique-se de que endpoints estão funcionando
4. **Monitore falhas**: Configure alarmes

### Segurança

1. **Use IAM policies**: Controle acesso granularmente
2. **Criptografe mensagens sensíveis**: Use KMS
3. **Valide assinaturas**: Para HTTP endpoints
4. **Use VPC endpoints**: Para acesso privado

### Performance

1. **Paralelize publicações**: Para alta throughput
2. **Use batch operations**: Quando disponível
3. **Monitore métricas**: Use CloudWatch
4. **Otimize filter policies**: Evite filtros complexos

### Custo

1. **Monitore uso**: Use Cost Explorer
2. **Otimize subscriptions**: Remova subscriptions não utilizadas
3. **Use filter policies**: Reduz processamento desnecessário
4. **Considere SQS**: Para casos que não precisam de fan-out

## Casos de Uso

- **Alertas e Notificações**: Alertas de sistema, notificações de aplicação
- **Fan-Out para Microserviços**: Distribuir eventos para múltiplos serviços
- **Mobile Push Notifications**: Notificações push para apps móveis
- **Email e SMS**: Comunicação com usuários
- **Workflow Orchestration**: Coordenar workflows
- **Event-Driven Architecture**: Arquitetura orientada a eventos
- **Monitoring e Alerting**: Alertas de CloudWatch, sistemas de monitoramento
- **Decoupling**: Desacoplar componentes de aplicação

## Padrões Comuns

### Pub/Sub Simples

```
Publisher → SNS Topic → Multiple Subscribers
```

### Fan-Out para SQS

```
Publisher → SNS Topic → Multiple SQS Queues → Workers
```

### Alerting

```
CloudWatch Alarm → SNS Topic → Email/SMS/Lambda
```

### Event Distribution

```
Application → SNS Topic → Lambda Functions (Multiple)
```

