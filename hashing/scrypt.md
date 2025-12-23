# Scrypt

## O que é o Scrypt

Scrypt é um algoritmo de derivação de chave (KDF) criado em 2009 com um objetivo muito claro:

Tornar ataques com GPU, FPGA e ASIC caros demais para valer a pena.

Ele foi projetado especificamente para armazenamento seguro de senhas, corrigindo limitações que ainda existiam no BCrypt.

## O problema que o Scrypt resolve

BCrypt é lento, mas:

- Ainda é CPU-bound
- GPUs modernas conseguem otimizar ataques
- Paralelismo ainda é viável

O Scrypt adiciona uma nova barreira:

> 👉 Consumo agressivo de memória (memory-hard)

Isso muda completamente o custo do ataque.

## O conceito-chave: memory-hard

Scrypt força o atacante a:

- Alocar grandes blocos de memória
- Acessar essa memória de forma pseudo-aleatória
- Manter essa memória por tentativa de senha

Resultado:

- GPUs perdem eficiência
- ASICs ficam caros
- Ataque escala mal

💡 Memória é cara, lenta de escalar e difícil de paralelizar.

## Parâmetros do Scrypt

Scrypt não tem “um número mágico” como o cost do BCrypt.

Ele trabalha com três parâmetros:

- N -> custo computacional (CPU/memória)
- r -> tamanho do bloco
- p -> paralelismo

Interpretação prática:

- N -> quanto maior, mais caro
- r -> aumenta uso de memória
- p -> controla paralelismo interno

**Exemplo comum:**

```bash
N = 16384
r = 8
p = 1
```

> 👉 Esses valores já tornam ataques em GPU inviáveis em larga escala.

## Salt no Scrypt

Assim como BCrypt:

- Scrypt usa salt
- O salt é armazenado junto ao hash
- Mesma senha ≠ mesmo hash

Isso elimina:

- Rainbow tables
- Ataques pré-computados

## Fluxo de hash e verificação

Fluxo padrão:

1. Usuário digita senha
2. Scrypt aplica:
   - Salt
   - Parâmetros N, r, p
   - Funções de memória e CPU
3. Gera hash
4. Armazena hash + parâmetros
5. No login, refaz o processo e compara

## Por que Scrypt é caro para atacar

Vamos falar de custo real:

| Recurso       |    MD5     | BCrypt  | Scrypt |
| ------------- | :--------: | :------ | :----- |
| CPU           |   Baixo    | Médio   | Alto   |
| Memória       | Quase zero | Baixa   | Alta   |
| GPU-friendly  |    Sim     | Parcial | ❌     |
| ASIC-friendly |    Sim     | Parcial | ❌     |

> 👉 Em Scrypt, cada tentativa de senha consome memória dedicada.
> Não dá para “multiplicar tentativas” facilmente.

## Scrypt NÃO é criptografia

Reforço importante:

- ❌ Não descriptografa
- ❌ Não reverte
- ✅ Hash unidirecional

Scrypt não guarda senha, guarda prova computacional.

## Limitações reais do Scrypt

Sem fanboyismo:

Limitações:

- Configuração mais complexa
- Pode causar DoS se parâmetros forem exagerados
- Nem todas as libs são bem mantidas
- Menos padronizado que Argon2

> 👉 É poderoso, mas exige maturidade operacional.

## Scrypt vs BCrypt vs Argon2

| Critério          |  BCrypt   |  Scrypt   |  Argon2   |
| ----------------- | :-------: | :-------: | :-------: |
| Fácil de usar     |    ✅     |    ⚠️     |    ⚠️     |
| Memory-hard       |    ❌     |    ✅     |    ✅     |
| Resistência a GPU |    Boa    | Muito boa | Excelente |
| Estado da arte    | Aceitável |    Bom    |   Atual   |
| Auditoria         |   Alta    |   Alta    |   Alta    |

## Quando usar Scrypt

- Segurança é prioridade real
- Existe risco de ataque offline
- Você quer custo real para o atacante
- Infra aguenta consumo de memória

## Regra prática (guarde isso)

Scrypt é uma arma pesada. Use conscientemente.

- **Configuração ruim:** Derruba seu próprio sistema
- **Configuração correta:** Derruba o atacante
