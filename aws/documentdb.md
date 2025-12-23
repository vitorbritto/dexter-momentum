# Amazon DocumentDB

Amazon DocumentDB é um banco de dados NoSQL compatível com MongoDB totalmente gerenciado. Ele é projetado para ser rápido, escalável e altamente disponível, oferecendo a flexibilidade de um banco de dados de documentos com a confiabilidade e escalabilidade da AWS.

## Características Principais

### Compatível com MongoDB

DocumentDB é compatível com a API do MongoDB 3.6 e 4.0, permitindo usar drivers, ferramentas e aplicações MongoDB existentes sem modificações.

### Totalmente Gerenciado

DocumentDB é um serviço totalmente gerenciado que elimina a necessidade de gerenciar servidores, patches, backups, monitoramento e escalabilidade.

### Performance

DocumentDB oferece:
- Latência de milissegundos
- Até 64 TB de armazenamento por cluster
- Suporte a milhões de requisições por segundo
- Storage auto-scaling

### Alta Disponibilidade

- Replicação automática em múltiplas zonas de disponibilidade
- Failover automático em menos de 30 segundos
- Backups contínuos e point-in-time recovery

## Conceitos Fundamentais

### Cluster

Um cluster DocumentDB consiste em:
- **Primary instance**: Instância primária que aceita leituras e escritas
- **Replica instances**: Instâncias de réplica para leitura e failover
- **Cluster volume**: Armazenamento compartilhado e replicado

### Instâncias

Instâncias são os servidores que executam o DocumentDB:
- **Instance classes**: Diferentes tamanhos (db.r5.large, db.r5.xlarge, etc.)
- **Storage**: Automático e escalável até 64 TB

### Collections e Documents

- **Collection**: Similar a uma tabela em banco relacional
- **Document**: Similar a uma linha, armazenado em formato BSON/JSON

## Operações Básicas

### Conectar ao Cluster

```javascript
const { MongoClient } = require('mongodb');

const uri = 'mongodb://username:password@docdb-cluster.cluster-xxxxx.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-ca-2019-root.pem&replicaSet=rs0&readPreference=secondaryPreferred';

const client = new MongoClient(uri);

await client.connect();
const db = client.db('mydb');
```

### Criar Collection e Inserir Documento

```javascript
const collection = db.collection('users');

const result = await collection.insertOne({
  name: 'João Silva',
  email: 'joao@example.com',
  age: 30,
  createdAt: new Date()
});

console.log('Documento inserido:', result.insertedId);
```

### Buscar Documentos

```javascript
// Buscar um documento
const user = await collection.findOne({ email: 'joao@example.com' });

// Buscar múltiplos documentos
const users = await collection.find({ age: { $gte: 18 } }).toArray();

// Buscar com projeção
const names = await collection.find({}, { projection: { name: 1, email: 1 } }).toArray();
```

### Atualizar Documentos

```javascript
// Atualizar um documento
await collection.updateOne(
  { email: 'joao@example.com' },
  { $set: { age: 31 } }
);

// Atualizar múltiplos documentos
await collection.updateMany(
  { age: { $lt: 18 } },
  { $set: { status: 'minor' } }
);

// Upsert (inserir se não existir)
await collection.updateOne(
  { email: 'maria@example.com' },
  { $set: { name: 'Maria Santos', age: 25 } },
  { upsert: true }
);
```

### Deletar Documentos

```javascript
// Deletar um documento
await collection.deleteOne({ email: 'joao@example.com' });

// Deletar múltiplos documentos
await collection.deleteMany({ status: 'inactive' });
```

## Queries e Agregações

### Queries Básicas

```javascript
// Igualdade
collection.find({ status: 'active' });

// Comparação
collection.find({ age: { $gte: 18, $lte: 65 } });

// Operadores lógicos
collection.find({
  $or: [
    { status: 'active' },
    { age: { $gte: 65 } }
  ]
});

// Busca em arrays
collection.find({ tags: 'javascript' });

// Busca em objetos aninhados
collection.find({ 'address.city': 'São Paulo' });
```

### Agregação Pipeline

```javascript
const pipeline = [
  { $match: { status: 'active' } },
  { $group: {
    _id: '$category',
    total: { $sum: '$amount' },
    count: { $sum: 1 }
  }},
  { $sort: { total: -1 } }
];

const results = await collection.aggregate(pipeline).toArray();
```

### Índices

```javascript
// Criar índice único
await collection.createIndex({ email: 1 }, { unique: true });

// Criar índice composto
await collection.createIndex({ category: 1, createdAt: -1 });

// Criar índice de texto
await collection.createIndex({ title: 'text', description: 'text' });

// Listar índices
const indexes = await collection.indexes();
```

## Replicação e Alta Disponibilidade

### Replica Instances

DocumentDB suporta até 15 réplicas:
- **Read replicas**: Para distribuir leituras
- **Failover**: Automático em caso de falha da primária
- **Multi-AZ**: Réplicas em múltiplas zonas de disponibilidade

### Read Preference

Configure preferência de leitura:

```javascript
const client = new MongoClient(uri, {
  readPreference: 'secondaryPreferred' // Ler de réplicas quando possível
});
```

