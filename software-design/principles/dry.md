# DRY

DRY (Don't Repeat Yourself) é um princípio que diz, em essência: "Um mesmo conhecimento não deve ser expresso mais de uma vez no sistema."

Isso vai além de "não copiar e colar código". O foco real do DRY é evitar duplicação de regras, decisões e comportamentos, porque toda duplicação causa um efeito colateral inevitável: uma fonte de bugs e manutenção cara.

## O que o DRY realmente quer evitar

**Não é só isso 👇**

```ts
if (user.age >= 18) { ... }

// em outro lugar
if (user.age >= 18) { ... }
```

**Isso é duplicação sintomática (visível).**

**O problema mais grave é a duplicação conceitual:**

```ts
// regra espalhada
if (user.age >= 18 && user.hasDocument && !user.isBlocked) { ... }

// em outro serviço
if (!user.isBlocked && user.hasDocument && user.age >= 18) { ... }
```

> No código acima, existe uma duplicação de regra de negócio, não só o código.
> Quando houver uma mudança na regra, será preciso refatorar em ambos os lugares.

## A ideia central do DRY

Cada pedaço de conhecimento deve existir em um único lugar, de forma clara e inequívoca.

**Isso reduz:**

- Complexidade
- Bugs silenciosos
- Esforço de manutenção
- Risco em mudanças

**E aumenta:**

- Confiança ao refatorar
- Leitura do código
- Evolução do sistema

## DRY !== abstrair tudo

> 💡 **Erro comum: aplicar DRY cedo demais.**

### ❌ Errado:

```ts
// Para que criar uma função, se ela só é usada uma vez?
function isValidUser(user) {
  return user.age >= 18;
}
```

> 💡 Se isso só é usado uma vez, não é DRY — é **overengineering**.

### ✅ Correto:

Aplicar DRY quando a duplicação aparece de verdade e representa o mesmo conhecimento.

## Exemplo de DRY bem aplicado

**Antes:**

```ts
// service A
if (order.total > 1000 && !order.isBlocked) {
  approve(order);
}

// service B
if (!order.isBlocked && order.total > 1000) {
  notify(order);
}
```

**Depois:**

```ts
class Order {
  canBeProcessed() {
    return this.total > 1000 && !this.isBlocked;
  }
}
```

**Agora:**

- A regra vive em um lugar
- A mudança é segura
- O nome explica a intenção

## Relação com SRP e OCP

**DRY + SRP**

- Se uma classe tem uma responsabilidade, ela tende a ser o lugar natural daquele conhecimento.
- Menos chance de duplicar regras em vários lugares.

**DRY + OCP**

- Quando o conhecimento está centralizado, você estende comportamento sem sair quebrando código duplicado.
- Mudança localizada, impacto controlado.

## DRY no mundo real

**DRY não é:**

- Compartilhar tudo via utils genéricos
- Criar helpers globais sem contexto
- Forçar reuso entre domínios diferentes

**DRY é:**

- Regras de negócio no domínio
- Validações centralizadas
- Políticas expressas uma vez
- Decisões importantes em um único ponto

## Reflexão final

**DRY não é sobre escrever menos código.**
**É sobre ter menos lugares para errar.**
