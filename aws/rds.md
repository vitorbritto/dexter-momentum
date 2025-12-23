# Amazon RDS (Relational Database Service)

Amazon RDS é um serviço de banco de dados relacional totalmente gerenciado que facilita a configuração, operação e escalabilidade de bancos de dados na nuvem. Ele automatiza tarefas administrativas como provisionamento de hardware, configuração, patches, backups e recuperação.

## Características Principais

### Totalmente Gerenciado

RDS elimina a necessidade de gerenciar servidores de banco de dados, permitindo focar em aplicações. A AWS cuida de backups, patches, monitoramento e escalabilidade.

### Múltiplos Engines

RDS suporta múltiplos engines de banco de dados:
- **MySQL**: Versões 5.7, 8.0
- **PostgreSQL**: Versões 11, 12, 13, 14, 15
- **MariaDB**: Versões 10.3, 10.4, 10.5, 10.6
- **Oracle**: Versões 12c, 19c
- **SQL Server**: Versões 2014, 2016, 2017, 2019, 2022
- **Aurora**: MySQL e PostgreSQL compatível

### Alta Disponibilidade

RDS oferece alta disponibilidade através de:
- Multi-AZ deployments
- Failover automático
- Backups automáticos
- Point-in-time recovery

### Escalabilidade

RDS permite escalar verticalmente (instance size) e horizontalmente (read replicas) conforme necessário.

## Conceitos Fundamentais

### DB Instance

Uma instância de banco de dados é um ambiente isolado no RDS que pode conter múltiplos bancos de dados.

### DB Engine

O engine é o tipo de banco de dados (MySQL, PostgreSQL, etc.).

### DB Parameter Group

Parameter groups são coleções de configurações de engine que você pode aplicar a uma instância.

### DB Option Group

Option groups permitem configurar features opcionais do engine.

### DB Subnet Group

Subnet groups definem quais subnets VPC podem conter instâncias RDS.

## Engines Suportados

### Amazon Aurora

Aurora é um engine MySQL e PostgreSQL compatível com performance e escalabilidade superiores:
- Até 5x mais rápido que MySQL
- Até 3x mais rápido que PostgreSQL
- Storage auto-scaling até 128 TB
- Replicação em 3 zonas de disponibilidade

### MySQL

MySQL é um dos bancos de dados open-source mais populares:
- Versões 5.7 e 8.0
- Suporte completo a features MySQL
- Compatível com aplicações MySQL existentes

### PostgreSQL

PostgreSQL é um banco de dados objeto-relacional avançado:
- Versões 11, 12, 13, 14, 15
- Suporte a extensões (PostGIS, pg_stat_statements, etc.)
- ACID compliance completo

### MariaDB

MariaDB é um fork do MySQL:
- Versões 10.3, 10.4, 10.5, 10.6
- Compatível com MySQL
- Features adicionais

### Oracle

Oracle Database Enterprise Edition:
- Versões 12c, 19c
- Licenciamento BYOL (Bring Your Own License)
- Suporte completo a Oracle features

### SQL Server

Microsoft SQL Server:
- Versões 2014, 2016, 2017, 2019, 2022
- Express, Web, Standard, Enterprise editions
- Suporte a Always On, Mirroring

## Operações Básicas

### Criar DB Instance

```bash
aws rds create-db-instance \
  --db-instance-identifier mydb \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password MyPassword123 \
  --allocated-storage 20 \
  --vpc-security-group-ids sg-xxxxx \
  --db-subnet-group-name my-subnet-group
```

### Conectar ao Banco

```javascript
// MySQL
const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
  host: 'mydb.xxxxx.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'MyPassword123',
  database: 'mydb'
});

const [rows] = await connection.execute('SELECT * FROM users');
console.log(rows);
```

```javascript
// PostgreSQL
const { Pool } = require('pg');

const pool = new Pool({
  host: 'mydb.xxxxx.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'MyPassword123',
  database: 'mydb',
  port: 5432
});

const result = await pool.query('SELECT * FROM users');
console.log(result.rows);
```

## Alta Disponibilidade

### Multi-AZ Deployments

Multi-AZ cria uma réplica síncrona em outra zona de disponibilidade:
- **Failover automático**: Em caso de falha da primária
- **Sincronização síncrona**: Dados sempre consistentes
- **Backup da réplica**: Backups não impactam primária

### Read Replicas

Read replicas permitem escalar leituras:
- **Até 5 read replicas** (15 para Aurora)
- **Replicação assíncrona**: Menor latência de escrita
- **Cross-region**: Réplicas em outras regiões
- **Promoção**: Promover réplica a primária

### Criar Read Replica

```bash
aws rds create-db-instance-read-replica \
  --db-instance-identifier mydb-replica \
  --source-db-instance-identifier mydb \
  --db-instance-class db.t3.micro
```

## Backup e Restore

### Backups Automáticos

RDS faz backups automáticos:
- **Retenção**: 1-35 dias (configurável)
- **Ventana de backup**: Configurável
- **Point-in-time recovery**: Restaurar para qualquer ponto no tempo

### Snapshots Manuais

Criar snapshot manual:

```bash
aws rds create-db-snapshot \
  --db-snapshot-identifier mydb-snapshot \
  --db-instance-identifier mydb
```

### Restore from Snapshot

```bash
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier restored-db \
  --db-snapshot-identifier mydb-snapshot
```

### Point-in-Time Recovery

```bash
aws rds restore-db-instance-to-point-in-time \
  --source-db-instance-identifier mydb \
  --target-db-instance-identifier restored-db \
  --restore-time 2024-01-15T10:30:00Z
```

## Escalabilidade

### Vertical Scaling (Scale Up/Down)

