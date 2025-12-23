# AWS Step Functions

AWS Step Functions é um serviço de orquestração serverless que permite coordenar componentes distribuídos e microserviços usando workflows visuais. Você define workflows como máquinas de estado, e o Step Functions executa e escala automaticamente.

## Características Principais

### Orquestração Visual

Step Functions fornece uma interface visual para definir workflows complexos, facilitando visualização e depuração.

### Serverless

Totalmente gerenciado e serverless. Você não precisa provisionar ou gerenciar servidores, e ele escala automaticamente.

### Confiabilidade

Step Functions garante execução confiável de workflows:
- Retry automático em caso de falhas
- Tratamento de erros
- Histórico completo de execuções
- Idempotência

### Integração com Serviços AWS

Integração nativa com mais de 200 serviços AWS, incluindo Lambda, DynamoDB, S3, ECS, Batch, SageMaker, etc.

## Conceitos Fundamentais

### State Machine

Uma state machine é a definição do workflow. É escrita em JSON usando Amazon States Language (ASL).

### Execution

Uma execution é uma instância de uma state machine sendo executada. Cada execution tem um ARN único e mantém histórico completo.

### States

States são os blocos de construção de uma state machine:
- **Task**: Executa trabalho (Lambda, ECS, etc.)
- **Choice**: Decisão condicional
- **Parallel**: Execução paralela
- **Map**: Processar arrays
- **Wait**: Aguardar tempo ou timestamp
- **Succeed**: Sucesso
- **Fail**: Falha
- **Pass**: Transformar dados

## Amazon States Language (ASL)

ASL é a linguagem JSON usada para definir state machines:

### Exemplo Básico

```json
{
  "Comment": "Workflow simples",
  "StartAt": "HelloWorld",
  "States": {
    "HelloWorld": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Parameters": {
        "FunctionName": "HelloFunction",
        "Payload": {
          "message": "Hello from Step Functions!"
        }
      },
      "End": true
    }
  }
}
```

## Tipos de States

### Task State

Executa trabalho usando um resource:

```json
{
  "ProcessData": {
    "Type": "Task",
    "Resource": "arn:aws:states:::lambda:invoke",
    "Parameters": {
      "FunctionName": "ProcessDataFunction",
      "Payload": {
        "data.$": "$.inputData"
      }
    },
    "Next": "NextState"
  }
}
```

### Choice State

Decisão condicional baseada em dados:

```json
{
  "CheckValue": {
    "Type": "Choice",
    "Choices": [
      {
        "Variable": "$.value",
        "NumericGreaterThan": 100,
        "Next": "HighValue"
      },
      {
        "Variable": "$.value",
        "NumericLessThan": 10,
        "Next": "LowValue"
      }
    ],
    "Default": "NormalValue"
  }
}
```

### Parallel State

Executa múltiplos branches em paralelo:

```json
{
  "ProcessInParallel": {
    "Type": "Parallel",
    "Branches": [
      {
        "StartAt": "Task1",
        "States": {
          "Task1": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "End": true
          }
        }
      },
      {
        "StartAt": "Task2",
        "States": {
          "Task2": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "End": true
          }
        }
      }
    ],
    "End": true
  }
}
```

### Map State

Processa arrays de dados:

```json
{
  "ProcessItems": {
    "Type": "Map",
    "ItemsPath": "$.items",
    "MaxConcurrency": 10,
    "Iterator": {
      "StartAt": "ProcessItem",
      "States": {
        "ProcessItem": {
          "Type": "Task",
          "Resource": "arn:aws:states:::lambda:invoke",
          "End": true
        }
      }
    },
    "End": true
  }
}
```

### Wait State

Aguarda tempo ou timestamp:

```json
{
  "WaitForTime": {
    "Type": "Wait",
    "Seconds": 60,
    "Next": "NextState"
  }
}
```

```json
{
  "WaitUntil": {
    "Type": "Wait",
    "Timestamp": "2024-12-31T23:59:59Z",
    "Next": "NextState"
  }
}
```

## Integração com Lambda

### Invocar Lambda

```json
{
  "InvokeLambda": {
    "Type": "Task",
    "Resource": "arn:aws:states:::lambda:invoke",
    "Parameters": {
      "FunctionName": "MyFunction",
      "Payload": {
        "input.$": "$"
      }
    },
    "Next": "NextState"
  }
}
```

### Lambda Response

```javascript
// Lambda function
exports.handler = async (event) => {
  return {
    statusCode: 200,
    result: 'Success',
    data: event.input
  };
};
```

## Tratamento de Erros

### Retry

Configurar retry automático:

```json
{
  "ProcessData": {
    "Type": "Task",
    "Resource": "arn:aws:states:::lambda:invoke",
    "Retry": [
      {
        "ErrorEquals": ["Lambda.ServiceException", "Lambda.AWSLambdaException"],
        "IntervalSeconds": 2,
        "MaxAttempts": 3,
        "BackoffRate": 2.0
      }
    ],
    "Catch": [
      {
        "ErrorEquals": ["States.TaskFailed"],
        "Next": "HandleError"
      }
    ],
    "Next": "NextState"
  }
}
```

### Catch

Capturar e tratar erros:

```json
{
  "HandleError": {
    "Type": "Task",
    "Resource": "arn:aws:states:::lambda:invoke",
    "Parameters": {
      "FunctionName": "ErrorHandler",
      "Payload": {
        "error.$": "$.Error",
        "cause.$": "$.Cause"
      }
    },
    "End": true
  }
}
```

## Passagem de Dados

