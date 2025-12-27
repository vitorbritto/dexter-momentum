# Cyclomatic Complexity

Cyclomatic Complexity (Complexidade Ciclomática) é uma métrica que mede quantos caminhos lógicos independentes existem em um trecho de código.

**Em termos simples:**
👉 quanto mais if, else, switch, for, while, catch, etc., maior a complexidade.

## Para que isso serve?

- Medir dificuldade de entendimento
- Medir dificuldade de teste
- Indicar risco de bugs
- Ajudar a decidir quando refatorar

## Regra prática

- 1 → código simples, linear
- 2–5 → ok
- 6–10 → atenção
- > 10 → código difícil de manter e testar

## Exemplo simples em JavaScript

**Complexidade = 1**

```ts
function sum(a, b) {
  return a + b;
}

// Nenhuma decisão → 1 caminho
```

**Complexidade = 2**

```ts
function isAdult(age) {
  if (age >= 18) {
    return true;
  }

  return false;
}

// 1 if → 2 caminhos
```

**Complexidade = 4**

```ts
function getDiscount(user) {
  if (user.isVip) {
    return 20;
  } else if (user.isEmployee) {
    return 30;
  } else if (user.hasCoupon) {
    return 10;
  }
  return 0;
}

// Cada if / else if adiciona um caminho.
```

## Fórmula (conceito)

**A forma clássica é: `M = E − N + 2P`**

Mas no dia a dia, pense assim: cada ponto de decisão aumenta a complexidade em 1

**Por que alta complexidade é ruim?**

- Mais caminhos = mais testes necessários
- Mais chances de bugs escondidos
- Código difícil de ler e evoluir
- Refatorações ficam arriscadas

**Como reduzir Cyclomatic Complexity?**

- Quebrar funções grandes em funções menores
- Usar early return
- Evitar if aninhado
- Aplicar polimorfismo ou mapas de decisão

**Exemplo de refatoração**

**❌ Antes:**

```ts
function getRole(role) {
  if (role === "admin") return 1;
  if (role === "user") return 2;
  if (role === "guest") return 3;
}
```

**✅ Depois:**

```ts
const roleMap = {
  admin: 1,
  user: 2,
  guest: 3,
};

function getRole(role) {
  return roleMap[role];
}
```

**Resumo direto**

- Mede quantos caminhos o código pode seguir
- Quanto maior, mais difícil de manter
- Não é sobre performance, é sobre legibilidade e qualidade
- Ideal: manter baixo e controlado

**Se quiser, posso:**

- Mostrar como ferramentas (ESLint, Sonar) medem isso
- Explicar o impacto em testes unitários
- Dar exemplos reais de refatoração em código legado
