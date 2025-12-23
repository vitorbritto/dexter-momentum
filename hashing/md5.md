# MD5

## O que é MD5

MD5 (Message Digest Algorithm 5) é um algoritmo de hash criptográfico criado em 1991 para verificar integridade de dados, não para proteger senhas.

- Entrada → qualquer tamanho
- Saída → 128 bits (32 caracteres hexadecimais)
- Determinístico e rápido

**Exemplo:**

```
senha: 123456
md5: e10adc3949ba59abbe56e057f20f883e
```

## O problema fundamental do MD5

O MD5 falha exatamente onde senhas precisam ser fortes:

- ⚡ Rápido demais
- ❌ Sem salt nativo
- ❌ Sem custo configurável
- ❌ Vulnerável a colisões
- ❌ Quebrável em GPU / ASIC

> 👉 Ele foi feito para detectar corrupção de dados, não para resistir a ataque.

## Velocidade: o maior inimigo

Para senhas, velocidade é uma vulnerabilidade.

Na prática:

- GPUs quebram bilhões de hashes MD5 por segundo
- Tabelas rainbow já vêm prontas
- Ataque offline = senha morta

Se um banco de dados vazar com MD5: não é “se” será quebrado, é “quando” (e geralmente em minutos).

## Ausência de salt (e por que isso destrói tudo)

MD5 não tem salt embutido.

Consequência:

- Mesma senha → mesmo hash
- Ataques pré-computados funcionam
- Rainbow tables continuam eficazes

**Exemplo clássico:**

```
123456 → e10adc3949ba59abbe56e057f20f883e
```

Esse hash está em milhares de bases públicas.

**Mesmo quando alguém “inventa”:**

```
md5(salt + senha)
```

**Continua fraco:**

- Salt pequeno
- Implementação inconsistente
- Ataque ainda viável

## Colisões (o prego no caixão)

MD5 é oficialmente quebrado em termos criptográficos.

Isso significa:

- Dois conteúdos diferentes podem gerar o mesmo hash
- Integridade e autenticidade ficam comprometidas

Hoje:

- Certificados
- Assinaturas
- Segurança

> 👉 MD5 é proibido nesses contextos.

**Importante deixar claro:**

- MD5 não criptografa
- Não é reversível
- É hash unidirecional

**Mas atenção:**

- Ser unidirecional não significa ser seguro
- MD5 é unidirecional e ainda assim inútil para senhas.

## Fluxo típico (e errado) com MD5

**O que muita aplicação antiga fazia:**

1. Usuário envia senha
2. Backend faz MD5 (senha)
3. Salva no banco
4. Compara hashes no login

**Funciona?** ✔️ Sim.

**É seguro?** ❌ Não.

## "Mas e se eu usar salt + MD5?"

**Resposta curta:** não resolve.

**Mesmo com:**

```
md5(salt + senha)
```

**Continua:**

- ⚡ Muito rápido
- ✅ Fácil de paralelizar
- ❌ Quebrável em GPU
- ❌ Sem custo adaptativo

> 👉 É tentar blindar uma bicicleta com fita isolante.

## Onde MD5 ainda faz sentido (raríssimos casos)

> 👉 MD5 não morreu totalmente, mas saiu da segurança.

Casos aceitáveis:

- Checksums não críticos
- Verificação rápida de integridade local
- Deduplicação não sensível
- Comparação de arquivos sem risco

**Casos proibidos:**

- ❌ Senhas
- ❌ Tokens
- ❌ Assinaturas
- ❌ Autenticação
- ❌ Qualquer coisa de segurança

## MD5 vs BCrypt

| Critério         | MD5 | BCrypt       |
| ---------------- | :-: | :----------- |
| Uso para senha   | ❌  | ✅           |
| Salt embutido    | ❌  | ✅           |
| Custo ajustável  | ❌  | ✅           |
| Lento por design | ❌  | ✅           |
| Resistente a GPU | ❌  | ✅           |
| Estado da arte   | ❌  | ✔️ aceitável |

## Regra prática

Se você encontrar MD5 em código de autenticação, isso é dívida técnica grave.

**Ação correta:**

- ✅ Migrar hashes
- ✅ Re-hash no login
- ❌ Nunca criar algo novo com MD5

> 👉 Sem exceção.
