# O que significa API?

API significa Application Programming Interface (Interface de Programação de Aplicações). No contexto de APIs, a palavra Application se refere a qualquer software com uma função específica. Já Interface pode ser entendida como um contrato de serviço entre duas aplicações. Esse contrato define como elas se comunicam entre si usando requisições e respostas. A documentação da API contém informações sobre como os desenvolvedores devem estruturar essas requisições e respostas.

# Como as APIs funcionam?

A arquitetura de uma API geralmente é explicada em termos de cliente e servidor. A aplicação que envia a requisição é chamada de cliente, e a aplicação que envia a resposta é chamada de servidor. No exemplo de clima, o banco de dados meteorológico é o servidor, e o aplicativo móvel é o cliente.

Existem quatro formas diferentes de funcionamento das APIs, dependendo de quando e por que elas foram criadas.

## APIs SOAP

Essas APIs utilizam o Simple Object Access Protocol (SOAP). Cliente e servidor trocam mensagens usando XML. É um tipo de API menos flexível, que foi mais popular no passado.

## APIs RPC

Essas APIs são chamadas de Remote Procedure Calls (Chamadas de Procedimento Remoto). O cliente executa uma função (ou procedimento) no servidor, e o servidor envia o resultado de volta para o cliente.

## APIs WebSocket

As APIs WebSocket são uma abordagem moderna de desenvolvimento web que utiliza objetos JSON para trocar dados. Elas suportam comunicação bidirecional entre cliente e servidor. O servidor pode enviar mensagens de callback para clientes conectados, tornando essa abordagem mais eficiente do que APIs REST em cenários específicos.

## APIs REST

Essas são as APIs mais populares e flexíveis encontradas na web atualmente. O cliente envia requisições ao servidor como dados. O servidor usa essas informações para executar funções internas e retorna os dados de resposta ao cliente. A seguir, veremos as APIs REST com mais detalhes.

# O que são APIs REST?

REST significa Representational State Transfer. O REST define um conjunto de operações como GET, PUT, DELETE, entre outras, que os clientes podem usar para acessar dados do servidor. Cliente e servidor trocam dados usando HTTP.

A principal característica de uma API REST é a ausência de estado (stateless). Isso significa que o servidor não armazena informações do cliente entre requisições. As requisições feitas ao servidor são semelhantes às URLs que você digita no navegador para acessar um site. A resposta do servidor é apenas dados, sem a renderização gráfica típica de uma página web.

# O que é uma Web API?

Uma Web API ou Web Service API é uma interface de processamento entre um servidor web e um navegador. Todos os serviços web são APIs, mas nem todas as APIs são serviços web. A API REST é um tipo especial de Web API que segue o estilo arquitetural descrito acima.

Os diferentes termos relacionados a APIs, como Java API ou service APIs, existem porque historicamente as APIs foram criadas antes da World Wide Web. As APIs web modernas são APIs REST, e esses termos muitas vezes são usados de forma intercambiável.

# O que são integrações de API?

Integrações de API são componentes de software que atualizam dados automaticamente entre clientes e servidores. Alguns exemplos incluem a sincronização automática de fotos do celular com a nuvem ou o ajuste automático de data e hora do notebook ao mudar de fuso horário. Empresas também utilizam integrações de API para automatizar processos entre sistemas.

# Quais são os benefícios das APIs REST?

As APIs REST oferecem quatro principais benefícios:

1. **Integração:** APIs são usadas para integrar novas aplicações com sistemas existentes. Isso acelera o desenvolvimento, pois cada funcionalidade não precisa ser escrita do zero. É possível reutilizar código existente por meio de APIs.
2. **Inovação:** Setores inteiros podem mudar com o surgimento de novos aplicativos. As empresas precisam reagir rapidamente e lançar serviços inovadores. As APIs permitem isso, já que mudanças podem ser feitas no nível da API sem reescrever todo o código.
3. **Expansão:** APIs oferecem às empresas a oportunidade de atender seus clientes em múltiplas plataformas. Por exemplo, APIs de mapas permitem integração em sites, Android, iOS, etc. Da mesma forma, empresas podem oferecer acesso a seus dados internos por meio de APIs públicas ou privadas.
4. **Facilidade de manutenção:** A API atua como um intermediário entre dois sistemas. Cada sistema pode evoluir internamente sem impactar o outro, desde que o contrato da API seja mantido. Isso reduz o impacto de mudanças futuras.

