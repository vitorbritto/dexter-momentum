# Definindo Arquitetura de Software

A indústria, como um todo, tem dificuldade em definir com precisão o que é arquitetura de software.
Alguns a descrevem como o blueprint do sistema, outros como um roadmap de desenvolvimento.
O problema dessas definições é que elas não deixam claro o que realmente compõe a arquitetura.

**A pergunta-chave é:** "O que exatamente um arquiteto analisa quando analisa uma arquitetura?"

> 👉 **Arquitetura é escolha consciente de trade-offs.**

## O que é Arquitetura de Software?

Uma forma mais completa de entender arquitetura de software é vê-la como a combinação de quatro elementos principais:

1. Estrutura do sistema
2. Características arquiteturais
3. Decisões arquiteturais
4. Princípios de design

Arquitetura não é apenas o formato do sistema, mas o conjunto dessas dimensões trabalhando juntas.

### 1. Estrutura do Sistema

A estrutura refere-se ao estilo arquitetural adotado, como:

- Micro-serviços (Microservices)
- Arquitetura em camadas (Layered)
- Monolítico modular (Modular Monolithic)

Apenas dizer "é uma arquitetura de microservices" não é suficiente para descrever a arquitetura de um sistema. Isso explica como o sistema é organizado, mas não por que ele foi organizado dessa forma nem quais regras o governam.

### 2. Características Arquiteturais

As características arquiteturais definem os critérios de sucesso do sistema, geralmente independentes da funcionalidade.

**Exemplos típicos:**

- Performance
- Escalabilidade
- Disponibilidade
- Confiabilidade
- Segurança
- Manutenibilidade

Mesmo sem conhecer as regras de negócio, essas características são essenciais para que o sistema funcione corretamente.
Por isso, elas têm peso central na arquitetura.

### 3. Decisões Arquiteturais

Decisões arquiteturais são regras explícitas que determinam como o sistema deve ser construído.

**Exemplo:**

- Apenas as camadas de negócio e serviços podem acessar o banco de dados
- A camada de apresentação não pode acessar o banco diretamente

**Essas decisões:**

- Criam restrições
- Orientam os times sobre o que é permitido e o que não é (requisitos e restrições)
- Garantem consistência arquitetural

#### Variances (Exceções)

**Quando uma regra não pode ser seguida:**

- Pode-se solicitar uma exceção (variance)
- Normalmente avaliada por um Architecture Review Board (ARB) ou arquiteto responsável
- A decisão é aprovada ou rejeitada com base em justificativas e trade-offs

### 4. Princípios de Design

Princípios de design são diretrizes, não regras rígidas.

**Exemplo:**

- "Prefira comunicação assíncrona entre serviços para melhorar performance."

Isso é diferente de uma decisão arquitetural. Um princípio orienta, mas permite que o desenvolvedor escolha a melhor solução para o contexto (REST, gRPC, mensageria, etc.)

> 👉 Princípios existem porque nenhuma regra cobre todos os cenários possíveis.

## Resumo Final

- Arquitetura de software não é apenas o estilo arquitetural

**Ela é formada por:**

- Estrutura
- Características arquiteturais
- Decisões arquiteturais
- Princípios de design
