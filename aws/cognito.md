# Amazon Cognito

Amazon Cognito é um serviço de autenticação, autorização e gerenciamento de usuários totalmente gerenciado para aplicações web e móveis. Ele permite adicionar autenticação de usuários, sincronização de dados e controle de acesso a recursos AWS de forma simples e segura.

## Características Principais

### Autenticação de Usuários

Cognito oferece autenticação completa para aplicações:
- **Sign-up e Sign-in**: Registro e login de usuários
- **Multi-factor Authentication (MFA)**: Autenticação de dois fatores
- **Social Identity Providers**: Login com Google, Facebook, Apple, etc.
- **SAML e OIDC**: Integração com provedores corporativos

### User Pools

User Pools são diretórios de usuários que gerenciam:
- Registro e autenticação de usuários
- Recuperação de senha
- Verificação de email/telefone
- Políticas de senha

### Identity Pools

Identity Pools fornecem credenciais AWS temporárias para usuários autenticados, permitindo acesso a recursos AWS (S3, DynamoDB, etc.).

### Sincronização de Dados

Cognito Sync permite sincronizar dados de aplicação entre dispositivos do mesmo usuário.

## Componentes Principais

### User Pool

Um User Pool é um diretório de usuários que gerencia:
- **Usuários**: Contas de usuários
- **Attributes**: Atributos de usuário (email, nome, etc.)
- **Authentication**: Fluxos de autenticação
- **Policies**: Políticas de senha, MFA, etc.

### Identity Pool

Um Identity Pool mapeia identidades para credenciais AWS:
- **Unauthenticated identities**: Usuários não autenticados
- **Authenticated identities**: Usuários autenticados
- **IAM roles**: Roles atribuídas a identidades

### User Pool App Client

App Client é a configuração de como sua aplicação interage com o User Pool:
- **Client ID**: Identificador da aplicação
- **Client Secret**: Segredo (opcional)
- **OAuth flows**: Fluxos OAuth suportados

## User Pools

### Criar User Pool

```bash
aws cognito-idp create-user-pool \
  --pool-name my-user-pool \
  --policies PasswordPolicy='{MinimumLength=8,RequireUppercase=true,RequireLowercase=true,RequireNumbers=true,RequireSymbols=true}'
```

### Atributos de Usuário

Atributos padrão:
- `email`
- `phone_number`
- `name`
- `given_name`
- `family_name`
- `picture`
- `website`

Atributos customizados:

```bash
aws cognito-idp add-custom-attributes \
  --user-pool-id us-east-1_xxxxx \
  --custom-attributes Name=department,AttributeDataType=String
```

### Registrar Usuário

```javascript
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

// Sign up
await cognito.signUp({
  ClientId: 'your-client-id',
  Username: 'user@example.com',
  Password: 'SecurePassword123!',
  UserAttributes: [
    { Name: 'email', Value: 'user@example.com' },
    { Name: 'name', Value: 'John Doe' }
  ]
}).promise();
```

### Confirmar Registro

```javascript
// Confirmar com código de verificação
await cognito.confirmSignUp({
  ClientId: 'your-client-id',
  Username: 'user@example.com',
  ConfirmationCode: '123456'
}).promise();
```

### Login

```javascript
// Autenticar usuário
const result = await cognito.initiateAuth({
  AuthFlow: 'USER_PASSWORD_AUTH',
  ClientId: 'your-client-id',
  AuthParameters: {
    USERNAME: 'user@example.com',
    PASSWORD: 'SecurePassword123!'
  }
}).promise();

const accessToken = result.AuthenticationResult.AccessToken;
const idToken = result.AuthenticationResult.IdToken;
const refreshToken = result.AuthenticationResult.RefreshToken;
```

### Refresh Token

```javascript
// Renovar tokens
const result = await cognito.initiateAuth({
  AuthFlow: 'REFRESH_TOKEN_AUTH',
  ClientId: 'your-client-id',
  AuthParameters: {
    REFRESH_TOKEN: refreshToken
  }
}).promise();
```

## Identity Pools

### Criar Identity Pool

```bash
aws cognito-identity create-identity-pool \
  --identity-pool-name my-identity-pool \
  --allow-unauthenticated-identities \
  --cognito-identity-providers ProviderName=cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxx,ClientId=your-client-id
```

### Obter Credenciais AWS

