# Database Migrations

No contexto de bancos de dados, o termo “migração” pode assumir dois significados distintos. Entender essa diferença é fundamental para evitar confusões conceituais e técnicas ao longo do desenvolvimento.

## Migração de schema (schema migration)

Migração de schema refere-se a mudanças incrementais na estrutura do banco de dados. Isso inclui a criação ou modificação de tabelas, a adição ou alteração de colunas, a criação de índices e o ajuste de constraints. No dia a dia do desenvolvimento, quando se fala em “migrações”, normalmente está se falando desse tipo de alteração estrutural, já que aplicações evoluem constantemente e o schema precisa acompanhar essa evolução.

## Migração de dados (data migration)

Já a migração de dados diz respeito à movimentação de informações entre bancos diferentes. Isso pode ocorrer, por exemplo, na troca de um sistema de banco de dados por outro ou na migração de uma base antiga para uma nova versão. Esse tipo de migração costuma ser um processo mais complexo, pontual e menos frequente do que as migrações de schema.

## Por que migrações são necessárias?

A necessidade de migrações fica clara quando analisamos um cenário comum. Imagine um banco de dados local contendo uma tabela chamada products. Em determinado momento, surge a necessidade de criar uma nova tabela manufacturers e adicionar uma coluna em products para referenciar essa nova entidade. Sem um mecanismo de migração, essas alterações precisariam ser reproduzidas manualmente na máquina de outros desenvolvedores e também em ambientes remotos, como servidores em nuvem.

Esse processo manual é altamente propenso a erros. É fácil esquecer detalhes importantes, como constraints NOT NULL, valores padrão ou configurações específicas de colunas. Como consequência, cada ambiente pode acabar com um schema ligeiramente diferente. As migrações existem justamente para evitar esse tipo de inconsistência, garantindo que todos os ambientes compartilhem o mesmo estado estrutural do banco.

## Migração como “Git do banco”

Uma boa analogia para entender migrações é compará-las ao controle de versão de código. Assim como o Git empilha commits que representam mudanças incrementais no código, as migrações empilham alterações no schema do banco. Esse histórico pode ser reaplicado em outra máquina ou ambiente, garantindo que o banco esteja sempre sincronizado com a evolução da aplicação.

## Ferramentas de migração

