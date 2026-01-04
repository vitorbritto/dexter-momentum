# YAGNI - You Aren't Gonna Need It

YAGNI (You Aren’t Gonna Need It) é um princípio do Extreme Programming que, na prática, significa: não implementar agora o que você só "acha" que vai precisar depois. Se a necessidade não existe hoje (requisito real, caso de uso real, dor real), não codar.

O motivo é simples e meio cruel: o "depois" quase sempre muda. E quando muda, você fica com:

- código extra para manter, testar e depurar;
- abstrações genéricas que ninguém entende;
- acoplamento e complexidade "invisível" que só aparece na pior hora.

O que YAGNI não é:

- Não é "codar mal" ou "não planejar".
- Não é ignorar extensibilidade quando o requisito já existe.
- Não é impedir refactor: pelo contrário, YAGNI assume refactor quando a necessidade aparecer.

> 💡 **A ideia é:** construir o mínimo correto agora, medir/validar, e evoluir com segurança depois.

## Sinais clássicos de violação do YAGNI

- "Vamos criar um framework interno porque talvez..."
- "Vou criar um StrategyFactory porque futuramente terá mais tipos..."
- "Vou suportar 10 bancos agora, mesmo usando 1..."
- "Vou criar um sistema de plugins porque um dia vai ter plugin..."

> 💡 **Se não tem demanda real, isso vira "complexidade a prazo com juros".**

## Exemplo 1 — "Plugin system" sem necessidade

```ts
// ❌ Anti-YAGNI (complexidade antecipada)

// "Vai que no futuro a gente precisa plugar várias promoções..."
export interface DiscountPlugin {
  name: string;
  apply(total: number): number;
}

export class DiscountEngine {
  constructor(private readonly plugins: DiscountPlugin[]) {}

  run(total: number): number {
    return this.plugins.reduce((acc, p) => p.apply(acc), total);
  }
}

// Uso: hoje só existe 1 regra, mas você já criou um ecossistema inteiro.
const engine = new DiscountEngine([
  { name: "black-friday", apply: (t) => t * 0.8 },
]);

engine.run(100);
```

```ts
// ✅ YAGNI (resolver o caso atual, simples)

export function applyDiscount(total: number): number {
  // Hoje: só existe Black Friday.
  return total * 0.8;
}

applyDiscount(100);
```

> 💡 **Quando surgir a 2ª regra, aí sim você refatora para Strategy/Engine — com requisitos reais.**

## Exemplo 2 — "Generic Repository" para tudo

```ts
// ❌ Anti-YAGNI (repositório genérico que vira um monstro)

type ID = string;

interface Repository<T> {
  findById(id: ID): Promise<T | null>;
  findMany(filter: Partial<T>): Promise<T[]>;
  save(entity: T): Promise<void>;
  delete(id: ID): Promise<void>;
}

// Você cria a interface perfeita antes de ter clareza do domínio.
// Depois começa a enfiar exceções e métodos "especiais".
```

```ts
// ✅ YAGNI (repositório focado no que existe)

type UserId = string;

export type User = {
  id: UserId;
  email: string;
  isActive: boolean;
};

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
```

> 💡 **Aqui você modela o domínio real (buscar por email é um caso real) e evita uma abstração "para tudo".**

## Exemplo 3 — Validação "para o futuro" (overengineering)

```ts
// ❌ Anti-YAGNI (validador genérico com DSL interna)

type Rule<T> = (value: T) => string | null;

export class Validator<T extends object> {
  private rules: Partial<Record<keyof T, Rule<any>[]>> = {};

  add<K extends keyof T>(key: K, rule: Rule<T[K]>) {
    this.rules[key] ??= [];
    this.rules[key]!.push(rule);
    return this;
  }

  validate(input: T): string[] {
    const errors: string[] = [];
    for (const key in this.rules) {
      const value = input[key as keyof T];
      for (const rule of this.rules[key as keyof T] ?? []) {
        const result = rule(value);
        if (result) errors.push(`${key}: ${result}`);
      }
    }
    return errors;
  }
}
```

```ts
// ✅ YAGNI (validação direta e legível)

export type CreateUserInput = {
  email: string;
  password: string;
};

export function validateCreateUser(input: CreateUserInput): string[] {
  const errors: string[] = [];

  if (!input.email.includes("@")) errors.push("email: invalid");
  if (input.password.length < 8) errors.push("password: too short");

  return errors;
}
```

> 💡 **Quando a validação realmente crescer (muitos fluxos, muitos campos), aí você introduz uma lib (Zod, Valibot etc.) ou abstrai com base em casos reais.**

## Exemplo 4 — "Preparar para múltiplos provedores" sem necessidade

```ts
// ❌ Anti-YAGNI (Factory + Interface + DI para 1 provedor)

export interface SmsProvider {
  send(to: string, message: string): Promise<void>;
}

export class TwilioSmsProvider implements SmsProvider {
  async send(to: string, message: string) {
    /* ... */
  }
}

export function createSmsProvider(): SmsProvider {
  // "Futuro: teremos outros"
  return new TwilioSmsProvider();
}
```

```ts
// ✅ YAGNI (use o que existe)

export async function sendSms(to: string, message: string): Promise<void> {
  // Twilio hoje.
  // Se amanhã mudar, refatora com base no novo requisito.
}
```
