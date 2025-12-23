# Amazon SQS (Simple Queue Service)

Amazon SQS é um serviço de filas de mensagens totalmente gerenciado que permite desacoplar e escalar microserviços, sistemas distribuídos e aplicações serverless. SQS elimina a complexidade e overhead de gerenciar e operar filas de mensagens orientadas a middleware.

## Características Principais

### Totalmente Gerenciado

SQS é serverless e totalmente gerenciado. Você não precisa provisionar ou gerenciar servidores, e ele escala automaticamente.

### Confiabilidade

SQS garante que mensagens sejam entregues pelo menos uma vez e processadas de forma confiável, mesmo quando componentes falham.

### Escalabilidade

SQS pode processar qualquer volume de mensagens sem degradação de performance. Escala automaticamente conforme a demanda.

### Desacoplamento

SQS permite que componentes de aplicação se comuniquem de forma assíncrona, desacoplando produtores e consumidores.

## Tipos de Filas

### Standard Queues

- **Throughput ilimitado**: Suporta quase ilimitadas transações por segundo
- **At-least-once delivery**: Mensagens podem ser entregues mais de uma vez
- **Best-effort ordering**: Ordem não é garantida
- **Baixo custo**: Mais barato que FIFO

### FIFO Queues

- **Exactly-once processing**: Cada mensagem é processada exatamente uma vez
- **Ordering garantido**: Mensagens são processadas na ordem exata em que foram enviadas
- **Throughput limitado**: 3.000 mensagens por segundo (com batching: 3.000 TPS)
- **Deduplicação**: Previne mensagens duplicadas

## Conceitos Fundamentais

### Queue

Uma fila é um buffer que armazena mensagens. Cada fila tem:
- **Nome único**: Dentro de uma conta AWS e região
- **URL única**: Para acessar a fila
- **Configurações**: Visibility timeout, message retention, etc.

### Message

Uma mensagem é uma unidade de dados enviada para a fila:
- **Body**: Conteúdo da mensagem (até 256 KB)
- **Attributes**: Metadados sobre a mensagem
- **Message ID**: Identificador único

### Producer

Componente que envia mensagens para a fila.

### Consumer

Componente que recebe e processa mensagens da fila.

## Operações Básicas

### Enviar Mensagem

```javascript
const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

const params = {
  QueueUrl: 'https://sqs.region.amazonaws.com/account/queue-name',
  MessageBody: JSON.stringify({
    orderId: '12345',
    customerId: '67890',
    amount: 99.99
  })
};

await sqs.sendMessage(params).promise();
```

### Receber Mensagens

```javascript
const params = {
  QueueUrl: 'https://sqs.region.amazonaws.com/account/queue-name',
  MaxNumberOfMessages: 10,
  WaitTimeSeconds: 20 // Long polling
};

const data = await sqs.receiveMessage(params).promise();
if (data.Messages) {
  for (const message of data.Messages) {
    console.log('Mensagem:', message.Body);
    // Processar mensagem
  }
}
```

### Deletar Mensagem

Após processar com sucesso, delete a mensagem:

```javascript
const params = {
  QueueUrl: 'https://sqs.region.amazonaws.com/account/queue-name',
  ReceiptHandle: message.ReceiptHandle
};

await sqs.deleteMessage(params).promise();
```

## Visibility Timeout

Visibility timeout é o período durante o qual uma mensagem fica invisível após ser recebida:

- **Padrão**: 30 segundos
- **Máximo**: 12 horas
- **Propósito**: Prevenir que outros consumidores processem a mesma mensagem

### Extender Visibility Timeout

Se o processamento levar mais tempo:

```javascript
await sqs.changeMessageVisibility({
  QueueUrl: queueUrl,
  ReceiptHandle: message.ReceiptHandle,
  VisibilityTimeout: 300 // 5 minutos
}).promise();
```

## Dead Letter Queues (DLQ)

DLQs armazenam mensagens que não puderam ser processadas após múltiplas tentativas:

### Configuração

1. Criar fila DLQ
2. Configurar `maxReceiveCount` na fila principal
3. Mensagens que excederem `maxReceiveCount` são movidas para DLQ

### Exemplo

```javascript
// Configurar DLQ ao criar fila
const params = {
  QueueName: 'my-queue',
  Attributes: {
    'RedrivePolicy': JSON.stringify({
      deadLetterTargetArn: 'arn:aws:sqs:region:account:dlq-name',
      maxReceiveCount: 3
    })
  }
};

await sqs.createQueue(params).promise();
```

## Long Polling

Long polling reduz custos e latência ao aguardar até 20 segundos por mensagens:

```javascript
const params = {
  QueueUrl: queueUrl,
  WaitTimeSeconds: 20 // Long polling
};

const data = await sqs.receiveMessage(params).promise();
```

### Vantagens

- Reduz número de requisições vazias
- Reduz latência (mensagens chegam mais rápido)
- Reduz custos (menos requisições)

## Batch Operations

Envie ou receba múltiplas mensagens de uma vez:

### Send Batch

```javascript
const params = {
  QueueUrl: queueUrl,
  Entries: [
    {
      Id: '1',
      MessageBody: JSON.stringify({ id: 1, data: 'message1' })
    },
    {
      Id: '2',
      MessageBody: JSON.stringify({ id: 2, data: 'message2' })
    }
  ]
};

await sqs.sendMessageBatch(params).promise();
```

