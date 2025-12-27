# Keep Framework Distant

Manter o código do framework distante significa separar o código da aplicação do código do framework. Ao fazer isso, fica mais fácil manter, testar e evoluir tanto a base de código da aplicação quanto o framework de forma independente.

## Algumas formas de manter o código do framework distante na arquitetura do sistema:

- Usar uma camada de abstração para separar o código da aplicação do código do framework. Isso permite escrever a aplicação sem conhecer os detalhes específicos do framework.
- Usar injeção de dependência para desacoplar o código da aplicação do código do framework. Assim, a aplicação pode usar funcionalidades do framework sem instanciar diretamente seus objetos.
- Evitar o uso de bibliotecas ou classes específicas do framework no código da aplicação. Isso facilita a troca de framework no futuro, se necessário.
- Usar interfaces padrão para a aplicação interagir com o framework. Dessa forma, o código da aplicação não depende das particularidades do framework.
- Manter o código da aplicação e o do framework em projetos e/ou repositórios separados.
