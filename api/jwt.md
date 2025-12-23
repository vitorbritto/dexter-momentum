# Introdução ao JWT (JSON Web Token)

JWT (**JSON Web Token**) é um padrão aberto (RFC 7519) usado para **transmitir informações de forma segura entre partes**, normalmente em processos de autenticação e autorização. Ele é muito comum em APIs REST e integrações modernas, inclusive junto com OAuth 2.0.

## O que é um JWT?

Um JWT é um **token auto-contido**, ou seja, ele carrega dentro de si todas as informações necessárias para validação, sem depender de estado no servidor.

Ele é composto por três partes:

```text
header.payload.signature
```

Cada parte é codificada em Base64URL e separada por ponto (`.`).

## Estrutura do JWT

### Header

Define o tipo do token e o algoritmo de assinatura (ex: HS256):

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload (Claims)

Contém as informações (claims) sobre o usuário ou contexto:

```json
{
  "sub": "123456",
  "name": "Vitor Britto",
  "role": "admin",
  "exp": 1710000000
}
```

Tipos de claims (ex: sub, name, role, exp):

- **Registered claims**: iss, sub, aud, exp, iat (definidos pelo padrão RFC 7519)
- **Public claims**: definidas pela aplicação (ex: name, role)
- **Private claims**: uso interno entre sistemas (ex: custom_claim)

### Signature

Garante a integridade do token.

Exemplo (HS256):

```js
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret);
```

Se o conteúdo for alterado, a assinatura não bate.

## Como o JWT é usado?

Normalmente enviado no header HTTP.

```http
Authorization: Bearer <JWT_TOKEN>
```

O servidor valida:

- Assinatura
- Expiração (`exp`)
- Emissor (`iss`)
- Audiência (`aud`)

Se válido, a requisição é autorizada.

## JWT e OAuth 2.0

O JWT não é OAuth. Enquanto OAuth define fluxos de autorização, JWT define formato do token.

Na prática, OAuth 2.0 emite um Access Token que costuma ser um JWT.

## Vantagens do JWT

- **Stateless**: não precisa de sessão no servidor
- **Fácil de escalar**: não precisa de servidor de sessão
- **Autenticação rápida**: não precisa de servidor de autenticação
- **Integração simples entre serviços**: não precisa de servidor de integração

## Desvantagens e Cuidados

- Token não pode ser invalidado facilmente
- Payload não deve conter dados sensíveis
- Tamanho maior que session ID
- Exige controle de expiração curto

## JWT vs Session

| Característica | JWT             | Session              |
| -------------- | --------------- | -------------------- |
| Estado         | Stateless       | Stateful             |
| Escalabilidade | Escala fácil    | Escala mais complexa |
| Armazenamento  | Token no client | Sessão no servidor   |
| Revogação      | Difícil revogar | Fácil revogar        |

## Boas Práticas

- Usar expiração curta
- Combinar com Refresh Token
- Não armazenar dados sensíveis no payload
- Preferir HTTPS sempre
- Validar todos os claims relevantes

## Conclusão

JWT é uma solução eficiente para autenticação e autorização em APIs modernas. Quando usado junto com OAuth 2.0, ele oferece segurança, performance e simplicidade, desde que aplicado com critérios claros e boas práticas.
