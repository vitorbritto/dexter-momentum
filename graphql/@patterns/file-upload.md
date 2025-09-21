# GraphQL e Uploads de Arquivos

O GraphQL não foi projetado com upload de arquivos em mente. Embora seja tecnicamente possível implementá-los, isso exige estender a camada de transporte e introduz riscos de segurança e confiabilidade.

Este guia explica por que uploads via GraphQL são problemáticos e apresenta alternativas mais seguras.

## Por que uploads são desafiadores

- O GraphQL é agnóstico em relação a transporte e serialização (embora HTTP + JSON sejam mais comuns).
- Foi projetado para lidar com requisições pequenas, não com dados binários.
- Arquivos (imagens, PDFs, etc.) são binários, e encodings como JSON não lidam bem com isso.
  • Uma opção é usar base64 dentro do JSON, mas é ineficiente e inviável para arquivos grandes.
  • O mais usado é multipart/form-data, mas ele traz suas próprias complexidades.

A comunidade adota a especificação GraphQL multipart request, já implementada em vários frameworks. Mas é preciso muito cuidado para não expor vulnerabilidades.

## Riscos a considerar

- Exaustão de memória por variáveis repetidas → o mesmo arquivo pode ser referenciado várias vezes e drenar o stream incorretamente.
- Vazamento de streams em operações falhas → se a validação ou autorização falhar, streams podem nunca ser consumidos e gerar vazamento de memória.
- CSRF → multipart/form-data não exige preflight em CORS, então uploads podem vir de origens maliciosas.
- Payloads excessivos → uploads muito grandes ou arquivos extras podem sobrecarregar o servidor.
- Metadados não confiáveis → nomes, MIME types e conteúdos não devem ser confiados; é necessário sanitizar e validar.

## Recomendação: Usar URLs assinadas

A abordagem mais segura e escalável é não fazer upload pelo GraphQL diretamente.

**Em vez disso:**

1. Mutation GraphQL pede uma URL assinada do provedor de storage (ex.: S3).
2. O cliente faz o upload direto para essa URL.
3. Uma segunda mutation associa o arquivo aos dados da aplicação (ou um processo automático faz isso).

Isso separa responsabilidades, evita manipulação de binários no servidor e segue boas práticas de arquitetura moderna.

**Se ainda optar por suportar uploads:**

- Use uma implementação bem mantida da spec multipart.
- Garanta que variáveis de upload sejam referenciadas uma única vez.
- Faça streaming direto para disco ou storage em nuvem (não buffer em memória).
- Encerre sempre os streams no fim da requisição.
- Aplique limites rígidos de tamanho e valide todos os campos.
- Trate nomes, tipos e conteúdos de arquivos como dados não confiáveis.
