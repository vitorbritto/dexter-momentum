# Clean Code

Código limpo é código que comunica intenção com clareza, minimiza surpresas e reduz o custo de mudança.

Não é sobre:

- ser "bonito";
- usar padrão da moda;
- seguir regra cega.

**É sobre sobrevivência do software no tempo.**

## Os pilares do Clean Code

| Pilar              | Ideia central                             |
| ------------------ | ----------------------------------------- |
| Legibilidade       | Código é lido mais vezes do que escrito   |
| Simplicidade       | Menos estados, menos caminhos, menos bugs |
| Intenção explícita | Nome certo elimina comentários            |
| Baixo acoplamento  | Mudança localizada                        |
| Alta coesão        | Cada coisa no seu lugar                   |
| Disciplina         | Qualidade é hábito, não evento            |

## Clean Code

**Tema:** o que é código limpo e por que ele importa?

**Ideias-chave:**

- Código ruim retarda tudo: `feature`, `bugfix`e até mesmo uma deploy.
- "Depois a gente limpa" nunca acontece.
- Pressa gera dívida técnica -> dívida vira juros.

**Código limpo é um ato de respeito com quem vai mexer depois (inclusive você).**

### Nomes Significativos (Meaningful Names)

**Tema:** nomes são o coração do código.

**Regras práticas:**

- Nome deve responder: o que é, o que faz e por que existe.
- Evitar:
  - nomes genéricos (ex: `data`, `info`, `value`).
  - siglas obscuras (ex: `API` para `Application Programming Interface`).
  - diferenças sutis (ex: `accountData` vs `accountInfo`).

```ts
// Buscar usuários ativos

// ✅ Bom
getActiveUsers();

// ❌ Ruim
getUsers();
```

**Se o nome precisa de comentário, o nome está errado.**

### Funções (Functions)

**Tema:** funções pequenas, focadas e honestas

**Regras de ouro:**

- Fazer uma coisa só (Single Responsibility Principle);
- Poucas linhas;
- Poucos parâmetros (0–2 ideal) (Parameter Principle);
- Nomear pelo verbo correto (Verb-Object-Context).

> O Parameter Principle é uma heurística para determinar o número ideal de parâmetros para uma função.
>
> - 0 parâmetros: função pura
> - 1 parâmetro: função com um contexto
> - 2 parâmetros: função com dois contextos
> - 3 parâmetros: função com três contextos
> - 4 parâmetros: função com quatro contextos
> - 5 parâmetros: função com cinco contextos

> O Verb-Object-Context é uma heurística para determinar o nome correto de uma função.
>
> - Verbo: ação que a função realiza
> - Objeto: o objeto que a função opera
> - Contexto: o contexto em que a função é executada

```ts
// Violação do Single Responsibility Principle

// ❌ Ruim

function processOrder() {
  validateOrder();
  calculateTotal();
  persistOrder();
}

// ✅ Bom
function validateOrder(order: Order) {
  // ...
}

function calculateTotal(order: Order) {
  // ...
}

function persistOrder(order: Order) {
  // ...
}

function processOrder(order: Order) {
  validateOrder(order);
  calculateTotal(order);
  persistOrder(order);
}
```

### Comentários (Comments)

**Tema:** comentários são o último recurso

**Uncle Bob é direto:**

- Comentário não salva código ruim;
- Comentários envelhecem mal;
- Código deve se explicar sozinho.

**Quando usar comentário:**

- Por quê algo estranho existe;
- Decisão não óbvia de negócio;
- Trade-off consciente.

**Nunca para:**

- explicar o que o código faz;
- compensar nome ruim.

### Formatting (Formatação)

**Tema:** consistência visual importa

**Ideias-chave:**

- Código é lido como texto (Textual);
- Espaçamento indica estrutura (Whitespace);
- Blocos relacionados ficam próximos (Proximity).

> 💡 **Formatação errada gera fadiga cognitiva.**

### Objetos e Estruturas de Dados (Objects and Data Structures)

**Tema:** esconder implementação, expor comportamento

- Objetos -> comportamento;
- Estruturas de dados -> dados puros.

**Evitar "meio termo":**

```ts
// ❌ Ruim

class User {
  name: string;
  getName() {
    return this.name;
  }
}
```

**Ou é dado:**

```ts
type User = { name: string };
```

Ou é objeto:

```ts
class User {
getDisplayName() { ... }
}
```

### Error Handling

**Tema:** erro é fluxo normal, não exceção rara

**Boas práticas:**

- Preferir exceções a códigos de erro;
- Não retornar null silencioso;
- Tratar erro perto de onde ocorre.

```ts
// ❌ Ruim

return null;

// ✅ Bom
throw new Error("User not found");

// ✅ Bom
throw new UserNotFoundError(id);
```

> 💡 **Código feliz não deve estar poluído com lógica de erro.**

### Boundaries (Integrações com código de terceiros)

**Tema:** lidar com código de terceiros

**Boas práticas:**

- Isolar dependências externas (Dependency Inversion Principle);
- Criar adapters (Adapter Pattern);
- Não espalhar API de lib por todo o código (Single Responsibility Principle);

> 💡 **Framework muda. Seu domínio não deveria.**

### Unit Tests (Testes Unitários)

**Tema:** testes são parte do código, não extra (Test Driven Development)

**Testes bons:**

- Claros;
- Rápidos;
- Determinísticos;
- Leem como especificação.

**Testes ruins:**

- Muitos métodos;
- Muitos campos;
- Muitos motivos para mudar.

**Regra prática:**

> 💡 **Se testar é difícil, o design está errado.**

### Classes

**Tema:** coesão acima de tudo (Cohesion Over Separation)

- Classes pequenas;
- Poucas responsabilidades;
- Alto grau de coesão.

**Sinal ruim:**

- Muitos métodos;
- Muitos campos;
- Muitos motivos para mudar.

### Systems (Arquitetura de Software)

**Tema:** separar construção de uso (Separation of Concerns)

- Configuração !== execução
- Inicialização !== regra de negócio

### Emergence (Design por Disciplina)

**Tema:** design emerge com disciplina.

**As 4 regras de design simples:**

1. Passar nos testes;
2. Não duplicar;
3. Expressar intenção;
4. Poucas classes/métodos.

> 💡 **Arquitetura boa emerge, não nasce pronta.**

### Concurrency (Concorrência)

**Tema:** código concorrente é difícil

**Regras:**

- Isolar concorrência;
- Minimizar estado compartilhado;
- Preferir imutabilidade.

### Refactoring

**Tema:** limpar é parte do trabalho

**Regras:**

- Refactor pequeno;
- Frequente;
- Com testes.

> 💡 **Código limpo não é escrito. É mantido.**

### Smells, Heuristics e Case Studies (Reconhecimento de código ruim)

**Tema:** reconhecer código ruim "no faro".

Exemplos de smells:

- Funções longas;
- Condicionais profundas;
- Nomes mentirosos;
- Classes "Deus";
- Comentários defensivos.

> 💡 **Se você não consegue explicar o código para outro dev em 2 minutos, ele não está limpo.**
