# Amazon Athena

Amazon Athena é um serviço de consulta interativa serverless que permite analisar dados diretamente no Amazon S3 usando SQL padrão. Você não precisa configurar ou gerenciar infraestrutura, e paga apenas pelas consultas executadas.

## Características Principais

### Serverless

Athena é totalmente serverless. Você não precisa provisionar ou gerenciar servidores, clusters ou infraestrutura. Basta apontar para seus dados no S3 e começar a consultar.

### SQL Padrão

Athena usa SQL padrão (Presto/Trino), então você pode usar suas habilidades SQL existentes sem aprender uma nova linguagem.

### Pay-per-Query

Você paga apenas pelos dados escaneados durante as consultas. Não há custos de infraestrutura ou quando o serviço não está em uso.

### Integração com S3

Athena consulta dados diretamente no S3, sem necessidade de carregar dados em um banco de dados separado.

## Conceitos Fundamentais

### Database

Um database é um container lógico para tabelas. Similar a um schema em bancos relacionais tradicionais.

### Table

Uma tabela em Athena é uma definição de schema que aponta para dados no S3. Os dados permanecem no S3; Athena apenas lê os metadados da tabela.

### Partition

Partições organizam dados em S3 para melhorar performance e reduzir custos. Consultas podem pular partições irrelevantes.

### Data Source

Athena pode consultar dados de:
- **S3**: Armazenamento de objetos
- **Data Sources**: Conectores para outros sistemas (JDBC, etc.)

## Configuração Inicial

### Criar Database

```sql
CREATE DATABASE my_database;
```

### Criar Tabela

```sql
CREATE EXTERNAL TABLE sales (
  id bigint,
  product_name string,
  sale_date date,
  amount decimal(10,2),
  customer_id bigint
)
PARTITIONED BY (year int, month int)
STORED AS PARQUET
LOCATION 's3://my-bucket/sales/';
```

### Adicionar Partições

```sql
ALTER TABLE sales ADD PARTITION (year=2024, month=1)
LOCATION 's3://my-bucket/sales/year=2024/month=1/';

ALTER TABLE sales ADD PARTITION (year=2024, month=2)
LOCATION 's3://my-bucket/sales/year=2024/month=2/';
```

### MSCK REPAIR TABLE

Recuperar partições automaticamente:

```sql
MSCK REPAIR TABLE sales;
```

## Formatos de Dados Suportados

### CSV

```sql
CREATE EXTERNAL TABLE logs_csv (
  timestamp string,
  level string,
  message string
)
ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe'
WITH SERDEPROPERTIES (
  'serialization.format' = ',',
  'field.delim' = ','
)
STORED AS TEXTFILE
LOCATION 's3://my-bucket/logs/';
```

### JSON

```sql
CREATE EXTERNAL TABLE events_json (
  event_id string,
  event_type string,
  timestamp string,
  data struct<user_id:string, action:string>
)
ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe'
LOCATION 's3://my-bucket/events/';
```

### Parquet

```sql
CREATE EXTERNAL TABLE sales_parquet (
  id bigint,
  product_name string,
  amount decimal(10,2)
)
STORED AS PARQUET
LOCATION 's3://my-bucket/sales/';
```

### ORC

```sql
CREATE EXTERNAL TABLE logs_orc (
  timestamp timestamp,
  level string,
  message string
)
STORED AS ORC
LOCATION 's3://my-bucket/logs/';
```

## Queries SQL

### Queries Básicas

```sql
-- SELECT simples
SELECT * FROM sales LIMIT 10;

-- WHERE
SELECT product_name, amount 
FROM sales 
WHERE amount > 1000 
  AND year = 2024 
  AND month = 1;

-- GROUP BY
SELECT 
  product_name,
  SUM(amount) as total_sales,
  COUNT(*) as order_count
FROM sales
WHERE year = 2024
GROUP BY product_name
ORDER BY total_sales DESC;
```

### Joins

```sql
SELECT 
  s.id,
  s.product_name,
  s.amount,
  c.customer_name
FROM sales s
JOIN customers c ON s.customer_id = c.id
WHERE s.year = 2024;
```

### Window Functions

```sql
SELECT 
  product_name,
  sale_date,
  amount,
  SUM(amount) OVER (
    PARTITION BY product_name 
    ORDER BY sale_date 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) as running_total
FROM sales
WHERE year = 2024;
```

### CTEs (Common Table Expressions)

```sql
WITH monthly_sales AS (
  SELECT 
    year,
    month,
    SUM(amount) as total
  FROM sales
  GROUP BY year, month
)
SELECT 
  year,
  month,
  total,
  LAG(total) OVER (ORDER BY year, month) as prev_month
FROM monthly_sales;
```

## Partições

### Benefícios de Partições

- **Performance**: Consultas podem pular partições irrelevantes
- **Custo**: Reduz dados escaneados (menor custo)
- **Organização**: Facilita gerenciamento de dados

### Estrutura de Partições no S3

```
s3://my-bucket/sales/
  year=2024/
    month=1/
      data.parquet
    month=2/
      data.parquet
  year=2023/
    month=12/
      data.parquet
```

### Consultar Partições Específicas

```sql
-- Consulta com partições (mais eficiente)
SELECT * FROM sales 
WHERE year = 2024 AND month = 1;

-- Sem especificar partições (escaneia tudo)
SELECT * FROM sales; -- CUIDADO: pode ser caro!
```

## Views

Criar views para simplificar consultas:

```sql
CREATE VIEW monthly_sales_summary AS
SELECT 
  year,
  month,
  product_name,
  SUM(amount) as total_sales,
  COUNT(*) as order_count
FROM sales
GROUP BY year, month, product_name;
```

Usar view:

```sql
SELECT * FROM monthly_sales_summary
WHERE year = 2024;
```

