# 🧩 O que acontece na Render Phase

## 1. Chamada dos Componentes

- React pega os componentes marcados como "dirty" (precisam re-renderizar) e executa suas funções novamente.
- Isso gera novos elementos React (objetos JS simples que descrevem a UI).

```js
function Button({ label }) {
  return <button>{label}</button>;
}
```

Aqui Button("OK") retorna algo assim:

```js
{ type: "button", props: { children: "OK" } }
```

## 2. Criação do Virtual DOM

- Todos os elementos retornados formam uma árvore virtual (virtual DOM).
- Esse virtual DOM é barato de criar porque são só objetos JS, nada de DOM real ainda.
- É uma “foto” de como a UI deveria ser após a atualização.

## 3. Diffing (Comparação com a árvore antiga)

React compara a árvore nova com a anterior para descobrir o mínimo de mudanças necessárias.
Isso usa o algoritmo de reconciliação baseado em heurísticas:

- Mesmo tipo de elemento (<button> → <button>)
  - Reutiliza o nó, atualiza só as props diferentes.
- Tipo diferente (<button> → <a>)
  - Destrói o antigo e cria um novo nó.
- Listas com keys
  - Se a key é igual → nó reaproveitado.
  - Se mudou ou não existe → React cria/destroi nós.

```js
items.map((item) => <li key={item.id}>{item.name}</li>);
```

Essa otimização evita recriar tudo a cada render.

## 4. Preparação das Fiber Nodes

- O React não lida só com Virtual DOM bruto; ele usa a Fiber Tree.
- Cada componente/elemento é representado por um Fiber Node com informações extras:
- estado pendente, efeitos a executar, prioridade da atualização.
- Durante a Render Phase, React recria/atualiza esses fibers para refletir a nova UI.

# 🚫 O que NÃO acontece na Render Phase

- Nenhum DOM real é alterado.
- Nenhum useEffect roda (isso só no commit).
- Apenas render() ou função de componente são chamados.

# ⏱️ Como funciona no React 18 (Concurrent Mode)

- A Render Phase é interrompível.
- Se o React estiver renderizando uma lista gigante mas o usuário começa a digitar, o React pode pausar a renderização, priorizar o input, e depois retomar.
- Isso é possível porque a Render Phase é pura (sem efeitos colaterais).

# 📝 Resumindo

- Executa os componentes → cria nova descrição da UI (virtual DOM).
- Compara com a árvore anterior → diffing decide o que mudou.
- Atualiza Fiber Nodes → prepara instruções de mutação para o DOM real.
- Entrega o resultado para a Commit Phase.