# Quais são os diferentes tipos de APIs?

As APIs são classificadas tanto pela arquitetura quanto pelo escopo de uso.

- **APIs privadas:** São internas à empresa e usadas apenas para conectar sistemas e dados dentro do negócio.
- **APIs públicas:** São abertas ao público e podem ser usadas por qualquer pessoa. Podem ou não exigir autorização e pagamento.
- **APIs de parceiros:** São acessíveis apenas por desenvolvedores externos autorizados, geralmente em parcerias B2B.
- **APIs compostas:** Combinam duas ou mais APIs para atender requisitos ou comportamentos mais complexos do sistema.

# O que é um endpoint de API e por que ele é importante?

Endpoints são os pontos finais da comunicação da API. Incluem URLs do servidor, serviços e outros locais digitais específicos onde informações são enviadas e recebidas.

Eles são críticos por dois motivos principais:

1. **Segurança:** Endpoints tornam o sistema vulnerável a ataques. Monitoramento é essencial para prevenir abusos.
2. **Performance:** Endpoints muito acessados podem se tornar gargalos e afetar o desempenho do sistema.

# Como proteger uma API REST?

Todas as APIs devem ser protegidas com autenticação e monitoramento adequados. As duas principais formas são:

1. **Tokens de autenticação:** Verificam se o usuário é quem diz ser e se possui permissão para acessar aquele endpoint específico. Um exemplo é o login em um servidor de e-mail.
2. **Chaves de API (API Keys):** Identificam a aplicação que está fazendo a chamada à API. São menos seguras que tokens, mas permitem monitoramento de uso. Muitas vezes aparecem como uma longa sequência de caracteres em URLs.

# Como criar uma API?

Criar uma API confiável exige planejamento e cuidado. Os cinco passos principais são:

1. **Planejar a API:** Usar especificações como OpenAPI para definir casos de uso e padrões.
2. **Construir a API:** Criar protótipos e adaptar o código às necessidades internas.
3. **Testar a API:** Testar como qualquer software, incluindo testes de segurança.
4. **Documentar a API:** Documentação clara melhora a adoção e o uso correto da API.
5. **Divulgar a API:** APIs podem ser listadas em marketplaces e até monetizadas.

# O que é teste de API?

Testes de API focam principalmente na validação das respostas do servidor e incluem:

- Testes de performance
- Testes unitários da lógica de negócio
- Testes de segurança simulando ataques

# Como escrever documentação de API?

**Boas práticas incluem:**

- Usar linguagem simples e clara
- Incluir exemplos de código
- Manter a documentação atualizada
- Pensar em desenvolvedores iniciantes
- Cobrir todos os problemas que a API resolve

# Como usar uma API?

**Os passos comuns são:**

1. Obter uma API Key
2. Configurar um cliente HTTP
3. Estruturar requisições conforme a documentação
4. Integrar a API ao código

# Onde encontrar novas APIs?

APIs podem ser encontradas em marketplaces e diretórios, como:

- RapidAPI
- Public APIs
- APIForThat
- APIList

# O que é um API Gateway?

Um API Gateway é uma ferramenta de gerenciamento de APIs usada por empresas que possuem muitos serviços de backend. Ele centraliza autenticação, controle de acesso, rate limiting, monitoramento e versionamento.

O Amazon API Gateway é um serviço gerenciado que permite criar, publicar, manter e proteger APIs em escala, lidando com milhares de requisições simultâneas.

# O que é GraphQL?

GraphQL é uma linguagem de consulta criada especificamente para APIs. Ela permite que o cliente solicite exatamente os dados de que precisa — nem mais, nem menos. É uma alternativa ao REST, oferecendo mais flexibilidade e eficiência.

O AWS AppSync é um serviço totalmente gerenciado para criação de APIs GraphQL, conectando fontes como DynamoDB e Lambda, além de oferecer atualizações em tempo real via WebSockets e funcionamento offline.
