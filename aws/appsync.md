# AWS AppSync

AWS AppSync é um serviço totalmente gerenciado para criar APIs GraphQL serverless. Ele simplifica o desenvolvimento de aplicações conectando fontes de dados como DynamoDB, Lambda, RDS e HTTP APIs, oferecendo recursos como atualizações em tempo real via WebSockets e suporte offline.

## O que é GraphQL?

GraphQL é uma linguagem de consulta e runtime para APIs que permite aos clientes solicitar exatamente os dados de que precisam. Diferente do REST, onde múltiplas requisições podem ser necessárias, o GraphQL permite buscar dados relacionados em uma única requisição.

### Vantagens do GraphQL

- **Flexibilidade**: Cliente solicita apenas os campos necessários
- **Eficiência**: Reduz over-fetching e under-fetching de dados
- **Tipagem Forte**: Schema define tipos e valida requisições
- **Ferramentas**: GraphQL Playground e outras ferramentas facilitam desenvolvimento

## Características do AppSync

### Totalmente Gerenciado

AppSync é serverless, então você não precisa gerenciar servidores, escalabilidade ou infraestrutura. A AWS cuida de tudo automaticamente.

### Múltiplas Fontes de Dados

AppSync pode se conectar a:

- **DynamoDB**: Banco NoSQL para dados estruturados
- **Lambda**: Funções serverless para lógica customizada
- **RDS**: Bancos relacionais (PostgreSQL, MySQL, Aurora)
- **HTTP APIs**: Qualquer endpoint HTTP/REST
- **OpenSearch**: Busca e análise de dados
- **EventBridge**: Integração com eventos

### Atualizações em Tempo Real

AppSync suporta subscriptions GraphQL que permitem atualizações em tempo real via WebSockets. Ideal para:

- Chat em tempo real
- Notificações push
- Dashboards ao vivo
- Colaboração em tempo real

### Suporte Offline

AppSync oferece client libraries que suportam operação offline com sincronização automática quando a conexão é restaurada.

### Autenticação Integrada

Suporta múltiplos métodos de autenticação:

- **API Key**: Para desenvolvimento e testes
- **AWS IAM**: Para acesso seguro entre serviços AWS
- **Amazon Cognito**: Para autenticação de usuários
- **OpenID Connect**: Para integração com provedores OIDC
- **Lambda Authorizer**: Para lógica de autorização customizada

## Schema GraphQL

O schema define os tipos, queries, mutations e subscriptions disponíveis na API.

### Exemplo de Schema

```graphql
type Post {
  id: ID!
  title: String!
  content: String
  author: User
  comments: [Comment]
  createdAt: AWSDateTime
}

type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post]
}

type Comment {
  id: ID!
  content: String!
  post: Post
  author: User
}

type Query {
  getPost(id: ID!): Post
  listPosts(limit: Int, nextToken: String): PostConnection
  getUser(id: ID!): User
}

type Mutation {
  createPost(input: CreatePostInput!): Post
  updatePost(input: UpdatePostInput!): Post
  deletePost(id: ID!): Post
}

type Subscription {
  onCreatePost: Post @aws_subscribe(mutations: ["createPost"])
  onUpdatePost: Post @aws_subscribe(mutations: ["updatePost"])
}
```

## Resolvers

Resolvers são funções que conectam campos do schema GraphQL às fontes de dados. AppSync suporta dois tipos:

### Resolvers Diretos (Direct Resolvers)

Conectam diretamente a uma fonte de dados sem lógica intermediária. Mais simples e eficientes.

### Pipeline Resolvers

Permitem executar múltiplas funções em sequência, útil para:

- Validação de dados
- Transformação de dados
- Enriquecimento de dados de múltiplas fontes
- Lógica de negócio complexa

### Request e Response Mapping Templates

AppSync usa templates VTL (Velocity Template Language) ou JavaScript para transformar requisições e respostas:

```javascript
// Request mapping template
export function request(ctx) {
  return {
    operation: "GetItem",
    key: {
      id: ctx.args.id,
    },
  };
}

// Response mapping template
export function response(ctx) {
  return ctx.result;
}
```

