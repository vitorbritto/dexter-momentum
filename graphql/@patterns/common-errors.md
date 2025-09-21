# Erros HTTP Comuns e Como Depurá-los

Ao construir ou consumir uma API GraphQL sobre HTTP, é comum encontrar erros, especialmente durante o desenvolvimento. Entender como reconhecer e resolver esses problemas economiza tempo e frustração.

Este guia descreve erros comuns de HTTP e GraphQL, seus significados e como depurá-los de forma eficaz. Ele segue as recomendações do GraphQL over HTTP spec, que padroniza o funcionamento do GraphQL sobre HTTP, incluindo formatos de requisição, códigos de status e tipos de mídia.

> Lembre-se: implementações podem variar, então trate este conteúdo como guia geral, não referência definitiva.

## 400 Bad Request: Erros de sintaxe ou parsing

Significa que o servidor não conseguiu interpretar a requisição (query malformada ou JSON inválido).

**Causas comuns:**

- Erros de sintaxe no JSON
- Enviar apenas string em vez de { "query": "..." }
- Usar `Content-Type: application/graphql` sem suporte no servidor

**Como depurar:**

- Validar JSON com linter/formatter
- Garantir POST com `Content-Type: application/json`
- Verificar a sintaxe da query (usar IDE ou linter)

## 405 Method Not Allowed: Método HTTP incorreto

Significa que o método HTTP não suportado.

**Causas comuns:**

- Usar PUT ou DELETE em vez de POST ou GET
- Enviar GET para mutações, ou para servidores que aceitam apenas POST

**Como depurar:**

• Verificar método HTTP (mutações = POST)
• Checar se o servidor suporta GET para queries
• Consultar a especificação HTTP do GraphQL

## 500 Internal Server Error: Falhas inesperadas no servidor

Significa que algo falhou no servidor.

**Causas comuns:**

Causas comuns:
• Exceção não tratada em resolver
• Problemas de validação do schema na inicialização
• Middleware ausente ou mal configurado

**Como depurar:**

• Checar logs ou stack traces
• Adicionar tratamento de erros nos resolvers

## GraphQL errors com 200 OK

Significa que o HTTP funcionou, mas a operação GraphQL gerou erros.

**Causas comuns:**

• Erros em tempo de execução
• Violação de constraints do schema (ex.: retornar tipo errado ou null em campo non-nullable)
• Queries inválidas: campo inexistente, argumentos incorretos, ausência de seleção em campo não folha, operationName ausente quando existem múltiplas operações

**Como depurar:**

• Checar errors[] no corpo da resposta
• Se há data, o erro foi em runtime (input inválido, acesso negado, bug no servidor)
• Se não há data, falhou na validação da query

**Exemplo:**

```json
// Usar introspecção ou IDE para validar compatibilidade da query com o schema

{
  "errors": [
    {
      "message": "Cannot query field \"foo\" on type \"Query\".",
      "locations": [{ "line": 1, "column": 3 }]
    }
  ]
}
```

## Códigos de status específicos de implementações

Alguns servidores GraphQL usam códigos adicionais não recomendados pela especificação:

- `415 Unsupported Media Type` → servidor não entende `Content-Type` (ex.: text/plain)
- `422 Unprocessable Entity` → usado em algumas implementações para erros de validação em vez de 200 + `errors[]`

## Formatos de resposta GraphQL

Tradicionalmente, GraphQL usa `application/json`. A especificação recomenda `application/graphql-response+json`, que identifica claramente uma resposta GraphQL.

**Pontos-chave:**

- Servidores podem responder com `application/graphql-response+json` ou `application/json`
- Clientes podem solicitar via header `Accept: application/graphql-response+json, application/json;q=0.9`
- O novo tipo é recomendado e o suporte está crescendo
- Se houver negociação de conteúdo, o servidor deve responder com o tipo apropriado ou fallback para `application/json`