```javascript
const AWS = require('aws-sdk');

// Para usuários autenticados
const cognitoIdentity = new AWS.CognitoIdentity();
const credentials = await cognitoIdentity.getCredentialsForIdentity({
  IdentityId: identityId,
  Logins: {
    'cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxx': idToken
  }
}).promise();

// Usar credenciais para acessar recursos AWS
const s3 = new AWS.S3({
  accessKeyId: credentials.Credentials.AccessKeyId,
  secretAccessKey: credentials.Credentials.SecretKey,
  sessionToken: credentials.Credentials.SessionToken
});
```

## Social Identity Providers

### Configurar Google

1. Criar projeto no Google Cloud Console
2. Obter Client ID e Client Secret
3. Configurar no Cognito:

```bash
aws cognito-idp create-identity-provider \
  --user-pool-id us-east-1_xxxxx \
  --provider-name Google \
  --provider-type Google \
  --provider-details client_id=your-google-client-id,client_secret=your-google-client-secret,authorize_scopes=email openid profile
```

### Configurar Facebook

```bash
aws cognito-idp create-identity-provider \
  --user-pool-id us-east-1_xxxxx \
  --provider-name Facebook \
  --provider-type Facebook \
  --provider-details client_id=your-facebook-app-id,client_secret=your-facebook-app-secret
```

### Login Social

```javascript
// Usar Amplify ou SDK
import { Auth } from 'aws-amplify';

// Login com Google
await Auth.federatedSignIn({ provider: 'Google' });

// Login com Facebook
await Auth.federatedSignIn({ provider: 'Facebook' });
```

## Multi-Factor Authentication (MFA)

### Habilitar MFA

```bash
aws cognito-idp set-user-pool-mfa-config \
  --user-pool-id us-east-1_xxxxx \
  --mfa-configuration OPTIONAL \
  --software-token-mfa-configuration Enabled=true
```

### Configurar MFA para Usuário

```javascript
// Associar dispositivo TOTP
const result = await cognito.associateSoftwareToken({
  AccessToken: accessToken
}).promise();

const secretCode = result.SecretCode;

// Verificar código
await cognito.verifySoftwareToken({
  AccessToken: accessToken,
  UserCode: '123456'
}).promise();

// Habilitar MFA
await cognito.setUserMFAPreference({
  AccessToken: accessToken,
  SoftwareTokenMfaSettings: {
    Enabled: true,
    PreferredMfa: true
  }
}).promise();
```

## Lambda Triggers

Cognito pode invocar funções Lambda em vários pontos do fluxo de autenticação:

### Triggers Disponíveis

- **Pre Sign-up**: Antes de registrar usuário
- **Post Confirmation**: Após confirmar registro
- **Pre Authentication**: Antes de autenticar
- **Post Authentication**: Após autenticar
- **Pre Token Generation**: Antes de gerar tokens
- **Custom Message**: Personalizar mensagens
- **Define Auth Challenge**: Para custom auth flows
- **Create Auth Challenge**: Criar desafio de autenticação
- **Verify Auth Challenge**: Verificar resposta do desafio

### Exemplo: Pre Sign-up Trigger

```javascript
exports.handler = async (event) => {
  // Validar dados antes de criar usuário
  if (event.request.userAttributes.email.endsWith('@example.com')) {
    throw new Error('Emails do domínio example.com não são permitidos');
  }
  
  // Auto-confirmar usuário
  event.response.autoConfirmUser = true;
  event.response.autoVerifyEmail = true;
  
  return event;
};
```

## Hosted UI

Cognito oferece uma UI hospedada para autenticação:

### Configurar Hosted UI

1. Configurar domain para User Pool
2. Configurar callback URLs
3. Configurar OAuth scopes
4. Usar URL do Hosted UI

### Exemplo

```
https://your-domain.auth.us-east-1.amazoncognito.com/login?
  client_id=your-client-id&
  response_type=code&
  scope=email+openid+profile&
  redirect_uri=https://your-app.com/callback
```

## Recuperação de Senha

### Solicitar Reset

```javascript
await cognito.forgotPassword({
  ClientId: 'your-client-id',
  Username: 'user@example.com'
}).promise();
```

### Confirmar Reset

```javascript
await cognito.confirmForgotPassword({
  ClientId: 'your-client-id',
  Username: 'user@example.com',
  ConfirmationCode: '123456',
  Password: 'NewPassword123!'
}).promise();
```

