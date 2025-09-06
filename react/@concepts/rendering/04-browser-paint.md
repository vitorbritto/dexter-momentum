# 🖼️ O que acontece na Browser Paint

Depois que React terminou a Commit Phase, o navegador entra em ação:

## 1. Style Recalculation

- O browser reavalia as CSS rules aplicadas aos elementos atualizados.
- Isso inclui herança, media queries, pseudo-classes (:hover, :focus) e variáveis CSS.

## 2. Layout (Reflow)

- O navegador calcula as posições e tamanhos de cada elemento na página.
- Se um nó alterado afeta outros (ex.: mudar a largura de um div que empurra os filhos), toda a árvore pode precisar de reflow.

## 3. Paint

- O navegador decide quais pixels desenhar (cores, bordas, sombras, textos).
- Aqui a árvore de layout é convertida em camadas visuais.

## 4. Compositing

- O browser combina todas as camadas (como no Photoshop) em uma única imagem final.
- Isso é otimizado para animações (ex.: transform, opacity podem rodar só na GPU).

# 🔄 Fluxo resumido

1. Commit Phase (React) → altera DOM.
2. Style Recalc (Browser) → aplica CSS.
3. Layout / Reflow (Browser) → calcula posições.
4. Paint (Browser) → desenha pixels.
5. Compositing (Browser) → monta a tela final.
6. Usuário vê a mudança 👀.

# ⚡ Ponto de Atenção

- Se o React faz muitas mutações pesadas no DOM, o browser sofre em reflow + paint, causando jank (travadinhas).
- Por isso o React tenta minimizar mudanças (diffing eficiente).
- Desenvolvedores ajudam evitando reflows desnecessários (ex.: position: absolute para elementos animados, usar transform no lugar de top/left, etc).

# 📝 Resumindo

- Browser Paint é onde o cálculo do React finalmente vira pixels visíveis.
- O processo segue: recalcular estilos → layout → pintar → compor → exibir.
- Performance aqui depende tanto do React (quantos updates manda) quanto do navegador (quanto trabalho precisa refazer).