### Write Concern

Configure garantias de escrita:

```javascript
await collection.insertOne(
  { name: 'Test' },
  { writeConcern: { w: 'majority', wtimeout: 5000 } }
);
```

## Backup e Restore

### Backups Automáticos

- Backups contínuos habilitados por padrão
- Retenção configurável (1-35 dias)
- Point-in-time recovery
- Backups não impactam performance

### Snapshot Manual

```bash
aws docdb create-db-cluster-snapshot \
  --db-cluster-snapshot-identifier my-snapshot \
  --db-cluster-identifier my-cluster
```

### Restore

```bash
aws docdb restore-db-cluster-from-snapshot \
  --db-cluster-identifier restored-cluster \
  --snapshot-identifier my-snapshot
```

## Segurança

### Encryption

- **Encryption at rest**: Criptografia usando AWS KMS
- **Encryption in transit**: SSL/TLS obrigatório
- **Encryption keys**: Gerenciadas pela AWS ou você

### Network Isolation

- **VPC**: Execute em VPC privada
- **Security Groups**: Controle acesso de rede
- **Subnet Groups**: Configure subnets para o cluster

### Autenticação

- **Username/Password**: Autenticação básica
- **IAM Database Authentication**: Autenticação usando IAM (opcional)

### Auditoria

- **CloudWatch Logs**: Logs de auditoria
- **CloudTrail**: Rastreamento de chamadas de API

## Monitoramento

### CloudWatch Metrics

Métricas automáticas incluem:
- **CPUUtilization**: Uso de CPU
- **DatabaseConnections**: Conexões ativas
- **ReadLatency**: Latência de leitura
- **WriteLatency**: Latência de escrita
- **VolumeBytesUsed**: Armazenamento usado
- **ReplicaLag**: Lag de replicação

### Performance Insights

- Visualização de performance em tempo real
- Identificação de queries lentas
- Análise de wait events

### CloudWatch Logs

Habilite exportação de logs:
- **Audit logs**: Logs de auditoria
- **Profiler logs**: Logs de performance

## Escalabilidade

### Vertical Scaling

Aumente ou diminua o tamanho da instância:
- Escala sem downtime
- Aumente memória e CPU conforme necessário

### Horizontal Scaling

Adicione réplicas de leitura:
- Até 15 réplicas
- Distribua leituras entre réplicas
- Melhore disponibilidade

### Storage Auto-Scaling

Armazenamento escala automaticamente:
- Até 64 TB por cluster
- Sem impacto na performance
- Sem downtime

## Boas Práticas

### Design de Schema

1. **Denormalize quando apropriado**: DocumentDB funciona melhor com dados desnormalizados
2. **Use embedded documents**: Para dados frequentemente acessados juntos
3. **Use references**: Para dados grandes ou raramente acessados
4. **Considere padrões de acesso**: Design baseado em como você acessa os dados

### Performance

1. **Crie índices apropriados**: Para queries frequentes
2. **Use projeção**: Retorne apenas campos necessários
3. **Otimize aggregation pipelines**: Evite estágios desnecessários
4. **Use read replicas**: Para distribuir leituras

### Segurança

1. **Use VPC**: Isole o cluster em VPC privada
2. **Configure security groups**: Restrinja acesso de rede
3. **Habilite encryption**: Sempre criptografe dados sensíveis
4. **Use IAM**: Para controle de acesso granular
5. **Rotacione senhas**: Regularmente

### Backup

1. **Habilite backups automáticos**: Para proteção de dados
2. **Configure retenção apropriada**: Baseado em requisitos
3. **Teste restores**: Regularmente
4. **Use snapshots manuais**: Para mudanças importantes

### Monitoramento

1. **Configure alarmes**: Para métricas importantes
2. **Monitore connections**: Evite esgotamento de conexões
3. **Analise slow queries**: Use Performance Insights
4. **Monitore storage**: Configure alertas de espaço

## Casos de Uso

- **Aplicações MongoDB existentes**: Migração para AWS sem mudanças de código
- **Content Management**: Armazenar conteúdo não estruturado
- **Catalogs**: Catálogos de produtos com estruturas variadas
- **User Profiles**: Perfis de usuário com dados flexíveis
- **IoT Data**: Dados de sensores com estruturas variadas
- **Real-time Analytics**: Análise de dados em tempo real
- **Gaming**: Dados de jogos com estruturas complexas

## Migração do MongoDB

### Compatibilidade

DocumentDB é compatível com:
- MongoDB 3.6 API
- MongoDB 4.0 API
- Drivers MongoDB padrão
- Ferramentas MongoDB (mongodump, mongorestore, etc.)

### Processo de Migração

1. **Criar cluster DocumentDB**: Na mesma região
2. **Configurar network**: VPC e security groups
3. **Exportar dados**: Usando mongodump
4. **Importar dados**: Usando mongorestore
5. **Atualizar connection strings**: Nas aplicações
6. **Testar**: Validar funcionamento
7. **Cortar tráfego**: Migrar produção

### Considerações

- Alguns recursos do MongoDB não são suportados
- Verifique compatibilidade de features usadas
- Teste thoroughly antes de migrar produção

