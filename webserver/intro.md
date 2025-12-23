# O que é um Servidor Web?

Um servidor web armazena e entrega arquivos aos navegadores, tornando seu site acessível aos usuários. Ele também processa arquivos para e-mails e armazenamento de dados usando protocolos como SMTP (Simple Mail Transfer Protocol) e FTP (File Transfer Protocol).

Embora seja possível configurar seu próprio servidor, alugá-lo de um provedor de hospedagem economiza tempo, dinheiro e esforço.

## Principais componentes de um servidor web

- **Software**: O software do servidor web controla como os usuários acessam os arquivos hospedados. Ele inclui vários componentes e, no mínimo, um servidor HTTP para processar e responder às requisições recebidas.
- **Hardware**: Armazena o software do servidor e seus arquivos, como documentos HTML estáticos, arquivos JavaScript e folhas de estilo CSS. O hardware também se conecta à internet, permitindo a troca de dados com outros dispositivos.

## Como um Servidor Web funciona?

Servidores web e de aplicação seguem o modelo cliente-servidor. Nesse modelo, o cliente solicita um recurso ou serviço, e o servidor responde. Os servidores web usam o HTTP (Hypertext Transfer Protocol) para responder às requisições dos usuários pela web.

## Fluxo básico do processo

1. O navegador procura o servidor que hospeda o site.
2. O domínio é convertido em um endereço IP via DNS (ou buscado no cache).
3. O navegador envia uma requisição HTTP ao servidor.
4. O servidor processa a requisição e busca os dados necessários.
5. Os arquivos são retornados ao navegador.
6. Se algo falhar, o servidor retorna um código de erro HTTP.

## Erros comuns

- `404` -> página não encontrada
- `403` -> permissão negada
- `504` -> timeout ao se comunicar com outro servidor

## Servidores Web Estáticos vs Dinâmicos

- **Servidor Web Estático**: Envia arquivos exatamente como estão, sem modificações. Ideal para blogs e portfólios. Costuma ser mais rápido por não exigir processamento no servidor.
- **Servidor Web Dinâmico**: Usa software adicional (servidor de aplicação e banco de dados) para personalizar o conteúdo conforme a interação do usuário. Ideal para redes sociais e e-commerces.

Exemplo: após uma compra, o site recomenda produtos similares na próxima visita.

# Por que usar um Servidor Web?

A principal função de um servidor web é hospedar sites, tornando-os acessíveis globalmente. Para publicar um site, você precisa de hospedagem e um nome de domínio.

O provedor de hospedagem:

- fornece espaço no servidor
- realiza manutenção
- garante segurança e performance

Benefícios de um bom provedor de hospedagem:

- Alta disponibilidade (uptime) – padrão de mercado: 99,9%
- Servidores seguros – proteção contra malware e ataques
- Diversos planos – conforme necessidade e orçamento
- Custo-benefício – sem necessidade de servidor dedicado
- Flexibilidade – planos escaláveis

## Funcionalidades de um Servidor Web

- Logs de arquivos – registro de requisições, erros e eventos
- Autenticação – controle de acesso via usuário e senha
- Limitação de banda – controle de tráfego
- Espaço de armazenamento – para arquivos e aplicações
- Balanceamento de carga – distribuição de tráfego entre servidores
- Garantia de uptime – impacto direto na disponibilidade
- Suporte a linguagens – como Python, PHP, etc.

## Servidores Web Mais Usados no Mercado

- Apache HTTP Server: Open source, multiplataforma, muito popular (mais de 31% de market share).
- NGINX: Rápido, escalável, atua como servidor web, proxy reverso e load balancer.
- Microsoft IIS: Servidor fechado da Microsoft, usado no Windows, suporta ASP.
- Lighttpd: Leve, rápido e eficiente em uso de CPU e memória.

## Configuração de Servidores Web

Uma boa configuração afeta diretamente segurança, confiabilidade e performance.

**Principais tarefas:**

- Ajuste de configurações -> cache, limites de requisição, timeouts
- Segurança -> firewalls, criptografia, patches
- Otimização de performance -> cache, balanceamento de carga, uso eficiente de recursos