## Integração com DynamoDB

AppSync se integra nativamente com DynamoDB, permitindo operações CRUD através de resolvers diretos.

### Operações Suportadas

- **GetItem**: Buscar um item por chave primária
- **PutItem**: Criar ou atualizar um item
- **UpdateItem**: Atualizar atributos específicos
- **DeleteItem**: Remover um item
- **Query**: Buscar itens usando chave primária
- **Scan**: Examinar todos os itens (menos eficiente)

### Exemplo de Resolver DynamoDB

```graphql
type Query {
  getPost(id: ID!): Post
}
```

Resolver mapeia para:

```javascript
{
  "version": "2017-02-28",
  "operation": "GetItem",
  "key": {
    "id": $util.dynamodb.toDynamoDBJson($ctx.args.id)
  }
}
```

## Integração com Lambda

Lambda permite lógica de negócio customizada e integração com serviços externos.

### Quando Usar Lambda

- Lógica de negócio complexa
- Validação customizada
- Integração com APIs externas
- Processamento de dados
- Transformações complexas

### Exemplo de Resolver Lambda

```javascript
// Lambda function
exports.handler = async (event) => {
  const { id } = event.arguments;

  // Lógica customizada
  const result = await processData(id);

  return result;
};
```

## Subscriptions (Tempo Real)

Subscriptions permitem que clientes recebam atualizações em tempo real quando dados mudam.

### Configuração

```graphql
type Subscription {
  onCreatePost: Post @aws_subscribe(mutations: ["createPost"])
}
```

### Cliente JavaScript

```javascript
import { API } from "aws-amplify";
import { onCreatePost } from "./graphql/subscriptions";

const subscription = API.graphql({
  query: onCreatePost,
}).subscribe({
  next: (data) => {
    console.log("Novo post criado:", data.value.data.onCreatePost);
  },
});
```

## Caching

AppSync oferece cache em múltiplas camadas para melhorar performance:

- **Resolver Caching**: Cache de respostas de resolvers individuais
- **API Caching**: Cache de toda a resposta da API
- **TTL Configurável**: Tempo de vida do cache

## Boas Práticas

### Design de Schema

1. **Pense em termos de entidades**: Modele baseado em como os dados são acessados
2. **Use tipos aninhados**: Aproveite a natureza hierárquica do GraphQL
3. **Evite over-fetching**: Permita que clientes solicitem apenas o necessário
4. **Documente com descrições**: Use comentários para documentar tipos e campos

### Performance

1. **Use DataLoader pattern**: Para evitar N+1 queries
2. **Implemente paginação**: Para listas grandes
3. **Configure cache apropriadamente**: Balanceie frescor e performance
4. **Monitore métricas**: Use CloudWatch para identificar gargalos

### Segurança

1. **Use autenticação apropriada**: Escolha o método certo para seu caso
2. **Implemente autorização**: Use directives ou Lambda para controle de acesso
3. **Valide inputs**: Sempre valide dados de entrada
4. **Rate limiting**: Configure limites para prevenir abuso

### Resolvers

1. **Prefira resolvers diretos**: Quando possível, são mais eficientes
2. **Use pipeline resolvers**: Para lógica complexa
3. **Otimize templates**: Evite transformações desnecessárias
4. **Trate erros**: Implemente tratamento de erros robusto

## Casos de Uso

- **APIs Mobile**: Backend para aplicativos iOS e Android
- **Aplicações Web**: APIs para SPAs e aplicações web modernas
- **Microserviços**: Gateway GraphQL para múltiplos serviços
- **Tempo Real**: Aplicações que precisam de atualizações em tempo real
- **Offline First**: Aplicações que funcionam offline

## Integração com Amplify

AWS Amplify oferece client libraries que simplificam o uso do AppSync em aplicações:

```javascript
import { API, graphqlOperation } from "aws-amplify";
import { createPost } from "./graphql/mutations";

const newPost = await API.graphql(
  graphqlOperation(createPost, {
    input: {
      title: "Meu Post",
      content: "Conteúdo do post",
    },
  })
);
```
