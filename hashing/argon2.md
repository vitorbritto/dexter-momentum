# Argon2

Argon2 é um Password Hashing Function (PHF) moderno, vencedor do Password Hashing Competition (PHC) em 2015.

Ele foi criado explicitamente para substituir:

- BCrypt
- Scrypt
- PBKDF2

**Objetivo claro:** Maximizar o custo para ataques modernos (GPU, ASIC, paralelismo) mantendo controle operacional.

# O problema que o Argon2 resolve

- BCrypt → não é memory-hard
- Scrypt → complexo de configurar corretamente
- PBKDF2 → CPU-bound e GPU-friendly

**Argon2 resolve isso combinando:**

- ⏱️ Tempo
- 🧠 Memória
- 🔁 Paralelismo controlado

Tudo configurável.

⸻

# O conceito-chave: custo tridimensional

**Argon2 não trabalha com “um número mágico”.**

Ele trabalha com três eixos de custo:

- time_cost → quantas iterações
- memory_cost → quanta memória (em KB/MB)
- parallelism → quantos lanes de execução

Isso muda completamente o jogo:

- GPU sofre (memória)
- ASIC fica caro
- Ataque escala mal

> 👉 Memória é o gargalo real hoje.

# As três variantes do Argon2

**Aqui muita gente se perde. Vamos direto ao ponto.**

### 🔹 Argon2d

- Acesso à memória dependente dos dados
- Mais resistente a GPU
- ❌ Vulnerável a side-channel

### 🔹 Argon2i

- Acesso à memória independente dos dados
- Mais seguro contra side-channel
- Um pouco menos resistente a GPU

### 🔹 Argon2id (recomendado)

- Combina Argon2i + Argon2d
- Seguro contra side-channel
- Excelente resistência a GPU

> 👉 Use Argon2id. Sempre.

# Salt no Argon2

Assim como BCrypt e Scrypt:

- Salt é obrigatório
- Gerado aleatoriamente
- Armazenado junto ao hash

Resultado:

- Mesma senha ≠ mesmo hash
- Rainbow tables inutilizadas

Nada de inventar moda aqui.

# Salt no Argon2

O fluxo é simples (e poderoso):

1. Usuário digita a senha
2. Argon2 aplica:

- Salt
- Memória configurada
- Iterações
- Paralelismo

3. Gera hash
4. Armazena hash + parâmetros
5. No login, refaz o processo e compara

# Por que Argon2 é tão difícil de atacar

| Recurso              | BCrypt  | Scrypt  | Argon2    |
| -------------------- | ------- | ------- | --------- |
| CPU-bound            | ✅      | ⚠️      | ❌        |
| Memory-hard          | ❌      | ✅      | ✅        |
| GPU-friendly         | Parcial | Difícil | ❌        |
| ASIC-friendly        | Parcial | ❌      | ❌        |
| Parâmetros flexíveis | Médio   | Alto    | Altíssimo |

> 👉 No Argon2, cada tentativa de senha consome memória real, não cacheável.

Ataque em massa vira problema financeiro.

- ❌ Não descriptografa
- ❌ Não é reversível
- ✅ É hash unidirecional

**Ele não guarda senha.**
**Guarda prova computacional cara.**

# Limitações reais do Argon2

Custos:

- Mais memória no servidor
- Configuração errada pode gerar DoS
- Nem toda stack antiga suporta bem
- Latência maior que BCrypt

> 👉 Segurança máxima cobra preço operacional.

# Parâmetros recomendados (base segura)

Valores típicos hoje:

- Argon2id
- memory_cost = 64 MB
- time_cost = 2 ou 3
- parallelism = número de cores lógicas

Isso já:

- Derruba GPU
- Mantém login aceitável
- É seguro para a maioria das APIs

# Argon2 vs o resto (senha)

| Algoritmo | Status atual     |
| --------- | ---------------- |
| MD5       | Morto            |
| SHA puro  | Inadequado       |
| PBKDF2    | Legado aceitável |
| BCrypt    | Bom              |
| Scrypt    | Muito bom        |
| Argon2id  | Melhor opção     |

# Quando usar Argon2 (ou não)

Usar quando:

- Sistema novo
- Segurança é prioridade real
- Ataque offline é risco
- Infra aguenta memória

Evitar quando:

- Ambientes ultra restritos
- Legacy pesado
- Falta de controle fino de parâmetros