- [Sequelize](https://sequelize.org/)
- [Liquibase](https://www.liquibase.org/)
- [Flyway](https://flywaydb.org/)
- [DbUp](https://dbup.github.io/)
- [SchemaHero](https://schemahero.io/)
- [Migrate](https://github.com/golang-migrate/migrate)
- [Gorm](https://gorm.io/)
- [Prisma](https://www.prisma.io/)

## Exemplo com Node + Express + Sequelize + MySQL

Utilizaremos uma aplicação Node.js com Express, Sequelize e MySQL, executando em um ambiente containerizado.

### API

A API expõe dois endpoints principais: um GET /users, responsável por buscar usuários utilizando o método User.findAll, e um POST /users, usado para criar novos usuários por meio do método User.create. O uso do ORM elimina a necessidade de escrever comandos SQL manualmente, como SELECT ou INSERT.

```js
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});
```

```js
app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});
```

### Estrutura gerada pelo Sequelize

O Sequelize gera uma estrutura padrão de pastas e arquivos. O arquivo config/config.json concentra as configurações de conexão para diferentes ambientes, como local, teste e produção. A pasta models contém a definição dos modelos, que representam as tabelas do banco. A pasta migrations armazena os arquivos de mudanças versionadas, enquanto seeders é utilizada para scripts de dados fictícios, embora não seja usada no exemplo.

```js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
```

### Docker Compose

O ambiente é orquestrado com Docker Compose, que sobe um container com MySQL 8 e outro com a aplicação Node.js. A aplicação fica acessível na porta 3000, facilitando a execução e os testes locais.

```yaml
version: "3.8"
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: test
```

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - 3000:3000
```

### Criando uma migração na prática: adicionar coluna age

Vamos criar uma migração para adicionar a coluna age à tabela users.

```js
class AddAgeToUsers extends Migration {
  async up() {
    await this.addColumn("users", "age", { type: DataTypes.INTEGER });
  }
}
```

### Alteração no model

O primeiro passo é alterar o model User, adicionando o campo age como um inteiro. Essa mudança, por si só, não altera o banco, apenas define a intenção no código.

```js
class User extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
}
```

### Gerar arquivo de migração

Em seguida, utiliza-se a CLI do Sequelize para gerar um novo arquivo de migração, que vem com um boilerplate inicial para ser preenchido.

```bash
npx sequelize-cli migration:generate --name add-age-to-users
```

### Implementar up e down

No método up, a migração adiciona a coluna age à tabela users, permitindo valores nulos, já que registros antigos não possuíam esse campo. No método down, a coluna é removida, possibilitando a reversão da mudança caso necessário.

### Executar migração

Após executar o comando de migração, confirma-se que a tabela users agora possui a coluna age e que o usuário existente, Jesse Pinkman, permanece com o valor null nesse campo.

```bash
npx sequelize-cli db:migrate
```

## Tabela SequelizeMeta

A tabela SequelizeMeta funciona como um controle de versão das migrações executadas. Ela registra quais migrações já foram aplicadas, evitando que o mesmo arquivo seja executado novamente.

## Ajustar o código da API

Por fim, o código da API é ajustado para aceitar o campo age no POST /users. Após rebuild do container, é criado um novo usuário, Walter White, com idade 50. Ao consultar os usuários, observa-se que Jesse permanece com age nulo, enquanto Walter possui o valor definido.

## Cuidado com dados: API é stateless, banco é stateful

Um ponto importante destacado é a diferença entre aplicações e bancos de dados. Aplicações modernas, especialmente containerizadas, podem ser destruídas e recriadas com frequência, sendo essencialmente stateless. Já os bancos de dados são stateful e persistentes, não sendo recriados junto com a aplicação. Por isso, migrações precisam ser tratadas com cuidado, pois o estado do banco permanece ao longo do tempo.

## Migração rodando junto do app vs separada do app

Existem duas abordagens principais para executar migrações em produção.

### Migração “dentro” do app

Rodar migrações na inicialização da aplicação pode ser simples e eficaz para sistemas pequenos, especialmente quando não há um time dedicado a banco de dados. No entanto, essa abordagem tem desvantagens importantes: se a migração falhar, o app pode não subir, migrações longas atrasam o startup e, em ambientes com múltiplas instâncias, é necessário lidar com concorrência.

### Migração “fora” do app

Executar migrações como um processo separado isola falhas e evita que o tempo da migração impacte diretamente a disponibilidade da aplicação. Essa abordagem é mais indicada para sistemas grandes, com múltiplos serviços e times.

## Migrações em paralelo e locking

Um problema comum em ambientes com autoscaling é a execução concorrente de migrações. Várias instâncias podem subir simultaneamente e tentar modificar o banco ao mesmo tempo. Para evitar isso, o vídeo apresenta opções híbridas, como rodar migrações antes do app em pipelines de CI/CD, criar um serviço exclusivo de migração no Docker Compose ou utilizar Jobs e Init Containers no Kubernetes. Além disso, mecanismos de lock no próprio banco podem impedir execuções simultâneas.

## Boas práticas

Entre as práticas a evitar, destaca-se não misturar mudanças não relacionadas em uma única migração e não alterar models sem criar e executar a migração correspondente. Essas situações levam a inconsistências entre código e banco.

Como boas práticas, recomenda-se organizar migrações por versão ou feature, utilizar um usuário de banco dedicado para migrações e preferir bancos que suportem DDL transacional, permitindo rollback automático em caso de falha. Também é indicado testar migrações, por exemplo com Testcontainers, recriando o banco do zero, aplicando todas as migrações e validando o schema final.

## Compatibilidade retroativa (backward compatibility)

Alterar o schema sem considerar outros serviços que dependem dele pode causar falhas generalizadas. Por isso, é importante priorizar mudanças não quebráveis, como adicionar colunas nulas ou com valor padrão. A comunicação entre times, o uso de avisos de deprecação e a manutenção temporária de versões antigas e novas do schema ajudam a garantir uma transição segura. Em alguns casos, o uso de views como aliases pode facilitar ainda mais essa adaptação.
