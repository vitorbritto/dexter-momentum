# Avoid Null and Booleans as Parameters

Passar null ou boolean como argumentos pode gerar comportamentos inesperados e erros difíceis de depurar. Em nível de arquitetura, isso costuma indicar decisões implícitas demais no código.

## Regras práticas

- Usar Optionals / Maybe em vez de null
- Usar valores padrão em vez de null ou boolean
- Aplicar o padrão Null Object
- Evitar if/else desnecessário com booleanos
- Validar argumentos explicitamente (fail fast)

## 1️⃣ Usar Optionals / Maybe em vez de null

Em vez de representar ausência de valor com null, deixe isso explícito.

**❌ Ruim**

```ts
function getUserName(user) {
  if (user === null) return "Guest";
}
```

**✅ Melhor (explícito)**

```ts
function getUserName(user = { name: "Guest" }) {
  return user.name;
}
```

Ou usando um wrapper conceitual:

```ts
function getUserName(optionalUser) {
  return optionalUser?.name ?? "Guest";
}
```

## 2️⃣ Usar valores padrão em vez de null ou boolean

Valores padrão eliminam verificações defensivas espalhadas pelo código.

**❌ Ruim**

```ts
function createOrder(order, isTest) {
if (isTest === true) { ... }
}
```

**✅ Melhor**

```ts
function createOrder(order, mode = "production") {
  if (mode === "test") { ... }
}
```

Substituir booleanos por estados explícitos melhora a legibilidade.

## 3️⃣ Aplicar o padrão Null Object

Trocar null por um objeto com comportamento definido.

**❌ Ruim**

```ts
if (logger) {
  logger.log("message");
}
```

**✅ Melhor**

```ts
const NullLogger = {
  log: () => {},
};

function process(logger = NullLogger) {
  logger.log("message");
}
```

**Sem if, sem null.**

## 4️⃣ Evitar if/else desnecessário com booleanos

Quando o boolean for realmente necessário, prefira expressões simples.

**❌ Ruim**

```ts
if (isActive) {
  start();
} else {
  stop();
}
```

**✅ Melhor**

```ts
isActive ? start() : stop();
```

Ou melhor ainda: evitar o boolean.

```ts
status === "active" ? start() : stop();
```

## 5️⃣ Validar argumentos explicitamente (fail fast)

Falhar cedo é melhor do que falhar silenciosamente.

```ts
function transfer(amount) {
  console.assert(amount > 0, "Amount must be positive");
}
```

Ou:

```ts
function transfer(amount) {
  if (amount <= 0) {
    throw new Error("Invalid amount");
  }
}
```

## Resumo

- `null` esconde intenção
- `boolean` simplifica demais decisões complexas
- Prefira valores explícitos, estados claros e comportamento definido
- Código fica mais robusto, legível e previsível

**Menos `null`.**
**Menos `boolean`.**
**Mais intenção no código.**
