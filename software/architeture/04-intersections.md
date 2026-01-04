# Interseções de Arquitetura

A arquitetura de software ampliou seu escopo e hoje inclui preocupações antes restritas a operações, processos e práticas de engenharia. No passado, operações eram terceirizadas e tratadas por contratos; hoje, arquiteturas modernas como microservices integram essas preocupações por meio da colaboração entre arquitetura e DevOps.

Casos históricos como o da Pets.com mostraram que o sucesso sem infraestrutura adequada pode levar ao fracasso, impulsionando a necessidade de escalabilidade elástica. Esse aprendizado levou ao surgimento de frameworks e práticas que tornaram a elasticidade um recurso comum nas arquiteturas atuais.

A arquitetura passou a se conectar fortemente com práticas de engenharia, como automação, testes e integração contínua. Diferente de processos organizacionais, essas práticas são independentes de metodologia e evoluíram do Extreme Programming para Continuous Delivery e DevOps.

Como o desenvolvimento de software lida com _unknown unknowns_, toda arquitetura se torna inevitavelmente iterativa. Por isso, abordagens ágeis se alinham melhor à realidade arquitetural do que processos preditivos e rígidos.

> 👉 **“Unknown unknowns”** são problemas, riscos ou requisitos que você não sabe que existem no momento em que está projetando ou planejando um sistema. É diferente de algo que você já sabe que precisa descobrir.

Arquiteturas modernas exigem práticas modernas para reduzir atrito e complexidade. Por isso, surgiu o conceito de arquitetura evolutiva, que reconhece a mudança contínua dos sistemas. Para garantir que características arquiteturais sejam preservadas ao longo do tempo, utilizam-se fitness functions, que medem objetivamente atributos como desempenho, confiabilidade e resiliência.

> 👉 **Fitness functions** são mecanismos objetivos (testes, métricas, monitoramento) que garantem que características arquiteturais importantes não se degradem com a evolução do sistema. Em vez de confiar em opinião ou revisão manual, a arquitetura passa a ser medida continuamente.

A integração entre arquitetura e operações permite simplificar o design, delegando responsabilidades operacionais a quem é mais adequado. Processo, dados e arquitetura também são interdependentes, pois código e armazenamento formam um sistema inseparável.

Por fim, duas leis fundamentais orientam a arquitetura de software:

- toda decisão envolve trade-offs;
- **compreender por que uma decisão foi tomada** é mais importante do que apenas saber como o sistema foi construído.

## Arquiteto de Software

Lembre-se que:

- não escolhe o incêndio — só responde a ele de forma eficiente;
- protege a experiência do usuário, garantindo que o sistema continue funcionando;
- toma decisões sob pressão;
- lida com informações incompletas e partes desconhecidas;
- entende que "apagar fogo" é só parte do trabalho.