### Receive Batch

```javascript
const params = {
  QueueUrl: queueUrl,
  MaxNumberOfMessages: 10
};

const data = await sqs.receiveMessage(params).promise();
// Processar múltiplas mensagens
```

## Message Attributes

Atributos permitem adicionar metadados estruturados:

```javascript
const params = {
  QueueUrl: queueUrl,
  MessageBody: 'Mensagem principal',
  MessageAttributes: {
    'Author': {
      DataType: 'String',
      StringValue: 'John Doe'
    },
    'Priority': {
      DataType: 'Number',
      StringValue: '1'
    }
  }
};

await sqs.sendMessage(params).promise();
```

## FIFO Queues

### Características Especiais

- **Message Group ID**: Agrupa mensagens relacionadas
- **Message Deduplication ID**: Previne duplicatas
- **Sufixo `.fifo`**: Nome da fila deve terminar com `.fifo`

### Exemplo

```javascript
const params = {
  QueueUrl: 'https://sqs.region.amazonaws.com/account/queue.fifo',
  MessageBody: JSON.stringify({ orderId: '12345' }),
  MessageGroupId: 'orders', // Agrupa mensagens
  MessageDeduplicationId: 'unique-id-12345' // Previne duplicatas
};

await sqs.sendMessage(params).promise();
```

## Integração com Lambda

SQS pode invocar Lambda automaticamente:

### Configuração

1. Criar fila SQS
2. Configurar Lambda trigger
3. Lambda processa mensagens automaticamente

### Lambda Function

```javascript
exports.handler = async (event) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    console.log('Processando:', body);
    
    // Processar mensagem
    // Se sucesso, mensagem é deletada automaticamente
    // Se erro, mensagem fica visível novamente após visibility timeout
  }
};
```

## Integração com Outros Serviços

### S3 + SQS

S3 pode enviar eventos para SQS quando objetos são criados/deletados.

### EventBridge + SQS

EventBridge pode enviar eventos para SQS.

### API Gateway + SQS

API Gateway pode enviar requisições para SQS (via service integration).

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
        "sqs:SendMessage",
        "sqs:ReceiveMessage"
      ],
      "Resource": "arn:aws:sqs:region:account:queue-name"
    }
  ]
}
```

### Encryption

- **Encryption at rest**: SSE-S3 ou SSE-KMS
- **Encryption in transit**: HTTPS sempre

### VPC Endpoints

Use VPC endpoints para acesso privado sem passar pela internet pública.

## Monitoramento

### CloudWatch Metrics

Métricas automáticas incluem:
- **NumberOfMessagesSent**: Mensagens enviadas
- **NumberOfMessagesReceived**: Mensagens recebidas
- **NumberOfMessagesDeleted**: Mensagens deletadas
- **ApproximateNumberOfMessagesVisible**: Mensagens visíveis
- **ApproximateNumberOfMessagesNotVisible**: Mensagens em processamento
- **ApproximateNumberOfMessagesDelayed**: Mensagens atrasadas

### CloudWatch Alarms

Configure alarmes para:
- Fila crescendo (mensagens não processadas)
- Mensagens na DLQ
- Erros de processamento

## Boas Práticas

### Design de Filas

1. **Use Standard para alta throughput**: Se ordem não é crítica
2. **Use FIFO para ordem garantida**: Quando ordem é importante
3. **Configure DLQ**: Para capturar mensagens problemáticas
4. **Use long polling**: Reduz custos e latência

### Processamento

1. **Delete mensagens após processar**: Após sucesso confirmado
2. **Use idempotência**: Processamento deve ser idempotente
3. **Configure visibility timeout apropriado**: Baseado no tempo de processamento
4. **Processe em batch quando possível**: Mais eficiente

### Performance

1. **Use batch operations**: Reduz número de requisições
2. **Configure long polling**: Reduz requisições vazias
3. **Paralelize consumidores**: Para aumentar throughput
4. **Monitore métricas**: Use CloudWatch

### Segurança

1. **Use IAM policies**: Controle acesso granularmente
2. **Habilite encryption**: Para dados sensíveis
3. **Use VPC endpoints**: Para acesso privado
4. **Valide mensagens**: Sempre valide conteúdo

### Custo

1. **Use Standard quando possível**: Mais barato que FIFO
2. **Configure long polling**: Reduz requisições
3. **Delete mensagens rapidamente**: Reduz custos de armazenamento
4. **Monitore uso**: Use Cost Explorer

## Casos de Uso

- **Desacoplamento de Microserviços**: Comunicação assíncrona entre serviços
- **Processamento Assíncrono**: Tarefas que não precisam resposta imediata
- **Buffer de Requisições**: Absorver picos de tráfego
- **Work Queues**: Distribuir trabalho entre workers
- **Event Processing**: Processar eventos de sistemas
- **Fan-Out Pattern**: Distribuir mensagens para múltiplos consumidores
- **Retry Logic**: Reenviar mensagens que falharam
- **Scheduled Tasks**: Agendar tarefas para processamento futuro

## Padrões Comuns

### Producer-Consumer

```
Producer → SQS → Consumer
```

### Fan-Out

```
Producer → SQS → Múltiplos Consumers
```

### Priority Queue

```
High Priority Queue → Consumer
Low Priority Queue → Consumer
```

### Work Queue

```
Work Generator → SQS → Workers (Lambda/ECS)
```

