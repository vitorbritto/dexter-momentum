# ⚡ O que acontece na Commit Phase

A Commit Phase é curta e síncrona: uma vez iniciada, React não pode interromper (diferente da Render Phase).

Ela acontece em três subpassos principais:

## 1. DOM Mutation (Mutations)

- React aplica as mudanças calculadas na Render Phase:
- Criação de novos elementos DOM.
- Remoção de nós que não existem mais.
- Atualização de atributos/propriedades (ex.: className, value, onClick).
- Essa etapa altera de fato a árvore do DOM no navegador.

### 👉 Exemplo:

Antes:

```html
<button>Save</button>
```

Depois (se label mudou para "Confirm"):

```html
<button>Confirm</button>
```

## 2. Layout Effects

- Depois de atualizar o DOM, React executa useLayoutEffect (e também o antigo componentDidMount / componentDidUpdate).
- Esses efeitos rodam sincronamente, antes da tela ser pintada.
- Isso garante acesso ao layout final atualizado (ex.: medir largura/altura de um elemento).

```js
useLayoutEffect(() => {
  const width = ref.current.offsetWidth;
  console.log("Width:", width);
}, []);
```

## 3. Passive Effects

- Após o navegador pintar a tela, React executa os useEffect normais.
- Eles rodam assincronamente, sem travar a renderização.
- Usados para lógicas como:
- Buscar dados de uma API.
- Configurar listeners.
- Sincronizar com serviços externos.

```js
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id);
}, []);
```

# 🔄 O Ciclo Completo da Commit Phase

1. Mutations → altera o DOM real.
2. Layout Effects → código que depende do layout atualizado.
3. Browser Paint → o usuário vê a mudança.
4. Passive Effects → lógica assíncrona e não crítica.

# 🚦 Regras importantes

- A Commit Phase é não interrompível → React precisa finalizar antes que o usuário veja a tela inconsistente.
- Evitar operações pesadas em useLayoutEffect, pois isso bloqueia o paint.
- Efeitos em useEffect não bloqueiam, mas também não são imediatos.

# 📝 Resumindo

- Render Phase = pensar (calcular o que mudar).
- Commit Phase = agir (aplicar mudanças + rodar efeitos).
- Dentro da Commit Phase:
  - 1. Mutations no DOM.
  - 2. Layout Effects (sincronos).
  - 3. Passive Effects (assíncronos).
