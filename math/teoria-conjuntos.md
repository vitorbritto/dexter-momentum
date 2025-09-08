# Teoria de Conjuntos e Princípios de Contagem

É uma linguagem matemática para descrever conjuntos e suas relações.

## Representação de Conjuntos

### Explicita

Podemos listar os elementos do conjunto entre chaves.

```
A = {1, 2, 3, 4, 5}
```

```
B = {a, b, c, d, e}
```

### Implícita

Podemos descrever o conjunto por uma propriedade que os elementos devem satisfazer.

```
A = {x | x é um número inteiro e x > 0}
-> A = {1, 2, 3, 4, 5}
-> O conjunto de objetos de A, tal que x é um número inteiro e x > 0
```

```
B = {x | x é uma letra do alfabeto}
-> B = {a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z}
-> O conjunto de objetos de B, tal que x é uma letra do alfabeto
```

## Reta Real: Intervalos e Módulos

### O que são?

- São números reais entre dois números dados.
- Reais além de um número dado.
- Reais aquém de um número dado.

### Convenção

- `R` - Conjunto de todos os números reais
- `a` - Número inicial
- `b` - Número final
- `[a, b]` - Intervalo fechado
- `]a, b[` - Intervalo aberto

### Intervalos

**Limitados**

- `[0, 10]` - Valores reais entre 0 e 10, incluindo 0 e 10
- `]0, 10[` - Valores reais entre 0 e 10, excluindo 0 e 10

**Ilimitados**

- `[-9, +∞[` - Valores reais além de -9, incluindo -9
- `]-∞, 5[` - Valores reais aquém de 5, excluindo 5

### Módulos

- `|x|` - Módulo de um número real

## Operações entre Conjuntos

### União

**Representação:** `A ∪ B` -> União de conjuntos A e B

**Exemplo:**

```
A = {1, 2, 3, 4, 5}
B = {6, 7, 8, 9, 10}
A ∪ B = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
```

### Intersecção

**Representação:** `A ∩ B` -> Intersecção de conjuntos A e B

**Exemplo:**

```
A = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
B = {6, 7, 8, 9, 10}
-> A ∩ B = {6, 7, 8, 9, 10}
```

### Diferença

**Representação:** `A - B` -> Diferença de conjuntos A e B

**Exemplo:**

```
A = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
B = {6, 7, 8, 9, 10}
-> A - B = {1, 2, 3, 4, 5}
```

## Princípios de Contagem

### Princípios básicos

- Princípio da Adição
- Princípio da Multiplicação
- Princípio da Casa dos Pombos (Princípio das Gavetas)

### Agrupamentos Simples

- Padrões de Arranjos
- Padrões de Permutações
- Padrões de Combinações

### Agrupamentos Complementares

- Agrupamentos especiais ordenados ou não ordenados -->
