# Amazon DynamoDB

Amazon DynamoDB é um banco de dados NoSQL totalmente gerenciado e serverless oferecido pela AWS. Ele fornece performance de milissegundos em qualquer escala, com backup e restauração automáticos, criptografia em repouso e em trânsito, e integração nativa com outros serviços AWS.

## Características Principais

### Serverless e Gerenciado

DynamoDB é um serviço totalmente gerenciado, o que significa que você não precisa se preocupar com provisionamento de servidores, patches, configuração ou manutenção. A AWS cuida de toda a infraestrutura subjacente.

### Performance Consistente

O DynamoDB oferece latência de milissegundos em qualquer escala, com suporte a milhões de requisições por segundo. A performance é consistente e previsível, independentemente do tamanho dos dados.

### Escalabilidade Automática

O serviço escala automaticamente para cima ou para baixo com base na demanda, sem necessidade de intervenção manual. Você paga apenas pelo que usa.

## Modelo de Dados

### Tabelas, Itens e Atributos

- **Tabela**: Coleção de itens (equivalente a uma tabela em banco relacional)
- **Item**: Conjunto de atributos identificado por uma chave primária (equivalente a uma linha)
- **Atributo**: Par chave-valor (equivalente a uma coluna)

### Chaves Primárias

O DynamoDB requer uma chave primária para cada tabela, que identifica exclusivamente cada item. Existem dois tipos:

1. **Chave Simples (Partition Key)**: Um único atributo que identifica o item
2. **Chave Composta (Partition Key + Sort Key)**: Dois atributos que juntos identificam o item

### Tipos de Dados

DynamoDB suporta os seguintes tipos de dados escalares:

- String
- Number
- Binary
- Boolean
- Null

E tipos de dados complexos:

- List
- Map
- String Set
- Number Set
- Binary Set

## Capacidade e Modo de Cobrança

### On-Demand

Cobrança baseada em requisições reais. Ideal para cargas de trabalho imprevisíveis ou com picos de tráfego. Não requer planejamento de capacidade.

### Provisioned

Você especifica a capacidade de leitura e escrita desejada. Ideal para cargas de trabalho previsíveis. Permite economia através de reservas de capacidade.

## Operações Principais

### PutItem

Cria um novo item ou substitui um item existente com o mesmo chave primária.

```json
{
  "TableName": "Users",
  "Item": {
    "UserId": { "S": "123" },
    "Name": { "S": "João Silva" },
    "Email": { "S": "joao@example.com" }
  }
}
```

### GetItem

Recupera um item específico usando sua chave primária.

```json
{
  "TableName": "Users",
  "Key": {
    "UserId": { "S": "123" }
  }
}
```

### UpdateItem

Modifica um item existente. Permite atualizar atributos específicos sem substituir o item inteiro.

### DeleteItem

Remove um item da tabela usando sua chave primária.

### Query

Busca itens em uma tabela usando a chave primária. Muito eficiente e permite filtros.

### Scan

Examina todos os itens de uma tabela. Menos eficiente que Query, pois lê toda a tabela.

## Índices

### Global Secondary Index (GSI)

Permite consultar dados usando uma chave primária diferente da tabela principal. Cada GSI é uma tabela separada que mantém uma cópia dos dados da tabela base.

### Local Secondary Index (LSI)

Usa a mesma partition key da tabela base, mas uma sort key diferente. Permite consultas alternativas mantendo a mesma partição.

## Streams

DynamoDB Streams captura modificações em tempo real (criação, atualização, exclusão) e permite que outras aplicações reajam a essas mudanças. Útil para:

- Replicação de dados
- Análise em tempo real
- Notificações
- Integração com Lambda

## Time to Live (TTL)

Permite definir um timestamp de expiração para itens. O DynamoDB exclui automaticamente itens expirados, reduzindo custos de armazenamento.

## Transações

DynamoDB suporta transações ACID que permitem ler e escrever múltiplos itens em uma ou mais tabelas de forma atômica. Útil para manter consistência entre dados relacionados.

## Boas Práticas

### Design de Tabelas

1. **Acesse dados por chave primária**: Query é muito mais eficiente que Scan
2. **Use índices para padrões de acesso alternativos**: GSI e LSI permitem consultas eficientes
3. **Evite Scan em produção**: Use apenas quando necessário, pois é caro e lento
4. **Normalize com cuidado**: DynamoDB funciona melhor com dados desnormalizados

### Particionamento

1. **Distribua carga uniformemente**: Evite hot partitions (partições muito acessadas)
2. **Use sort keys para organização**: Permite consultas eficientes dentro de uma partição
3. **Considere o padrão de acesso**: Design a chave primária baseado em como você acessa os dados

### Performance

1. **Use Batch Operations**: BatchGetItem e BatchWriteItem são mais eficientes
2. **Implemente paginação**: Use LastEvaluatedKey para paginar resultados grandes
3. **Monitore métricas**: Use CloudWatch para acompanhar throttling e latência
4. **Considere caching**: Use DAX (DynamoDB Accelerator) para latência de microssegundos

### Segurança

1. **Use IAM policies**: Controle acesso granularmente
2. **Habilite criptografia**: DynamoDB oferece criptografia em repouso e em trânsito
3. **Use VPC endpoints**: Para acesso privado sem passar pela internet pública
4. **Implemente backup automático**: Use Point-in-Time Recovery para backups contínuos

## Integração com Outros Serviços

- **AWS Lambda**: Processar eventos do DynamoDB Streams
- **API Gateway**: Criar APIs RESTful que acessam DynamoDB
- **AppSync**: Usar DynamoDB como fonte de dados para APIs GraphQL
- **CloudWatch**: Monitorar métricas e configurar alarmes
- **S3**: Exportar dados para análise ou backup

## Casos de Uso

- Aplicações web e móveis que precisam de baixa latência
- Sistemas de gaming que requerem performance em tempo real
- IoT e telemetria com alto volume de dados
- Catálogos de produtos e carrinhos de compras
- Sessões de usuário e cache de aplicação
- Logs e métricas de aplicação