## Performance e Otimização

### Usar Partições

Sempre especifique partições nas consultas:

```sql
-- BOM: Especifica partições
SELECT * FROM sales 
WHERE year = 2024 AND month BETWEEN 1 AND 3;

-- RUIM: Escaneia todas as partições
SELECT * FROM sales;
```

### Usar Formatos Colunares

Parquet e ORC são mais eficientes que CSV/JSON:
- **Compressão**: Menor tamanho de arquivo
- **Columnar**: Lê apenas colunas necessárias
- **Performance**: Consultas mais rápidas

### Compactar Dados

Dados compactados reduzem custos:
- Gzip, Snappy, LZO para texto
- Parquet e ORC já são compactados

### Usar LIMIT

```sql
-- Limita dados retornados
SELECT * FROM sales LIMIT 100;
```

### Projeção de Colunas

Selecione apenas colunas necessárias:

```sql
-- BOM: Apenas colunas necessárias
SELECT product_name, amount FROM sales;

-- RUIM: Todas as colunas
SELECT * FROM sales;
```

## Integração com Outros Serviços

### Glue Data Catalog

Athena usa AWS Glue Data Catalog como metastore:
- Gerencia metadados de tabelas
- Permite compartilhar schemas entre serviços
- Integração com ETL jobs

### QuickSight

Athena pode ser usado como fonte de dados no QuickSight para visualizações.

### Lambda

Lambda pode ser usado para processar resultados de Athena ou criar tabelas programaticamente.

### S3

Dados devem estar no S3 para Athena consultar.

## Workgroups

Workgroups permitem:
- Isolar queries por time/projeto
- Controlar custos
- Configurar limites
- Gerenciar permissões

### Criar Workgroup

```sql
-- Via console ou CLI
aws athena create-work-group \
  --name analytics-team \
  --description "Analytics team workgroup"
```

### Usar Workgroup

```sql
-- Especificar workgroup na query
-- Configurado via console ou API
```

## Resultados

### Salvar Resultados

Resultados são salvos automaticamente em S3:
- Configurar bucket de resultados
- Resultados ficam disponíveis por 30 dias (configurável)

### Consultar Resultados

```sql
-- Resultados são salvos em S3
-- Pode consultar resultados anteriores
```

## Custos

### Modelo de Preço

- **$5 por TB de dados escaneados**
- Primeiros 10 TB escaneados por mês: $5/TB
- Próximos 40 TB: $4.50/TB
- Acima de 50 TB: $4/TB

### Reduzir Custos

1. **Use partições**: Reduz dados escaneados
2. **Use formatos colunares**: Parquet/ORC
3. **Compacte dados**: Reduz tamanho
4. **Selecione colunas específicas**: Não use SELECT *
5. **Use LIMIT**: Para testes
6. **Otimize queries**: Evite scans completos

## Boas Práticas

### Organização de Dados

1. **Use partições**: Organize dados por partições lógicas
2. **Use formatos colunares**: Parquet ou ORC
3. **Compacte dados**: Reduz custos
4. **Organize por data**: Facilita consultas temporais

### Design de Tabelas

1. **Defina schemas apropriados**: Tipos de dados corretos
2. **Use partições**: Para melhor performance
3. **Documente tabelas**: Use comentários
4. **Versionamento**: Considere versionar schemas

### Queries

1. **Sempre especifique partições**: Reduz custos
2. **Selecione colunas específicas**: Não use SELECT *
3. **Use LIMIT em testes**: Evite custos desnecessários
4. **Otimize JOINs**: Considere estrutura de dados
5. **Use views**: Para queries complexas frequentes

### Monitoramento

1. **Monitore custos**: Use Cost Explorer
2. **Analise query history**: Identifique queries caras
3. **Configure alertas**: Para custos altos
4. **Use workgroups**: Para isolar e controlar custos

### Segurança

1. **Use IAM policies**: Controle acesso
2. **Criptografe dados no S3**: Para dados sensíveis
3. **Use VPC endpoints**: Para acesso privado
4. **Audite queries**: Use CloudTrail

## Casos de Uso

- **Log Analysis**: Análise de logs de aplicação
- **Data Lake Analytics**: Consultar dados em data lakes
- **Ad-hoc Queries**: Consultas exploratórias
- **ETL**: Extrair e transformar dados
- **Reporting**: Relatórios e dashboards
- **Data Exploration**: Explorar dados no S3
- **Cost Analysis**: Análise de custos AWS
- **Security Analysis**: Análise de segurança e compliance

## Exemplo Completo: Análise de Vendas

```sql
-- 1. Criar database
CREATE DATABASE ecommerce;

-- 2. Criar tabela de vendas
CREATE EXTERNAL TABLE ecommerce.sales (
  order_id bigint,
  product_id bigint,
  product_name string,
  category string,
  sale_date timestamp,
  amount decimal(10,2),
  customer_id bigint,
  region string
)
PARTITIONED BY (year int, month int, day int)
STORED AS PARQUET
LOCATION 's3://my-data-lake/sales/';

-- 3. Adicionar partições
MSCK REPAIR TABLE ecommerce.sales;

-- 4. Análise de vendas por categoria
SELECT 
  category,
  year,
  month,
  SUM(amount) as total_sales,
  COUNT(DISTINCT order_id) as order_count,
  AVG(amount) as avg_order_value
FROM ecommerce.sales
WHERE year = 2024 AND month = 1
GROUP BY category, year, month
ORDER BY total_sales DESC;

-- 5. Top produtos
SELECT 
  product_name,
  SUM(amount) as total_revenue,
  COUNT(*) as units_sold
FROM ecommerce.sales
WHERE year = 2024
GROUP BY product_name
ORDER BY total_revenue DESC
LIMIT 10;
```

