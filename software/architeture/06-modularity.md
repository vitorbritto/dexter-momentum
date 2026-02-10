# Modularidade

Falar de modularidade em arquitetura de software é tocar num tema que todo mundo elogia, mas pouca gente sabe praticar com consistência.

O motivo é simples: modularidade virou palavra-coringa. Serve para justificar "boas práticas", para defender reestruturações, para vender refatorações — mas, no dia a dia, quase sempre falta uma definição operacional que permita responder perguntas concretas como:

- onde termina um módulo e começa outro?
- qual o custo real dessa separação?
- o que exatamente estou ganhando ou perdendo?

A provocação de Glenford J. Myers ajuda a colocar o dedo na ferida: a indústria gasta energia demais vendendo o "benefício" da modularidade e pouca energia explicando como mantê-la viva ao longo do tempo. E isso importa porque modularidade não é um detalhe de estilo de código: ela funciona como o esqueleto do sistema. Quando o esqueleto é frágil, tudo vira gambiarra de compensação: regras de negócio espalhadas, dependências cruzadas, alterações que quebram lugares improváveis e um medo constante de mexer.

## Modularidade como princípio organizacional (e não como "feature")

Modularidade é, antes de tudo, um princípio de organização. Ela define como o sistema é dividido em partes compreensíveis, como essas partes se comunicam e, principalmente, quais partes não deveriam se conhecer. Essa última parte é a que dói: modularidade boa é aquela que também cria limites — e limite é sempre uma forma de dizer "não".

Por isso, modularidade costuma aparecer como uma característica implícita: quase nenhum requisito funcional pede "garantir boa modularidade", mas qualquer sistema que precise sobreviver a anos de mudança precisa dela. É a mesma lógica da entropia: sistemas complexos naturalmente tendem à desordem. Sem esforço consciente, o software degrada. O "esforço" aqui é arquitetural: estabelecer fronteiras, reforçar contratos, reduzir acoplamento, incentivar coesão e resistir à tentação de atalhos que parecem rápidos hoje, mas se transformam em custos no futuro.

## O que é um módulo, afinal?

A definição mais útil para arquitetura é tratar módulo como um agrupamento lógico de código relacionado: classes, funções, arquivos, pacotes, namespaces. O ponto não é o mecanismo (`package`, `namespace`, `folder`), e sim a intenção: agrupar o que faz sentido andar junto e separar o que não deveria evoluir no mesmo ritmo.

Essa definição também esclarece um erro comum: confundir modularidade com separação física. Um monólito pode ser muito bem modularizado (limites claros, baixo acoplamento interno, organização por domínio), e um sistema distribuído pode ser um desastre (serviços que dependem de detalhes uns dos outros, contratos quebradiços, mudanças em cascata). Distribuir não é modularizar; às vezes é só espalhar o problema.

## Por que o "empacotamento" da linguagem é assunto de arquitetura

Linguagens oferecem mecanismos de modularidade, mas também oferecem armadilhas. Em ambientes modernos, dá para definir comportamento em funções, classes e pacotes — cada um com regras distintas de escopo e visibilidade. Isso afeta diretamente a forma como dependências surgem e se consolidam.

Se desenvolvedores empacotam "por conveniência" (juntando coisas porque "fica mais fácil"), o acoplamento cresce silenciosamente. E acoplamento, diferente de bagunça visível, pode parecer "normal" até o dia em que alguém precisa extrair um pedaço, reutilizar um módulo, ou quebrar um monólito. Aí o sistema revela o que realmente é: um bloco de concreto com canos passando por dentro.

## Um pouco de história para entender por que isso é confuso

A confusão não é nova. Antes da orientação a objetos dominar, a programação estruturada (incentivada por críticas ao GOTO, como as de Dijkstra) colocou foco em clareza e raciocínio. Só que as linguagens da época não tinham bons mecanismos para agrupar logicamente "coisas do mesmo assunto". Surgiram linguagens mais "modulares", como Modula e Ada, que tinham módulos como constructo central.

Depois, OO popularizou encapsulamento e reutilização via classes, mas os designers de linguagem perceberam que ainda precisávamos de unidades maiores que classes para organizar sistemas: pacotes, namespaces e módulos permaneceram. E com isso veio a mistura de paradigmas e compatibilidades estranhas — Java é um bom exemplo: convive com modularidade via packages, OO via classes e até elementos funcionais, cada um com seus próprios "jeitos" de escopo e acoplamento.

## Namespace: o problema invisível dos nomes

O conceito de namespace existe para evitar colisões e organizar ativos: separar entidades com nomes iguais, mas significados diferentes. A internet é um exemplo intuitivo: identificadores únicos atrelados a endereços.

Em linguagens como Java, o namespace chegou a ser "forçado" a casar com a estrutura física do sistema de arquivos. A ideia original era esperta: se o sistema de arquivos não permite dois arquivos com mesmo nome no mesmo diretório, então a ambiguidade some. Só que, com projetos maiores e reutilização via bibliotecas, isso ficou impraticável. O surgimento dos JARs reintroduziu a possibilidade de colisões no classpath e abriu a caixa de Pandora dos classloaders e "histórias de guerra" de debugging. Moral: decisões de modularidade e empacotamento têm efeito real no custo operacional do sistema.

## Medindo modularidade: quando "parece bom" não basta

Como modularidade é estrutural, arquitetos precisam de instrumentos para enxergar o que o olho não vê. Entram três lentes complementares:

- coesão
- acoplamento
- connascência

