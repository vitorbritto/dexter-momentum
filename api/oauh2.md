OAuth 2.0 é um **framework de autorização** que permite que aplicações acessem recursos protegidos em nome de um usuário ou de si mesmas, **sem expor credenciais sensíveis** como login e senha. Ele é amplamente usado em APIs modernas (Google, GitHub, AWS, etc.).

## Papéis do OAuth

O OAuth 2.0 define quatro papéis principais:

- **Resource Owner**: Normalmente o usuário final. É quem possui os dados.
- **Client**: A aplicação que deseja acessar os dados (web app, mobile app, backend).
- **Authorization Server**: Responsável por autenticar o usuário e emitir tokens.
- **Resource Server**: A API que protege os recursos e valida os tokens recebidos.

## Fluxo Abstrato do Protocolo

De forma resumida, o fluxo funciona assim:

1. O **Client** solicita autorização ao **Resource Owner**
2. O **Resource Owner** concede permissão
3. O **Authorization Server** emite um **Access Token**
4. O **Client** usa o token para acessar o **Resource Server**

Tudo gira em torno do **token**, não das credenciais do usuário.

## Registro da Aplicação

Antes de usar OAuth, a aplicação precisa ser registrada no Authorization Server.

Nesse registro são definidos:

- `client_id`
- `client_secret` (quando aplicável)
- Redirect URIs
- Grant Types permitidos
- Escopos (`scopes`)

Esse passo identifica **quem é a aplicação** dentro do sistema de autorização.

## Concessão de Autorização

O **Authorization Grant** é a prova de que uma autorização foi concedida. Cada tipo de concessão define **como** essa autorização acontece.

Possíveis tipos de concessão:

- Authorization Code
- Client Credentials
- Device Code

## Tipo de Concessão: Authorization Code

É o tipo de concessão mais comum para aplicações web e mobile.

### Passos principais

1. O usuário é redirecionado para o Authorization Server
2. O usuário faz login e concede permissão
3. A aplicação recebe um **authorization code**
4. Esse código é trocado por um **access token**

## Tipo de Concessão: Client Credentials

É usado quando **não há usuário**, apenas comunicação entre sistemas.

Possíveis exemplos:

- Backend → Backend
- Jobs
- Workers

### Características:

- Usa `client_id` e `client_secret`
- Token representa a **aplicação**, não um usuário
- Não há consentimento humano

## Tipo de Concessão: Device Code

Criado para dispositivos com entrada limitada.

Exemplos:

- Smart TVs
- Consoles
- IoT

### Fluxo resumido:

1. O dispositivo recebe um código
2. O usuário acessa uma URL em outro dispositivo
3. Confirma o código
4. O token é liberado para o device

## Exemplo de Uso do Access Token

O Access Token é enviado em chamadas HTTP normalmente assim:

```http
GET /api/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

### O Resource Server valida:

- Assinatura
- Expiração
- Escopos
- Emissor

Se tudo estiver correto, a requisição é aceita.

### Fluxo de Refresh Token

O Refresh Token permite obter um novo Access Token sem pedir login novamente.

1. Access Token expira
2. Client envia o Refresh Token
3. Authorization Server retorna um novo Access Token
4. Sessão continua ativa

### Observações

- Refresh Token deve ser armazenado com cuidado
- Nem todo Grant Type suporta refresh