## Grupos e Roles

### Criar Grupo

```javascript
await cognito.createGroup({
  GroupName: 'admins',
  UserPoolId: 'us-east-1_xxxxx',
  Description: 'Administrators group',
  Precedence: 1
}).promise();
```

### Adicionar Usuário a Grupo

```javascript
await cognito.adminAddUserToGroup({
  UserPoolId: 'us-east-1_xxxxx',
  Username: 'user@example.com',
  GroupName: 'admins'
}).promise();
```

### IAM Roles por Grupo

Configure IAM roles no Identity Pool baseado em grupos do User Pool.

## Boas Práticas

### Segurança

1. **Use HTTPS sempre**: Para todas as comunicações
2. **Configure políticas de senha fortes**: Mínimo 8 caracteres, complexidade
3. **Habilite MFA**: Para contas sensíveis
4. **Use token expiration apropriado**: Não muito longo
5. **Valide tokens**: Sempre valide tokens antes de usar
6. **Rotacione secrets**: Regularmente

### Performance

1. **Use token caching**: Cache tokens quando apropriado
2. **Use refresh tokens**: Para renovar sem re-autenticar
3. **Otimize Lambda triggers**: Evite triggers lentos
4. **Use connection pooling**: Para acessar recursos AWS

### Design

1. **Separe User Pool e Identity Pool**: Para flexibilidade
2. **Use grupos para autorização**: Facilita gerenciamento
3. **Configure atributos apropriados**: Não exponha dados desnecessários
4. **Use custom attributes**: Para dados específicos da aplicação

### Custo

1. **Monitore MAUs**: Monthly Active Users
2. **Use Identity Pools com cuidado**: Cada identidade tem custo
3. **Otimize Lambda triggers**: Reduz invocações
4. **Use MFA SMS com moderação**: SMS tem custo por mensagem

## Casos de Uso

- **Aplicações Web**: Autenticação para SPAs e aplicações web
- **Aplicativos Móveis**: Autenticação para iOS e Android
- **APIs**: Proteger APIs com autenticação
- **Single Sign-On (SSO)**: SSO para múltiplas aplicações
- **Social Login**: Login com Google, Facebook, etc.
- **Enterprise**: Integração com SAML/OIDC corporativos
- **Multi-tenant**: Isolamento de dados por tenant

## Integração com Amplify

AWS Amplify simplifica uso do Cognito:

```javascript
import { Auth } from 'aws-amplify';

// Configurar
Auth.configure({
  region: 'us-east-1',
  userPoolId: 'us-east-1_xxxxx',
  userPoolWebClientId: 'your-client-id'
});

// Sign up
await Auth.signUp({
  username: 'user@example.com',
  password: 'SecurePassword123!',
  attributes: {
    email: 'user@example.com',
    name: 'John Doe'
  }
});

// Sign in
const user = await Auth.signIn('user@example.com', 'SecurePassword123!');

// Sign out
await Auth.signOut();

// Obter usuário atual
const currentUser = await Auth.currentAuthenticatedUser();
```

## Exemplo Completo: Fluxo de Autenticação

```javascript
// 1. Registrar usuário
await cognito.signUp({
  ClientId: 'your-client-id',
  Username: 'user@example.com',
  Password: 'SecurePassword123!',
  UserAttributes: [
    { Name: 'email', Value: 'user@example.com' }
  ]
});

// 2. Confirmar com código
await cognito.confirmSignUp({
  ClientId: 'your-client-id',
  Username: 'user@example.com',
  ConfirmationCode: '123456'
});

// 3. Login
const authResult = await cognito.initiateAuth({
  AuthFlow: 'USER_PASSWORD_AUTH',
  ClientId: 'your-client-id',
  AuthParameters: {
    USERNAME: 'user@example.com',
    PASSWORD: 'SecurePassword123!'
  }
});

// 4. Usar tokens para acessar recursos
const idToken = authResult.AuthenticationResult.IdToken;

// 5. Obter credenciais AWS (via Identity Pool)
const credentials = await getCredentialsForIdentity(idToken);

// 6. Acessar recursos AWS
const s3 = new AWS.S3({ credentials });
await s3.putObject({
  Bucket: 'my-bucket',
  Key: 'user-data.json',
  Body: JSON.stringify({ userId: 'user123' })
}).promise();
```

