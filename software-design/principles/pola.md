# O Principle of Least Astonishment (POLA)

POLA (Principle of Least Astonishment) é um princípio que diz que um sistema deve se comportar da forma menos surpreendente possível para quem o usa.

Vamos olhar pelo prisma do código, quando alguém lê ou usa sua API/função, o comportamento deve bater com a expectativa intuitiva. Se a pessoa precisa "descobrir a pegadinha", você violou o princípio do qual estamos falando.

**POLA vale para:**

- nomes de funções;
- retorno de métodos;
- efeitos colaterais;
- defaults;
- erros;
- APIs públicas e internas.

**POLA não tem relação com:**

- "todo mundo vai gostar";
- "seguir gosto pessoal";
- "evitar qualquer decisão".

**POLA é respeitar expectativas comuns, padrões da linguagem e do domínio.**

## Onde POLA mais quebra

- Função que parece pura, mas tem side effect.
- Função que parece sync, mas faz I/O.
- Nome que sugere uma coisa, mas faz outra.
- Retorno que muda de tipo conforme o caso.
- Default perigoso.

## Exemplo - Função que surpreende pelo nome

```ts
// ❌ Violação de POLA

function getUser(id: string) {
  // surpresa: cria se não existir
  let user = db.find(id);
  if (!user) {
    user = db.create({ id });
  }
  return user;
}
```

> 💡 Quem lê getUser espera buscar, não criar.

```ts
// ✅ POLA

function getUser(id: string) {
  return db.find(id);
}

function getOrCreateUser(id: string) {
  return db.find(id) ?? db.create({ id });
}
```

> 💡 Nome explicita comportamento → zero surpresa.
