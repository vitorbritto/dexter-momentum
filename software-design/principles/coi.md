# Composition over Inheritance (CoI)

Composition over Inheritance (Composição em vez de Herança) é um princípio de design que diz:

Preferir montar comportamentos combinando objetos (composição) em vez de estender classes (herança).

Em termos práticos: compor é encaixar peças, herdar é fundir tudo numa hierarquia rígida. A primeira escala; a segunda cobra juros.

# O problema real da herança

Herança cria acoplamento forte entre pai e filho. Quando o pai muda, os filhos quebram. Pior: você herda tudo, inclusive o que não precisa.

**Cheiros clássicos de herança problemática:**

- "Só herdei para reutilizar código"
- Override que quebra contrato
- Classe base gigante
- Hierarquia profunda (A → B → C → D)
- Mudança em cima quebrando coisas embaixo

## Exemplo

**Herança que vira armadilha**

```ts
class Bird {
  fly() {
    console.log("flying");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins can't fly");
  }
}
```

**Isso viola:**

- POLA (surpresa)
- LSP (substituição)
- KISS (complexidade desnecessária)

**✅ Composição: comportamento plugável**

```ts
type FlyBehavior = {
  fly(): void;
};

const canFly: FlyBehavior = {
  fly: () => console.log("flying"),
};

const cannotFly: FlyBehavior = {
  fly: () => {
    throw new Error("cannot fly");
  },
};

class Bird {
  constructor(private flyBehavior: FlyBehavior) {}

  fly() {
    this.flyBehavior.fly();
  }
}

const sparrow = new Bird(canFly);
const penguin = new Bird(cannotFly);
```

**Agora:**

- Comportamento é explícito
- Zero override perigoso
- Fácil testar
- Fácil mudar

## Quando herança ainda faz sentido?

**Herança não é proibida, só cara.**

Use herança quando:

- Relação "é um" for real e estável
- Comportamento não variar
- Contrato for forte e claro
- Hierarquia rasa (1 nível, no máximo)

**Exemplo aceitável:**

```ts
class DomainError extends Error {}
class UserNotFoundError extends DomainError {}
```

Aqui a hierarquia expressa semântica, não reutilização de lógica.

> 💡 **Herança te dá poder rápido. Composição te dá controle a longo prazo.**
