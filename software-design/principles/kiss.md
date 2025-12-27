# Keep It Simple Stupid (KISS)

KISS (Keep It Simple, Stupid) é o princípio que obriga a fazer o óbvio: preferir a solução mais simples que funcione bem. Não é “fazer gambiarra”. É evitar complexidade desnecessária mesmo quando você consegue implementar algo mais “sofisticado”.

> 💡 **Complexidade é um imposto que será cobrado no futuro. Você vai pagar com um bug, onboarding, testes, performance, deploy e/ou incidentes.**

## O que não é KISS

- Não é "sem padrão" / "sem arquitetura".
- Não é "um arquivo gigante pra sempre".
- Não é "ignorar requisitos não-funcionais" (segurança, performance, observabilidade).
- Não é "não refatorar" — KISS costuma levar a refactors frequentes e pequenos.

## Heurísticas práticas de KISS

- Se você precisa explicar a estrutura por muito tempo, já aceitou que é complexa.
- Se pra adicionar um `if` você precisa criar 3 interfaces, isso é sinal de que você está tentando ser elegante demais.
- Prefira dados simples (objetos e funções puras) antes de criar um "monstro interno".
- Se for inevitável abstrair, abstrair tarde e pouco, mas não antes.

```ts
// ❌ Anti-KISS (tentando ser elegante demais)

type PaymentMethod = "pix" | "card";

interface FeeStrategy {
calc(amount: number): number;
}

class PixFee implements FeeStrategy {
calc(amount: number) { return amount \* 0.01; }
}

class CardFee implements FeeStrategy {
calc(amount: number) { return amount \* 0.03 + 1.5; }
}

function feeStrategyFactory(method: PaymentMethod): FeeStrategy {
switch (method) {
case "pix": return new PixFee();
case "card": return new CardFee();
}
}

export function calcFee(method: PaymentMethod, amount: number): number {
return feeStrategyFactory(method).calc(amount);
}
```

```ts
// ✅ KISS (simplicidade e legibilidade)

type PaymentMethod = "pix" | "card";

export function calcFee(method: PaymentMethod, amount: number): number {
  if (method === "pix") return amount _ 0.01;
  if (method === "card") return amount _ 0.03 + 1.5;

  // exhaustive check se quiser (opcional)
  const \_exhaustive: never = method;

  return \_exhaustive;
}
```

KISS aqui é admitir que um if é mais legível do que um mini-framework.

## Exemplo 2 — Configuração simples virando “DSL”

```ts
// ❌ Anti-KISS (tentando ser elegante)

type HeaderRule = (ctx: { path: string }) => Record<string, string>;

export class HeaderComposer {
  private rules: HeaderRule[] = [];

  use(rule: HeaderRule) {
    this.rules.push(rule);
    return this;
  }

  build(ctx: { path: string }) {
    return this.rules.reduce((acc, r) => ({ ...acc, ...r(ctx) }), {});
  }
}

// Aí você cria "middlewares" só pra montar headers.
```

```ts
// ✅ KISS (objeto direto)

export function buildHeaders(path: string): Record<string, string> {
  const base = {
    "content-type": "application/json",
  };

  if (path.startsWith("/admin")) {
    return { ...base, "x-scope": "admin" };
  }

  return base;
}
```

## Exemplo 3 — Parsing com “pipeline genérico” vs direto

```ts
// ❌ Anti-KISS

type Step<I, O> = (input: I) => O;

type Step<I, O> = (input: I) => O;

export function pipe<A, B>(a: Step<A, B>): Step<A, B>;
export function pipe<A, B, C>(a: Step<A, B>, b: Step<B, C>): Step<A, C>;
export function pipe(...steps: Function[]) {
  return (input: unknown) => steps.reduce((acc, s) => s(acc), input);
}

const parse = pipe(
  (s: string) => s.trim(),
  (s: string) => s.split(","),
  (parts: string[]) => ({ id: parts[0], name: parts[1] })
);
```

```ts
// ✅ KISS (simplicidade e legibilidade)

export function parseLine(line: string): { id: string; name: string } {
  const trimmed = line.trim();
  const [id, name] = trimmed.split(",");
  return { id, name };
}
```

A pipeline genérica é “bonita”, mas custa mais do que entrega (debug, tipos, stacktrace, etc.).

## Exemplo 4 — “Event emitter” pra fluxo síncrono simples

```ts
// ❌ Anti-KISS (arquitetura de eventos onde não precisa)

type EventMap = {
  "order.created": { orderId: string };
  "order.paid": { orderId: string };
};

class Bus {
  private handlers: {
    [K in keyof EventMap]?: Array<(p: EventMap[K]) => void>;
  } = {};

  on<K extends keyof EventMap>(event: K, handler: (p: EventMap[K]) => void) {
    this.handlers[event] ??= [];
    this.handlers[event]!.push(handler);
  }

  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]) {
    for (const h of this.handlers[event] ?? []) h(payload);
  }
}

const bus = new Bus();
```

```ts
// ✅ KISS (chamada direta)

export async function createOrder(input: { userId: string }) {
  const order = await saveOrder(input);
  await markOrderAsCreated(order.id);
  return order;
}

async function saveOrder(input: { userId: string }) {
  return { id: crypto.randomUUID(), userId: input.userId };
}

async function markOrderAsCreated(orderId: string) {
  // side effect direto
}
```

Eventos fazem sentido quando tem assíncrono real, múltiplos consumidores, observabilidade, reprocessamento, etc. Se não tem isso, é enfeite caro.

## KISS em TypeScript: padrões simples que ajudam MUITO

### 1. Preferir “data + funções” a classes

```ts
export type Money = { cents: number };

export function add(a: Money, b: Money): Money {
  return { cents: a.cents + b.cents };
}
```

### 2. Usar unions e never para exaustividade

```ts
type Status = "pending" | "approved" | "rejected";

export function isFinal(status: Status) {
switch (status) {
case "approved":
case "rejected":
return true;
case "pending":
return false;
default:
const \_x: never = status;
return \_x;
}
}
```

### 3. Interfaces mínimas (não “framework interno”)

```ts
export interface Clock {
  now(): Date;
}

export const systemClock: Clock = {
  now: () => new Date(),
};
```

Isso dá testabilidade sem virar um “container de DI” gigante.
