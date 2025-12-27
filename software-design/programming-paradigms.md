# Programming Paradigms

A programação não é apenas sobre escrever código, mas sobre como pensar e estruturar soluções. É aí que entram os paradigmas de programação.

Um paradigma de programação é um estilo fundamental de resolver problemas usando uma linguagem. Ele define como o código é organizado, como os dados são manipulados e como o fluxo de execução acontece. Nenhum paradigma é "melhor" que outro. Cada um resolve melhor certos tipos de problemas e traz seus próprios trade-offs.

Linguagens modernas como JavaScript (Node.js) são multiparadigma, ou seja, permitem a utilização de diferentes abordagens conforme a necessidade. Isso é poderoso, mas exige consciência para não virar bagunça.

## 1. Programação Imperativa

A programação imperativa foca em como o programa deve executar passo a passo. Você descreve instruções explícitas que alteram o estado do sistema ao longo do tempo.

**Características:**

- Uso intenso de variáveis mutáveis
- Controle explícito de fluxo (if, for, while)
- Código orientado a comandos

**Exemplo:**

```ts
function sum(numbers) {
  let total = 0;

  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }

  return total;
}

console.log(sum([1, 2, 3, 4]));
```

> 👉 Aqui você controla cada passo: inicializa variável, itera, soma, retorna.

## 2. Programação Funcional

A programação funcional trata o código como composição de funções puras. O foco está em o que deve ser feito, não em como o estado muda.

**Características:**

- Funções puras (sem efeitos colaterais)
- Imutabilidade
- Funções como valores
- Uso de map, filter, reduce

**Exemplo:**

```ts
const sum = (numbers) => numbers.reduce((total, value) => total + value, 0);

console.log(sum([1, 2, 3, 4]));
```

> 👉 Não há variáveis mutáveis nem controle explícito de loop. O código descreve a transformação dos dados.

## 3. Programação Orientada a Objetos (OOP)

A programação orientada a objetos organiza o código em objetos que combinam dados e comportamento.
É útil para modelar domínios complexos.

**Características:**

- Encapsulamento
- Abstração
- Herança
- Polimorfismo

**Exemplo:**

```ts
class Calculator {
  sum(a, b) {
    return a + b;
  }
}

const calculator = new Calculator();
console.log(calculator.sum(2, 3));
```

> 👉 O comportamento (sum) pertence a um objeto que representa um conceito do domínio.

## 4. Programação Lógica

A programação lógica descreve o problema em termos de regras e fatos, e o sistema encontra a solução.
É mais comum em linguagens como Prolog, mas pode ser simulada em JavaScript.

**Características:**

- Declaração de regras
- Inferência lógica
- Foco no “o que é verdade”, não no fluxo

**Exemplo:**

```ts
const rules = [(person) => person.age >= 18 && person.country === "BR"];

function isAdult(person) {
  return rules.every((rule) => rule(person));
}

console.log(isAdult({ age: 20, country: "BR" }));
```

> 👉 Você define regras, e o sistema verifica se os fatos satisfazem essas regras.

## 5. Programação Declarativa

A programação declarativa descreve o resultado esperado, não os passos para chegar lá.
Ela aparece muito em bancos de dados, templates, configurações e APIs modernas.

**Características:**

• Código mais expressivo

- Menos detalhes de implementação
- Maior legibilidade

**Exemplo:**

```ts
const users = [
  { name: "Ana", active: true },
  { name: "João", active: false },
  { name: "Maria", active: true },
];

const activeUsers = users.filter((user) => user.active);

console.log(activeUsers);
```

> 👉 Você declara o que quer (usuários ativos), não como iterar ou controlar estado.

## Conclusão

Paradigmas de programação são formas diferentes de pensar sobre o mesmo problema.
No mundo real, especialmente com Node.js, você raramente usa apenas um.

**O ponto-chave é:**

- Usar imperativo quando controle explícito é necessário
- Preferir funcional para transformação de dados
- Usar OOP para modelar domínios complexos
- Aplicar declarativo para deixar o código mais legível
- Recorrer à lógica quando regras dominam o problema

Dominar paradigmas não é decorar conceitos — é saber escolher conscientemente o estilo certo para cada situação.
