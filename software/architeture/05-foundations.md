# Fundamentos

Para compreender os principais trade-offs em arquitetura, Arquitetos de Software precisam dominar alguns conceitos e terminologias básicas, como:

- Componentes
- Modularidade
- Acoplamento
- Connascência

Esses conceitos formam a base para decisões arquiteturais conscientes.

## Pensamento Arquitetural

Um arquiteto enxerga o sistema de forma diferente de um desenvolvedor, assim como um meteorologista enxerga nuvens de forma diferente de um artista.
Neste cenário de Desenvolvimento de Software, essa forma distinta de enxergar é chamada de pensamento arquitetural.

Pensar como arquiteto não é apenas "pensar sobre arquitetura". É enxergar sistemas com um olhar arquitetural, considerando impactos técnicos, organizacionais e de negócio.

**Existem quatro aspectos centrais do pensamento arquitetural:**

1. **Arquitetura versus Design**: Entender a diferença entre arquitetura e design, e saber colaborar com os times de desenvolvimento.
2. **Amplitude Técnica**: Ter ampla visão técnica (breadth), mantendo profundidade suficiente para tomar boas decisões.
3. **Trade-offs**: Analisar e reconciliar _trade-offs_ entre soluções e tecnologias.
4. **Drivers de Negócio**: Compreender os drivers de negócio e traduzi-los em decisões arquiteturais.

## Arquitetura versus Design

A diferença entre arquitetura e design costuma gerar confusão:

- Onde termina a arquitetura?
- Onde começa o design?
- Qual é o papel do arquiteto e qual é o do desenvolvedor?

Pensar como arquiteto significa entender essa diferença e, ao mesmo tempo, como ambas se integram para resolver problemas técnicos e de negócio.

### Visão tradicional (problemática)

**Tradicionalmente:**

- O arquiteto:

  - Analisa requisitos de negócio
  - Define características arquiteturais ("-ilities")
  - Escolhe padrões e estilos arquiteturais
  - Define componentes do sistema

- O desenvolvedor:
  - Cria diagramas de classes
  - Implementa interfaces
  - Desenvolve e testa o código

Esse modelo cria um fluxo unidirecional, onde:

- Decisões do arquiteto não chegam ao time
- Decisões do time não retornam ao arquiteto

> 👉 **Resultado: a arquitetura falha, porque o arquiteto fica desconectado da realidade da implementação.**

### Arquitetura que funciona

Para a arquitetura funcionar de verdade:

- Barreiras físicas e virtuais entre arquiteto e desenvolvedores precisam ser quebradas
- A relação deve ser bidirecional
- Arquiteto e desenvolvedores devem atuar como um único time

> 👉 **Arquitetura e design não têm uma fronteira fixa. Eles evoluem juntos, a cada iteração do projeto.**

## Amplitude Técnica (Technical Breadth)

A principal diferença entre desenvolvedor e arquiteto está no tipo de conhecimento necessário.

- Desenvolvedores precisam de profundidade técnica
- Arquitetos precisam de amplitude técnica

### A pirâmide do conhecimento

Todo conhecimento técnico pode ser dividido em três partes:

1. O que você sabe
   - Tecnologias que você usa no dia a dia.
2. O que você sabe que não sabe
   - Tecnologias que conhece superficialmente.
3. O que você não sabe que não sabe
   - O maior bloco: soluções que resolveriam problemas, mas você nem sabe que existem.

### Evolução do desenvolvedor

No início da carreira, o foco deve ser:

- Expandir o topo da pirâmide (expertise)
- Ganhar experiência prática
- Construir profundidade técnica

> 👉 **Mas expertise exige manutenção constante. Se você para de usar uma tecnologia, sua expertise se deteriora.**

### Transição para arquiteto

Para arquitetos:

- Amplitude é mais valiosa que profundidade
- É melhor conhecer cinco soluções possíveis do que dominar apenas uma

O arquiteto precisa:

- Abrir mão de parte da profundidade
- Expandir o conhecimento sobre diferentes tecnologias, estilos e abordagens

**Isso causa desconforto para muitos desenvolvedores e gera dois problemas comuns:**

1. Tentar ser especialista em tudo → fracasso em tudo
2. Achar que conhecimento antigo ainda é atual

### Anti-Pattern: Frozen Caveman

O Frozen Caveman Anti-Pattern descreve arquitetos que:

- Foram "queimados" por um problema no passado
- Passam a tomar decisões baseadas nesse trauma
- Veem riscos irreais em todos os sistemas

### Exemplo clássico:

"Mas e se a gente perder a Itália?"

Pensar como arquiteto exige:

- Diferenciar risco real de risco percebido
- Não projetar traumas antigos em novos contextos
- Fazer avaliações realistas

### Análise de Trade-Offs

Pensar como arquiteto é analisar trade-offs o tempo todo.

> 👉 **Arquitetura é aquilo que você não consegue resolver no Google.**

Não existem respostas certas ou erradas, apenas trade-offs.

**Tudo depende de:**

- Contexto
- Negócio
- Ambiente
- Cultura
- Time
- Orçamento
- Prazo

### Exemplo: Sistema de leilão

Um sistema de leilão precisa enviar lances para vários serviços.

**Duas opções:**

- Tópicos (publish/subscribe)
- Filas (point-to-point)

**Vantagens de tópicos**

- Alta extensibilidade
- Menor acoplamento
- Fácil adicionar novos consumidores

**Desvantagens de tópicos**

- Riscos de segurança
- Contratos homogêneos
- Menor controle de monitoramento e escalabilidade

**Vantagens de filas**

- Mais controle de segurança
- Contratos específicos por consumidor
- Monitoramento e escalabilidade independentes

**Conclusão:**

Qual é melhor? Depende.

Pensar arquiteturalmente é decidir o que é mais importante naquele contexto.

## Drivers de Negócio

**O arquiteto precisa:**

- Entender o negócio
- Traduzir necessidades em características arquiteturais
- Escalabilidade
- Performance
- Disponibilidade
- Resiliência

**Isso exige:**

- Conhecimento de domínio
- Comunicação com stakeholders
- Colaboração constante

## Arquitetura vs Código na Prática

Arquitetos devem programar, mas com cuidado para não virar gargalo.

**Evitar o bottleneck trap**

O arquiteto vira gargalo quando:

- Assume código crítico
- Não consegue acompanhar o ritmo do time

**Estratégia recomendada**

- Delegar código crítico ao time
- Codar funcionalidades de negócio mais à frente no roadmap

**Benefícios:**

1. Continua com código em produção
2. Time ganha ownership
3. Arquiteto sente as dores reais do time

## Como manter mão na massa

**Mesmo sem codar o core diariamente, o arquiteto pode:**

1. Criar Proofs of Concept (POCs)
2. Trabalhar em dívida técnica
3. Corrigir bugs
4. Criar automações
5. Desenvolver ferramentas internas
6. Criar fitness functions arquiteturais
7. Participar de code reviews

**Essas práticas mantêm:**

- Profundidade técnica
- Conexão com o time
- Qualidade arquitetural

## Conclusão

**Pensar como arquiteto é:**

- Ver o sistema como um todo
- Entender trade-offs
- Equilibrar técnica e negócio
- Colaborar com o time
- Evoluir constantemente a arquitetura

> 👉 **Arquitetura não é um documento. É uma prática viva, construída todos os dias.**