## Coesão: o que deveria estar junto

Coesão descreve o quanto as partes de um módulo pertencem naturalmente umas às outras. Um módulo coeso tem foco; ele parece "uma coisa só". Conforme a coesão cai, o módulo vira uma gaveta de utilidades: coisas relacionadas "por tema", mas não por função.

A lista clássica de tipos (funcional, sequencial, comunicacional, procedural, temporal, lógica, coincidental) é útil porque dá vocabulário para discutir qualidade de separação. Mas coesão é subjetiva. E isso não é defeito: significa que coesão é uma decisão de design orientada por trade-offs. A pergunta "Customer Maintenance deve conter pedidos?" não tem resposta universal; depende de crescimento esperado, de conhecimento compartilhado, do custo de separar e do tipo de mudança que o domínio costuma sofrer.

**Tipos de coesão:**

- Funcional: todas as funcionalidades do módulo estão relacionadas a um único objetivo.
- Sequencial: as funcionalidades do módulo estão relacionadas a uma sequência de passos.
- Comunicacional: as funcionalidades do módulo estão relacionadas a comunicação entre módulos.
- Procedural: as funcionalidades do módulo estão relacionadas a um procedimento.
- Temporal: as funcionalidades do módulo estão relacionadas a um tempo.
- Lógica: as funcionalidades do módulo estão relacionadas a uma lógica.
- Coincidental: as funcionalidades do módulo estão relacionadas a um acidente.

## LCOM: quando a classe está fingindo ser uma coisa só

A métrica LCOM (Lack of Cohesion in Methods) tenta capturar uma ideia estrutural: se métodos de uma classe não compartilham os mesmos campos, talvez a classe esteja "colada" por acidente. É uma lanterna boa para identificar classes utilitárias inchadas ou "God classes" disfarçadas.

Mas LCOM não entende intenção. Ela enxerga estrutura, não semântica. Então serve como sinal, não como sentença: aponta onde investigar, não o que decidir.

## Acoplamento: o quanto uma parte depende da outra

Acoplamento mede dependências.

- **Aferente** (Ca) conta quem depende de você
- **Eferente** (Ce) conta de quantos você depende

Isso importa porque dependência é o canal por onde a mudança se propaga. Alto acoplamento significa que mudar uma coisa pode ter um reflexo de mudança sem intenção em outras partes do sistema.

Robert Martin derivou métricas que ajudam a entender equilíbrio:

- **Abstractness** (A): proporção de abstrações versus implementações.
- **Instability** (I): quanto suas dependências de saída tornam você sensível a mudanças externas.
- **Distance from the Main Sequence** (D): quão distante você está do equilíbrio ideal entre abstração e estabilidade.

A ideia aqui é simples: muito concreto e instável vira zona da dor (brittle, difícil de manter). Muito abstrato e **estável demais** vira zona da inutilidade (bonito, mas ninguém consegue usar sem sofrer).

## Limitação inevitável: métrica não faz julgamento sozinha

Métricas são instrumentos grosseiros. Elas não distinguem complexidade essencial (o problema é difícil) de complexidade acidental (o código ficou difícil). Por isso, elas precisam de interpretação e contexto — mas isso não as torna inúteis. Elas servem para criar baseline e detectar degradação ao longo do tempo.

## Connascência: a qualidade do acoplamento (não só a quantidade)

Connascência refina a discussão: não basta saber que módulos se acoplam; importa como eles se acoplam.

A definição é direta: **se mudar um exige mudar outro para manter correção, eles são connascentes**.

- **Connascência estática** trata de acoplamentos no código: por nome, por tipo, por significado, por posição, por algoritmo.
- **Connascência dinâmica** trata de acoplamentos em tempo de execução: por ordem de execução, por timing, por valores que precisam mudar juntos, por identidade compartilhada.

A utilidade prática aqui é excelente: dá orientação de refatoração. Trocar connascência de significado por connascência de nome (ex.: tirar "magic numbers" e criar constantes) enfraquece acoplamento. Trocar connascência de posição por um objeto com campos nomeados reduz erro semântico.

E as propriedades completam o quadro:

- **Strength**: preferir acoplamentos mais fáceis de refatorar.
- **Locality**: acoplamento forte é tolerável quando local; é perigoso quando distante.
- **Degree**: quanto mais módulos impactados, pior.

Isso vira uma estratégia: minimizar connascência entre módulos e **aceitar** connascência dentro de fronteiras bem definidas, porque ali ela é controlada e mais barata.

## Acoplamento + connascência: quantidade e qualidade andando juntas

Acoplamento mede volume de dependências; connascência mede a natureza dessas dependências. Juntos, eles dão uma visão mais realista: dá para ter pouco acoplamento, mas de péssima qualidade (por exemplo, dependência por ordem/timing em runtime), e dá para ter acoplamento inevitável, mas bem desenhado (contratos estáveis, nomes claros, tipos explícitos).

## Conclusão

No fim, modularidade é menos sobre "como dividir pastas" e mais sobre manter ordem em um sistema que naturalmente quer virar caos. É uma disciplina de limites: o que fica junto, o que fica separado, como mudanças devem se propagar e como impedir que detalhes vazem.

A parte mais importante — e menos glamourosa — é aceitar que modularidade não é um estado final. Ela é uma prática contínua: medir, observar degradação, ajustar fronteiras, refatorar dependências e reforçar contratos. Arquitetura não é desenhar uma vez; é sustentar uma estrutura viva enquanto ela apanha do mundo real.