Alterar tamanho da instância:

```bash
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --db-instance-class db.t3.large \
  --apply-immediately
```

**Considerações:**
- Pode causar downtime breve
- Use Multi-AZ para zero downtime
- Escale durante janela de manutenção quando possível

### Horizontal Scaling (Read Replicas)

Adicionar read replicas para escalar leituras:
- Distribuir leituras entre réplicas
- Reduzir carga na instância primária
- Melhorar performance de leitura

### Storage Auto-Scaling

Aurora e alguns engines suportam storage auto-scaling:
- Escala automaticamente quando necessário
- Configurar máximo de storage
- Sem downtime

## Segurança

### Encryption

- **Encryption at rest**: Criptografia usando AWS KMS
- **Encryption in transit**: SSL/TLS para conexões
- **Encryption keys**: Gerenciadas pela AWS ou você

### Network Isolation

- **VPC**: Execute em VPC privada
- **Security Groups**: Controle acesso de rede
- **Subnet Groups**: Configure subnets para instâncias

### Database Authentication

- **Master username/password**: Credenciais iniciais
- **IAM Database Authentication**: Autenticação usando IAM (MySQL, PostgreSQL)
- **Kerberos Authentication**: Para SQL Server

### IAM Database Authentication

```bash
# Habilitar IAM auth
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --enable-iam-database-authentication

# Conectar usando IAM
mysql -h mydb.xxxxx.rds.amazonaws.com \
  --user=admin \
  --password=$(aws rds generate-db-auth-token \
    --hostname mydb.xxxxx.rds.amazonaws.com \
    --port 3306 \
    --username admin)
```

### Parameter Groups

Configure parâmetros de segurança:

```bash
# Criar parameter group
aws rds create-db-parameter-group \
  --db-parameter-group-name secure-params \
  --db-parameter-group-family mysql8.0 \
  --description "Secure parameters"

# Modificar parâmetros
aws rds modify-db-parameter-group \
  --db-parameter-group-name secure-params \
  --parameters "ParameterName=require_ssl,ParameterValue=1,ApplyMethod=immediate"
```

## Monitoramento

### CloudWatch Metrics

Métricas automáticas incluem:
- **CPUUtilization**: Uso de CPU
- **DatabaseConnections**: Conexões ativas
- **FreeableMemory**: Memória disponível
- **FreeStorageSpace**: Espaço de storage livre
- **ReadLatency**: Latência de leitura
- **WriteLatency**: Latência de escrita

### Performance Insights

- Visualização de performance em tempo real
- Identificação de queries lentas
- Análise de wait events
- Recomendações de otimização

### Enhanced Monitoring

Monitoramento detalhado a nível de OS:
- CPU, memória, I/O
- Processos
- Disco

### CloudWatch Logs

Exportar logs do engine:
- **Error logs**: Logs de erro
- **Slow query logs**: Queries lentas
- **General logs**: Logs gerais
- **Audit logs**: Logs de auditoria

## Manutenção

### Maintenance Windows

Configure janelas de manutenção:
- **Automated backups**: Durante janela de backup
- **Engine updates**: Durante janela de manutenção
- **System updates**: Patches do sistema

### Engine Updates

Atualizar versão do engine:

```bash
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --engine-version 8.0.35 \
  --allow-major-version-upgrade \
  --apply-immediately
```

### Minor Version Upgrades

RDS pode atualizar automaticamente versões menores:
- Habilitar auto minor version upgrade
- Aplicado durante janela de manutenção

## Boas Práticas

### Design

1. **Escolha engine apropriado**: Baseado em requisitos
2. **Use Multi-AZ para produção**: Alta disponibilidade
3. **Configure read replicas**: Para escalar leituras
4. **Use parameter groups**: Para otimização

### Performance

1. **Escolha instance class apropriada**: Baseado em carga
2. **Use connection pooling**: Reduz overhead de conexões
3. **Otimize queries**: Use indexes, analyze queries
4. **Use read replicas**: Para distribuir leituras
5. **Monitor Performance Insights**: Identifique gargalos

### Segurança

1. **Use VPC**: Isole instâncias em VPC privada
2. **Configure security groups**: Restrinja acesso de rede
3. **Habilite encryption**: Sempre para dados sensíveis
4. **Use IAM authentication**: Quando possível
5. **Rotacione credenciais**: Regularmente
6. **Habilite audit logs**: Para compliance

### Backup

1. **Habilite backups automáticos**: Sempre
2. **Configure retenção apropriada**: Baseado em requisitos
3. **Teste restores**: Regularmente
4. **Use snapshots manuais**: Para mudanças importantes
5. **Configure backup window**: Durante baixo tráfego

### Custo

1. **Escolha instance class apropriada**: Não superprovisione
2. **Use Reserved Instances**: Para cargas previsíveis
3. **Delete instâncias não utilizadas**: Reduz custos
4. **Use storage auto-scaling**: Para Aurora
5. **Monitore custos**: Use Cost Explorer

## Casos de Uso

- **Aplicações Web**: Backend para aplicações web
- **Enterprise Applications**: Aplicações empresariais
- **E-commerce**: Bancos de dados para e-commerce
- **Content Management**: CMS e sistemas de conteúdo
- **Analytics**: Data warehouses e analytics
- **Mobile Apps**: Backend para aplicativos móveis
- **SaaS Applications**: Multi-tenant applications

## Comparação: RDS vs Aurora

### RDS

- Mais simples de configurar
- Menor custo inicial
- Bom para cargas de trabalho padrão
- Suporta múltiplos engines

### Aurora

- Melhor performance
- Storage auto-scaling
- Replicação mais rápida
- Backup contínuo
- Mais caro, mas melhor custo-benefício para alta carga

