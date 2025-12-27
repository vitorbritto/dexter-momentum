# Encapsulate What Varies (EWV)

EWV (Encapsulate What Varies) é um princípio de design que diz: "Identificar as partes do código que mudam com frequência e isolá-las atrás de uma interface estável."

Na prática: "o que muda fica encapsulado; o que é estável fica exposto." Isso reduz impacto de mudança, evita efeitos colaterais e mantém o código previsível.

## Por que isso importa (no mundo real)

Mudanças raramente acontecem "por igual" no sistema. Normalmente variam:

- regras de negócio (cálculo, validação);
- integrações externas;
- políticas (desconto, taxa, autorização);
- formatos (CSV, JSON, API);
- estratégias (cache, retry, fallback).

Se isso estiver espalhado, cada mudança vira um mini-incêndio.

## Como reconhecer "o que varia"

- Isso muda por regra de negócio?
- Isso muda por ambiente?
- Isso muda por cliente/tenant?
- Isso muda por tempo (promoções, campanhas)?
- Isso depende de terceiros?

Se a resposta for "sim", não deixe isso no fluxo principal.

## Exemplo 1 — Regra de cálculo variando

```ts
// ❌ Sem encapsular (variação espalhada)

function calculateFee(method: "pix" | "card", amount: number) {
  if (method === "pix") return amount * 0.01;
  if (method === "card") return amount * 0.03 + 1.5;

  return 0;
}
```

Toda nova regra exige mexer nessa função.

```ts
// ✅ Encapsulando o que varia

interface FeeCalculator {
  calculate(amount: number): number;
}

class PixFee implements FeeCalculator {
  calculate(amount: number) {
    return amount * 0.01;
  }
}

class CardFee implements FeeCalculator {
  calculate(amount: number) {
    return amount \* 0.03 + 1.5;
  }
}

function calculateFee(calc: FeeCalculator, amount: number) {
  return calc.calculate(amount);
}
```

**Agora:**

- Regra muda → troca a implementação
- Fluxo não muda → segurança

## Exemplo 2 — Integração externa (clássico)

```ts
// ❌ Acoplamento direto

async function sendSms(to: string, message: string) {
  await twilio.send({ to, message });
}
```

Se trocar Twilio, quebra tudo.

```ts
// ✅ Encapsular variação externa

interface SmsProvider {
  send(to: string, message: string): Promise<void>;
}

class TwilioSmsProvider implements SmsProvider {
  async send(to: string, message: string) {
    await twilio.send({ to, message });
  }
}

class FakeSmsProvider implements SmsProvider {
  async send() {
    // sem operação para testes
  }
}

// Uso:

async function notifyUser(provider: SmsProvider, userId: string) {
  await provider.send("+551199999999", "Hello");
}
```

Integração muda → provider muda, domínio intacto.

## Exemplo 3 — Política de validação que muda com o tempo

```ts
// ❌ Regra hardcoded

function validatePassword(password: string) {
  return password.length >= 8;
}
```

Amanhã vira 10 + símbolo + número.

```ts
// ✅ Encapsular política

interface PasswordPolicy {
  isValid(password: string): boolean;
}

class DefaultPasswordPolicy implements PasswordPolicy {
  isValid(password: string) {
    return password.length >= 8;
  }
}

class StrongPasswordPolicy implements PasswordPolicy {
  isValid(password: string) {
    return (
      password.length >= 10 && /\d/.test(password) && /[!@#$%]/.test(password)
    );
  }
}
```

## Exemplo 4 — Front-end (muito comum)

```ts
// ❌ Lógica variando no componente

function Price({
  value,
  currency,
}: {
  value: number;
  currency: "BRL" | "USD";
}) {
  if (currency === "BRL") return <span>R$ {value}</span>;
  return <span>$ {value}</span>;
}
```

```ts
// ✅ Encapsular formatação

interface CurrencyFormatter {
  format(value: number): string;
}

const brlFormatter: CurrencyFormatter = {
  format: (v) => `R$ ${v.toFixed(2)}`,
};

const usdFormatter: CurrencyFormatter = {
  format: (v) => `$ ${v.toFixed(2)}`,
};

// Uso:

function Price({
  value,
  formatter,
}: {
  value: number;
  formatter: CurrencyFormatter;
}) {
  return <span>{formatter.format(value)}</span>;
}
```

## O erro comum: encapsular cedo demais

Encapsular não é criar abstração para tudo.

**⚠️ Cheiro de erro:**

- interface com uma única implementação sem perspectiva real de mudança
- abstração que não protege nada
- variação imaginária

**Aqui entram YAGNI e KISS:**

- se ainda não varia, não encapsular;
- se varia, mas é simples, encapsular de forma simples.

## Como pensar

- **Não pensar:** "Onde posso criar uma interface?"
- **Pensar:** "O que vai me forçar a mudar esse código no futuro?"
