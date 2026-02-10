# Caracteristicas Arquiteturais

São critérios **não ligados diretamente ao domínio do negócio**, mas que são **essenciais para o sucesso do sistema**.  
Eles influenciam **como** o software é construído, não **o que** ele faz.

**Exemplos:**

- Performance
- Segurança
- Escalabilidade
- Disponibilidade
- Manutenibilidade

## Por que não chamar de "Requisitos Não Funcionais"?

O termo _non-functional requirements_ minimiza a importância desses fatores.  
Eles são **tão importantes quanto os requisitos de negócio**, pois afetam:

- Estrutura do sistema
- Custos
- Qualidade
- Confiabilidade

Por isso, o termo preferido é **Caracteristicas Arquiteturais**.

## Critérios de definição

Uma característica arquitetural deve:

1. **Não pertencer ao domínio do negócio**
2. **Influenciar a estrutura do sistema**
3. **Ser crítica para o sucesso da aplicação**

## Implícitas vs Explícitas

### Implícitas

Não aparecem nos requisitos, mas são essenciais:

- Segurança
- Confiabilidade
- Disponibilidade

### Explícitas

São documentadas formalmente:

- SLA de performance
- Regras de compliance
- Requisitos de escalabilidade

## Impacto estrutural no design

Exemplo com pagamento:

| Cenário                | Impacto arquitetural                     |
| ---------------------- | ---------------------------------------- |
| Pagamento via terceiro | Segurança padrão                         |
| Pagamento interno      | Módulos isolados, maior rigor estrutural |

Quando a característica exige **estrutura especial**, ela vira uma decisão arquitetural.

## Menos é mais

Cada característica adiciona **complexidade**.  
Arquitetos devem escolher **as poucas mais importantes**, não todas.

> 👉 Objetivo: _menos características, melhor foco._

## Categorias

### Operacionais

Relacionadas à execução do sistema:

- **Availability**: Por quanto tempo o sistema precisa estar disponível (por exemplo, se for 24/7, etapas devem estar em vigor para permitir que o sistema volte ao ar rapidamente em caso de qualquer falha).
- **Continuity**: Capacidade de recuperação de desastres.
- **Performance**: Inclui testes de estresse, análise de picos, análise da frequência de uso das funções, capacidade necessária e tempos de resposta. A validação de performance às vezes exige um processo próprio, que pode levar meses para ser concluído.
- **Recoverability**: Requisitos de continuidade do negócio (ex.: em caso de desastre, em quanto tempo o sistema precisa estar online novamente?). Isso impactará a estratégia de backup e a necessidade de hardware duplicado.
- **Reliability/Safety**: Avaliar se o sistema precisa ser à prova de falhas, ou se a sua falha causaria grandes prejuízos financeiros à empresa.
- **Robustness**: Capacidade de lidar com erros e condições de contorno durante a execução, por exemplo, se a conexão com a internet cair ou houver uma queda de energia ou falha de hardware.
- **Scalability**: Capacidade do sistema de continuar operando à medida que aumenta o número de usuários ou de requisições.

### Estruturais

Relacionadas ao código:

- **Configurability**: Capacidade dos usuários finais de alterar facilmente aspectos da configuração do software (por meio de interfaces usáveis).
- **Extensibility**: Importância de conseguir adicionar facilmente novas funcionalidades.
- **Installability**: Facilidade de instalar o sistema em todas as plataformas necessárias.
- **Leverageability/Reusability**: Capacidade de aproveitar componentes comuns em múltiplos produtos.
- **Localization**: Suporte a múltiplos idiomas em telas de entrada/consulta, campos de dados, relatórios, requisitos para caracteres multibyte, unidades de medida ou moedas.
- **Maintainability**: Facilidade de aplicar mudanças e aprimorar o sistema.
- **Portability**: O sistema precisa rodar em mais de uma plataforma? (Por exemplo, o frontend deve funcionar tanto com Oracle quanto com SAP DB?)
- **Supportability**: Nível de suporte técnico necessário para a aplicação; nível de logging e facilidades necessárias para depuração de erros no sistema.
- **Upgradeability**: Capacidade de atualizar facilmente/rapidamente de uma versão anterior desta aplicação/solução para uma versão mais nova em servidores e clientes.

### Transversais (Cross-cutting)

- **Privacy**: Capacidade de esconder transações e dados de partes internas da empresa (ex: transações criptografadas para que nem DBAs tenham acesso).
- **Security**: Necessidade de encriptação de dados no banco, comunicação entre sistemas internos, autenticação para acesso remoto, etc.
- **Supportability**: Nível de suporte técnico exigido pela aplicação, incluindo requisitos de logging e ferramentas de depuração de erros.
- **Usability**: Facilidade de uso do sistema pelos usuários finais; nível de treinamento necessário para atingir seus objetivos com a solução.

> Observação: Requisitos de usabilidade devem ser tratados com seriedade equivalente a qualquer outro critério arquitetural.

## Italy-ility (itália-abilidade)

