# 🔥 O que dispara um render?

## Existem basicamente três gatilhos:

### 1. State Updates

- Usando useState, useReducer ou this.setState (em classes).
- Sempre que o valor muda, React agenda uma nova renderização para aquele componente.

⚠️ Importante: React não renderiza imediatamente; ele marca o componente como "precisa re-renderizar" e decide o melhor momento (com o Scheduler).

```js
const [count, setCount] = useState(0);

const handleClick = () => setCount((c) => c + 1); // <-- dispara render
```

### 2. Props Changes

- Quando o componente pai renderiza novamente e passa novos valores.
- Mesmo que seja "o mesmo valor mas com nova referência” (ex.: objeto recriado), o filho renderiza.
- Isso é uma das razões para usar React.memo em componentes pesados.

```js
function Parent() {
  const [text, setText] = useState("");
  return <Child value={text} />; // se text mudar → Child re-render
}
```

### 3. Context Updates

- Se um Provider muda o valor, todos os consumidores (useContext) dentro da árvore são re-renderizados.
- Por isso é comum dividir contextos grandes em contextos menores e mais específicos.

```js
const ThemeContext = createContext("light");

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

## ⚡ Como o React gerencia esses gatilhos?

- React não re-renderiza toda a aplicação de imediato.
- Ele marca componentes como “dirty” (precisam ser reavaliados) e passa isso para o Scheduler.
- No React 18, o Scheduler é mais inteligente:
- Diferencia renders síncronos (ex.: input digitando) e concurrentes (ex.: atualizar uma lista longa).
- Permite interrupção e priorização → a UI não trava.

## 🚦 Regras importantes sobre triggers

### 1. Batching

- Vários setState dentro de um mesmo evento são agrupados em um único render.

```js
function handleClick() {
  setCount((c) => c + 1);
  setCount((c) => c + 1);
}
// dispara 1 render, não 2
```

### 2. State Imutável

- React só re-renderiza se detectar que o valor realmente mudou.
- Atualizações mutando o mesmo objeto podem não funcionar:

```js
const [user, setUser] = useState({ name: "Vitor" });
user.name = "Britto";
setUser(user); // não dispara render!
```

### 3. Efeitos colaterais não disparam render

- useEffect rodando não força render. Só se ele chamar setState.

```js
const [user, setUser] = useState({ name: "Vitor" });
user.name = "Britto";
setUser(user); // não dispara render!
```

# 👉 Resumindo:

- Render só é disparado por state, props ou context.
- O React agenda a renderização, não executa de imediato.
- O Scheduler prioriza e agrupa atualizações para manter a UI fluida.
