# CQS

O termo "command query separation" (separação entre comando e consulta) foi cunhado por Bertrand Meyer em seu livro Object-Oriented Software Construction — uma das obras mais influentes sobre orientação a objetos nos seus primeiros anos. (A primeira edição foi a que teve maior impacto; a segunda é boa, mas você vai precisar de alguns meses de academia antes de conseguir levantá-la.)

A ideia fundamental é que devemos dividir os métodos de um objeto em duas categorias claramente separadas:

- Consultas (Queries): retornam um resultado e não alteram o estado observável do sistema (não possuem efeitos colaterais).
- Comandos (Commands): alteram o estado do sistema, mas não retornam um valor.

Como o termo "comando" é amplamente usado em outros contextos, o autor prefere chamá-los de "modificadores" (modifiers), também conhecidos como "mutadores" (mutators).

A grande sacada desse princípio é que é extremamente útil conseguir separar claramente métodos que alteram estado daqueles que não alteram. Isso porque consultas podem ser usadas em muito mais situações com confiança — podem ser introduzidas em qualquer lugar e ter sua ordem alterada sem grandes riscos. Já os modificadores exigem mais cuidado.

A noção central do princípio é que o tipo de retorno denuncia essa diferença. É uma boa convenção porque, na maioria das vezes, funciona bem. Considere, por exemplo, o idiom em Java para iterar sobre uma coleção: o método next tanto retorna o próximo item quanto avança o iterador. Pessoalmente, o autor prefere um estilo que tenha métodos separados, como advance e current.

Meyer gosta de aplicar a separação entre comando e consulta de forma absoluta, mas existem exceções. Remover um elemento de uma pilha (pop) é um bom exemplo de uma consulta que modifica estado. Meyer corretamente afirma que é possível evitar esse método, mas ele é um idiom bastante útil. Por isso, o autor prefere seguir esse princípio sempre que possível, mas está disposto a quebrá-lo para poder usar o pop.

Seria interessante se a própria linguagem desse suporte a esse conceito. Dá para imaginar uma linguagem que detectasse métodos que alteram estado, ou ao menos permitisse que o programador os marcasse explicitamente. Um dos motivos pelos quais as linguagens não conseguem detectar isso automaticamente é que a regra de “não alterar estado” se aplica apenas ao estado observável do sistema. Usar marcações explícitas do programador parece mais razoável, mas é raro. O único caso realmente conhecido é o modificador const em C++. Como o autor não usa C++ há muitos anos, é difícil avaliar sua utilidade prática, mas a impressão é que bons programadores de C++ usam bastante const — e gostam disso.

## Exemplo

### ❌ Exemplo ruim (violando CQS)

Um método que retorna valor e altera estado ao mesmo tempo:

```ts
class Counter {
  constructor() {
    this.value = 0;
  }

  next() {
    this.value += 1;
    return this.value;
  }
}

const counter = new Counter();
counter.next(); // altera estado + retorna valor
```

**Problema:**

- Você não sabe se chamar next() só para ler vai causar efeito colateral.

### ✅ Exemplo bom (seguindo CQS)

**Separando consulta de modificação:**

```ts
class Counter {
  constructor() {
    this.value = 0;
  }

  increment() {
    this.value += 1; // Command (modifier)
  }

  getValue() {
    return this.value; // Query
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.getValue());
```

**Benefício:**

- getValue() é seguro, previsível, pode ser chamado em qualquer lugar.

### ❌ Exemplo ruim (misturando consulta e modificação)

```ts
class UserService {
  constructor() {
    this.users = [];
  }

  addUser(name) {
    const user = { id: Date.now(), name };
    this.users.push(user);
    return user;
  }
}
```

**Aqui:**

- Cria usuário e retorna algo → comando + consulta juntos.

### ✅ Exemplo bom (separado (CQS))

```ts
class UserService {
  constructor() {
    this.users = [];
  }

  createUser(name) {
    const user = { id: Date.now(), name };
    this.users.push(user); // Command
  }

  findUserByName(name) {
    return this.users.find((u) => u.name === name); // Query
  }
}

// Uso:

service.createUser("Vitor");
const user = service.findUserByName("Vitor");
```