Além disso, muitos dos termos anteriores são imprecisos e ambíguos, às vezes por causa de nuances sutis ou da falta de definições objetivas. Por exemplo, interoperabilidade e compatibilidade podem parecer equivalentes, o que é verdade para alguns sistemas. No entanto, elas diferem porque interoperabilidade implica facilidade de integração com outros sistemas, o que, por sua vez, pressupõe APIs publicadas e documentadas. Compatibilidade, por outro lado, está mais relacionada a padrões da indústria e do domínio.

Outro exemplo é learnability (facilidade de aprendizado). Uma definição se refere à facilidade com que os usuários aprendem a usar o software. Outra definição se refere ao nível em que o sistema consegue aprender automaticamente sobre seu ambiente para se tornar auto-configurável ou auto-otimizável, usando algoritmos de machine learning.

Muitas definições se sobrepõem. Por exemplo, disponibilidade e confiabilidade parecem se sobrepor na maioria dos casos. No entanto, considere o protocolo de internet UDP, que é a base do TCP. O UDP é disponível sobre IP, mas não é confiável: os pacotes podem chegar fora de ordem, e o receptor pode precisar solicitar novamente os pacotes ausentes.

Não existe uma lista completa de padrões. A Organização Internacional de Padronização (ISO) publica uma lista organizada por capacidades, que se sobrepõe a muitas das que já mencionamos, mas que ainda estabelece um conjunto incompleto de categorias. A seguir estão algumas definições da ISO:

### Eficiência de desempenho (Performance efficiency)

Medida do desempenho em relação à quantidade de recursos utilizados sob condições conhecidas. Inclui comportamento de tempo (medidas de resposta, tempo de processamento e/ou taxas de transferência), utilização de recursos (quantidades e tipos de recursos usados) e capacidade (grau em que os limites máximos estabelecidos são excedidos).

### Compatibilidade (Compatibility)

Grau em que um produto, sistema ou componente pode trocar informações com outros produtos, sistemas ou componentes e/ou executar suas funções necessárias enquanto compartilha o mesmo ambiente de hardware ou software.

Inclui:

- **Coexistência**: capacidade de executar suas funções de forma eficiente enquanto compartilha recursos com outros produtos.
- **Interoperabilidade**: grau em que dois ou mais sistemas conseguem trocar e utilizar informações.

### Usabilidade (Usability)

Capacidade de os usuários utilizarem o sistema de forma eficaz, eficiente e satisfatória para seu propósito. Inclui:

- Reconhecimento de adequação (o usuário entende se o software atende às suas necessidades)
- Facilidade de aprendizado (learnability)
- Proteção contra erros do usuário
- Acessibilidade (uso por pessoas com diferentes capacidades)

### Confiabilidade (Reliability)

Grau em que um sistema funciona sob condições especificadas por um período determinado. Inclui:

- Maturidade (atende às necessidades de confiabilidade em operação normal)
- Disponibilidade (sistema operacional e acessível)
- Tolerância a falhas
- Recuperabilidade (capacidade de restaurar dados e o estado do sistema após falhas)

### Segurança (Security)

Grau em que o software protege informações e dados, garantindo que pessoas ou sistemas tenham acesso apropriado conforme seus níveis de autorização.

Inclui:

- Confidencialidade
- Integridade
- Não repúdio
- Responsabilidade (accountability)
- Autenticidade

### Manutenibilidade (Maintainability)

Grau de eficácia e eficiência com que desenvolvedores conseguem modificar o software para melhorá-lo, corrigi-lo ou adaptá-lo a mudanças. Inclui:

- Modularidade
- Reutilização
- Analisabilidade
- Modificabilidade
- Testabilidade

### Portabilidade (Portability)

Grau em que desenvolvedores conseguem transferir um sistema ou componente entre diferentes ambientes. Inclui:

- Adaptabilidade
- Instalabilidade
- Substituibilidade

### Adequação funcional (Functional suitability)

Esta característica descreve o grau em que um sistema fornece funções que atendem às necessidades declaradas e implícitas. Inclui:

- Completude funcional
- Correção funcional
- Adequação funcional

Essas não são características arquiteturais, mas sim requisitos motivacionais para a construção do software. Isso mostra como a relação entre características arquiteturais e o domínio do problema evoluiu — tema abordado no Capítulo 7.

## Ambiguidade nos termos

Muitos termos se sobrepõem:

- Availability (Disponibilidade) ≠ Reliability (Confiabilidade)
- Compatibility (Compatibilidade) ≠ Interoperability (Interoperabilidade)
- Learnability (Aprendizagem) pode ser:
  - Facilidade de uso
  - Capacidade de auto-aprendizado

Cada empresa precisa definir um **vocabulário comum** (Ubiquitous Language).

## Trade-offs inevitáveis

Melhorar uma característica normalmente piora outra:

- Mais segurança → menos performance
- Mais escalabilidade → mais complexidade

Arquitetura é **equilíbrio**, não otimização total.

> 👉 **"Não buscar a melhor arquitetura, mas a menos pior."**

## Conclusão

- Arquitetura precisa ser **flexível**
- Mudanças devem ser **baratas**
- Iteração é parte do processo
