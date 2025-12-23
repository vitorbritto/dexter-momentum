# SHA

SHA (Secure Hash Algorithm) é uma família de algoritmos de hash criptográfico, criada para integridade e autenticação, não para armazenar senhas.

**Principais variantes:**

- SHA-1 → 160 bits (quebrado)
- SHA-256 → 256 bits
- SHA-512 → 512 bits

**Propriedades:**

- Determinístico
- Rápido
- Unidirecional
- Amplamente usado em protocolos

**Exemplo:**

```
senha: 123456
sha256: 8d969eef6ecad3c29a3a629280e686cf...
```

## Onde o SHA falha para senhas

**O problema é simples e fatal:** SHA é rápido demais. Para senha, rapidez = vulnerabilidade.

**Consequências:**

- Sim, criptograficamente.
- Não, para senha.

**Importante separar:**

- Seguro contra colisão é diferente de seguro contra _brute force_ (força bruta)
- Hash forte é diferente de KDF (_Key Derivation Function_) (Password Hash)

**SHA resolve:**

```
sha256(salt + senha)
```

## Iterações (_stretching_): ainda insuficiente

**Outro erro comum:**

```
sha256(sha256(sha256(...)))
```

**Mesmo com:**

- 10 mil
- 100 mil
- 1 milhão de iterações

**Ainda:**

- SHA é otimizado em hardware
- GPUs escalam muito bem
- Custo cresce pouco para o atacante

> 👉 É remendo, não solução.

Aqui está o ponto-chave:

- SHA = hash criptográfico
- BCrypt / Scrypt / Argon2 = Password Hash / KDF

KDFs:

## SHA-1: morto, enterrado e proibido

- SHA-1 tem colisões práticas
- Proibido em TLS
- Proibido em assinaturas
- Proibido em qualquer sistema novo

> 👉 SHA-1 não deve existir em código moderno.

## Comparação direta para senha

**SHA pode aparecer, mas como parte de algo maior:**

- HMAC-SHA256 (tokens, API keys)
- PBKDF2-SHA256 (KDF — aceitável, mas inferior a Argon2/Scrypt)
- Assinaturas de JWT (HS256, RS256)

> 👉 O erro é usar SHA puro para senha.

**Regra prática:** Nunca usar SHA puro para armazenar senha.
