# Bare Metal, Virtual Machines, and Containers

## Visão geral

Ao projetar ou implantar uma aplicação moderna, uma das decisões mais importantes é onde e como ela vai rodar. As três opções clássicas são:

- Bare Metal
- Virtual Machines (VMs)
- Containers

Nenhuma delas é "melhor" em todos os cenários. **Arquitetura é escolha consciente de trade-offs.**

## Bare Metal

### O que é

Bare metal é um servidor físico dedicado, de uso exclusivo (single tenant). Não há virtualização: o sistema operacional e a aplicação rodam diretamente no hardware.

**Vantagens**

- Máximo desempenho possível do hardware
- Isolamento físico total
- Não sofre com noisy neighbor
- Nível máximo de segurança
- Menor exposição a ataques de canal lateral (side-channel attacks)

**Quando faz sentido**

- Aplicações de altíssimo desempenho
- Cenários com exigências severas de segurança, compliance ou regulamentação
- Workloads sensíveis a latência ou previsibilidade de CPU/memória

**Desvantagens**

- Custo elevado
- Difícil de escalar
- Provisionamento lento
- Exige equipe experiente para operação

> 👉 **Em resumo:** potência e segurança máxima, com alto custo operacional.

⸻

## Virtual Machines (VMs)

### O que é

Uma VM é a emulação de um computador físico. Várias VMs rodam sobre o mesmo hardware usando um hypervisor, cada uma com seu próprio sistema operacional.

**Arquitetura simplificada:**

- Hardware físico
- Sistema operacional host
- Hypervisor
- VMs (cada uma com seu guest OS + aplicações)

**Vantagens**

- Melhor aproveitamento do hardware
- Custo menor que bare metal
- Escalabilidade muito mais simples
- Flexibilidade de tamanhos (de poucas CPUs a centenas de cores)
- Possibilidade de migração ao vivo de VMs

**Desvantagens**

- Pode sofrer com noisy neighbor
- Compartilhamento de CPU física
- Vulnerável a ataques como Meltdown e Spectre
- Overhead maior por VM (cada uma carrega um OS)

> 👉 **Em resumo:** bom equilíbrio entre custo, isolamento e flexibilidade.

## Containers

### O que é

Um container é um pacote leve da aplicação com suas dependências, que compartilha o mesmo sistema operacional do host. Aqui não se virtualiza hardware, mas sim o sistema operacional.

**Arquitetura simplificada:**

- Hardware físico
- Sistema operacional host
- Container Engine (ex: Docker)
- Containers (processos isolados)

**Vantagens**

- Muito leves
- Inicialização extremamente rápida
- Alta densidade (mais containers por servidor)
- Portabilidade
- Facilidade de deploy e automação
- Ideais para escala horizontal

**Desvantagens**

- Isolamento menor
- Compartilham o mesmo kernel
- Dependem fortemente da segurança do sistema operacional
- Superfície de ataque maior em comparação a VMs

> 👉 **Em resumo:** velocidade, escala e produtividade, com mais cuidado em segurança.
