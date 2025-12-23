# Problema N + 1

Você já esteve trabalhando em um aplicativo, encarando a tela enquanto ele demora para carregar, se perguntando o que está acontecendo? Existem vários motivos para problemas de performance, mas um clássico em aplicações orientadas a banco de dados é o temido problema de consultas N+1.

## O que é o problema de consulta N+1?

O principal sintoma desse problema é simples: há muitas, muitas consultas sendo executadas. Normalmente isso acontece quando você estrutura seu código assim:

- Primeiro faz uma consulta para obter uma lista de registros
- Em seguida, faz uma nova consulta para cada registro dessa lista

Você pode imaginar que "muitas consultas pequenas" seriam mais rápidas do que "uma consulta grande e complexa". Mas raramente é assim. Na prática, costuma ocorrer o contrário. Cada consulta precisa ser enviada ao banco, o banco precisa processá-la e então devolver os resultados para o seu aplicativo. Quanto mais consultas você executa, mais tempo leva para receber tudo, porque cada "ida e volta" até o servidor do banco consome tempo e recursos.

Em contraste, uma única consulta, mesmo que mais complexa, pode ser otimizada pelo próprio banco e exige apenas uma ida ao servidor — o que geralmente é muito mais rápido do que várias consultas pequenas.

## Um exemplo de consulta N+1

Vamos ver um exemplo. Aplicações frequentemente consultam registros relacionados entre si nas mesmas tabelas. Vamos usar um cenário com itens de supermercado e categorias. Nesse cenário, temos um banco com uma tabela items e uma tabela categories. A tabela items contém a lista de itens e cada item referencia sua categoria na tabela categories.

### Tabela `categories`:

| id  | name    |
| --- | ------- |
| 1   | Produce |
| 2   | Deli    |
| 3   | Dairy   |

### Tabela `items`:

| id  | name   | category_id |
| --- | ------ | ----------- |
| 1   | Apples | 1           |
| 2   | Cheese | 2           |
| 3   | Bread  | NULL        |

Suponha que você queira listar todos os itens, incluindo o nome da categoria à qual pertencem. Uma abordagem "direta" seria primeiro buscar as categorias e depois, em um loop, buscar os itens de cada categoria.

### Primeira consulta — Buscando as categorias:

```js
// Exemplo usando Node.js com Sequelize.

const { Category } = require("./models");

async function fetchCategories() {
  const categories = await Category.findAll();
  return categories;
}
```

### Segunda consulta — Percorrendo cada categoria e buscando os itens:

```js
// Exemplo usando Node.js com Sequelize.

const { Item } = require("./models");

async function fetchItems(categoryId) {
  const items = await Item.findAll({ where: { category_id: categoryId } });
  return items;
}
```

**Essa abordagem tem benefícios:**

- São duas consultas simples
- O código fica bem claro e procedural
- Mas ela é falha e deve ser evitada sempre que você perceber que está executando muitas consultas dentro de um _loop_.

## O que causou o problema de consulta N+1?

Esse padrão costuma ser chamado de "N+1" porque, em vez de fazer o trabalho em uma única consulta, você faz 1 consulta para pegar a lista de categorias e depois N consultas (uma para cada categoria) para buscar seus itens. Daí o nome: N + 1.

Neste exemplo, vamos supor que o banco tem cerca de 800 itens distribuídos em 17 categorias. Mesmo assim, leva mais de 1 segundo para executar as 18 consultas simples envolvidas — o que é lento. Em cenários maiores e mais complexos, fica ainda pior.

Nesse caso, dá para fazer exatamente o mesmo trabalho cerca de 10x mais rápido usando apenas uma consulta com `JOIN` (JOIN é uma operação que combina registros de duas ou mais tabelas com base em uma condição de relacionamento). O código poderia ser refatorado para algo assim:

```js
// Exemplo equivalente usando Node.js com Sequelize.

const { Category } = require("./models");
const { Item } = require("./models");

async function listCategoriesAndItems() {
  const categories = await Category.findAll({
    include: {
      model: Item,
      as: "items",
    },
  });
  return categories;
}
```