### Input e Output

Dados fluem entre states através de input e output:

```json
{
  "State1": {
    "Type": "Task",
    "Resource": "arn:aws:states:::lambda:invoke",
    "ResultPath": "$.result1",
    "Next": "State2"
  },
  "State2": {
    "Type": "Task",
    "Resource": "arn:aws:states:::lambda:invoke",
    "InputPath": "$.result1",
    "ResultPath": "$.result2",
    "End": true
  }
}
```

### Paths

- **InputPath**: Seleciona parte do input para enviar ao state
- **ResultPath**: Onde colocar o resultado
- **OutputPath**: Seleciona parte do output para passar adiante

## Express Workflows

Express Workflows são otimizados para:
- Alta frequência (milhões de execuções)
- Baixa duração (até 5 minutos)
- Custo reduzido
- Execução assíncrona

### Standard vs Express

**Standard**:
- Duração até 1 ano
- Histórico completo
- Execução síncrona
- Melhor para workflows longos

**Express**:
- Duração até 5 minutos
- Histórico limitado
- Execução assíncrona
- Melhor para alta frequência

## Integração com Outros Serviços

### DynamoDB

```json
{
  "PutItem": {
    "Type": "Task",
    "Resource": "arn:aws:states:::dynamodb:putItem",
    "Parameters": {
      "TableName": "MyTable",
      "Item": {
        "id": {
          "S.$": "$.id"
        },
        "data": {
          "S.$": "$.data"
        }
      }
    },
    "End": true
  }
}
```

### S3

```json
{
  "GetObject": {
    "Type": "Task",
    "Resource": "arn:aws:states:::aws-sdk:s3:getObject",
    "Parameters": {
      "Bucket": "my-bucket",
      "Key.$": "$.objectKey"
    },
    "End": true
  }
}
```

### ECS

```json
{
  "RunTask": {
    "Type": "Task",
    "Resource": "arn:aws:states:::ecs:runTask",
    "Parameters": {
      "Cluster": "my-cluster",
      "TaskDefinition": "my-task-def",
      "LaunchType": "FARGATE"
    },
    "End": true
  }
}
```

## Exemplo: Processamento de Pedidos

```json
{
  "Comment": "Processar pedido",
  "StartAt": "ValidateOrder",
  "States": {
    "ValidateOrder": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Parameters": {
        "FunctionName": "ValidateOrderFunction"
      },
      "Next": "CheckInventory"
    },
    "CheckInventory": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Parameters": {
        "FunctionName": "CheckInventoryFunction"
      },
      "Next": "ProcessPayment"
    },
    "ProcessPayment": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Parameters": {
        "FunctionName": "ProcessPaymentFunction"
      },
      "Next": "FulfillOrder"
    },
    "FulfillOrder": {
      "Type": "Parallel",
      "Branches": [
        {
          "StartAt": "UpdateInventory",
          "States": {
            "UpdateInventory": {
              "Type": "Task",
              "Resource": "arn:aws:states:::lambda:invoke",
              "Parameters": {
                "FunctionName": "UpdateInventoryFunction"
              },
              "End": true
            }
          }
        },
        {
          "StartAt": "SendNotification",
          "States": {
            "SendNotification": {
              "Type": "Task",
              "Resource": "arn:aws:states:::lambda:invoke",
              "Parameters": {
                "FunctionName": "SendNotificationFunction"
              },
              "End": true
            }
          }
        }
      ],
      "End": true
    }
  }
}
```

## Boas Práticas

### Design de Workflows

1. **Mantenha states focados**: Cada state deve fazer uma coisa
2. **Use Choice para lógica condicional**: Evite lógica complexa em Lambda
3. **Paralelize quando possível**: Use Parallel para melhor performance
4. **Trate erros adequadamente**: Use Retry e Catch

### Performance

1. **Use Express para alta frequência**: Se workflow < 5 minutos
2. **Paralelize operações independentes**: Use Parallel state
3. **Otimize payloads**: Não passe dados desnecessários
4. **Use Map para processar arrays**: Mais eficiente que loops

### Confiabilidade

1. **Configure retry apropriadamente**: Para falhas transitórias
2. **Implemente dead-letter queues**: Para falhas permanentes
3. **Use idempotência**: Para operações críticas
4. **Monitore execuções**: Use CloudWatch para métricas

### Custo

1. **Escolha tipo apropriado**: Standard vs Express
2. **Otimize duração**: Workflows mais rápidos custam menos
3. **Use wait states com cuidado**: Evite waits longos desnecessários
4. **Monitore custos**: Use Cost Explorer

## Casos de Uso

- **Orquestração de Microserviços**: Coordenar múltiplos serviços
- **ETL Pipelines**: Processamento de dados
- **Workflows de Aprovação**: Aprovações humanas
- **Processamento de Pedidos**: E-commerce
- **CI/CD Pipelines**: Automação de deploy
- **Data Processing**: Processamento em lote
- **Machine Learning**: Pipelines de ML
- **Backup e Restore**: Automação de backups

## Monitoramento

### CloudWatch Metrics

Métricas automáticas incluem:
- ExecutionsStarted
- ExecutionsSucceeded
- ExecutionsFailed
- ExecutionsTimedOut
- ExecutionTime

### CloudWatch Logs

Habilite logging para debugging:
- Log todas as transições de state
- Log input e output de cada state
- Log erros e exceções

### X-Ray

Integração com X-Ray para rastreamento distribuído:
- Visualizar latência de cada state
- Identificar gargalos
- Mapear arquitetura completa

