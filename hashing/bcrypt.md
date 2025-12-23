O BCrypt é um algoritmo de hash de senha projetado especificamente para armazenar senhas de forma segura. Ele resolve problemas clássicos de algoritmos mais antigos (MD5, SHA-1, SHA-256) quando usados sozinhos para senhas.

Vou explicar por partes, do jeito certo, sem romantizar.

# O problema que o BCrypt resolve

Hashes rápidos são ruins para senhas.

- SHA-256 é ótimo para integridade de arquivos
- Mas é rápido demais para senha
- Ataques de força bruta e rainbow tables quebram milhões de hashes por segundo

BCrypt nasce com um objetivo claro: ser lento e caro de propósito.

## O que é o BCrypt, tecnicamente

BCrypt é um hash adaptativo baseado no Blowfish, com três características fundamentais:

- Salt embutido
- Custo configurável (cost factor)
- Computacionalmente caro

Ele não depende de você “lembrar de adicionar segurança”.

A segurança faz parte do algoritmo.

## Salt embutido (e por que isso importa)

Toda senha hasheada com BCrypt inclui um salt aleatório.

Isso garante que:

- A mesma senha → hashes diferentes
- Rainbow tables ficam inúteis
- Ataques pré-computados não funcionam

Exemplo:

```
senha: 123456
hash1: $2b$10$7F...
hash2: $2b$10$9Q...
```

O salt fica dentro do próprio hash.
Você não precisa armazenar nada separado.

## Cost Factor (o coração do BCrypt)

O cost factor define quantas vezes o algoritmo vai iterar internamente.

Formato:

```
$2b$10$...
```

- 10 = custo
- O custo é exponencial: 2^10, 2^12, 2^14, etc

Na prática:

- Cost 10 → ok para apps simples
- Cost 12 → padrão moderno
- Cost 14+ → sistemas sensíveis

Quanto maior o custo:

- Mais seguro
- Mais lento
- Mais caro para o atacante

E o melhor: você pode aumentar o custo no futuro sem mudar o algoritmo.

## Por que BCrypt é lento (de propósito)

BCrypt foi desenhado para:

- Ser ruim em GPU
- Ser ruim em paralelização
- Custar caro em ataques de força bruta

Enquanto SHA-256:

- Milhões de hashes/segundo em GPU

BCrypt:

- Centenas (ou menos) por segundo

Isso muda totalmente o jogo para quem ataca.

## Verificação de senha (como funciona)

Você nunca descriptografa a senha.

Fluxo:

1. Usuário digita a senha
2. BCrypt usa:

- O salt
- O cost
- A senha digitada

3. Gera um novo hash
4. Compara com o hash armazenado

Simples, seguro e determinístico.

## BCrypt NÃO é criptografia

Ponto crítico:

- ❌ Não é reversível
- ❌ Não existe “descriptografar senha”
- ✅ É hash unidirecional

Se alguém pedir “descriptografar senha BCrypt”, a resposta técnica é: isso é impossível por design.

## Limitações reais do BCrypt (sem fanatismo)

BCrypt não é perfeito.

Limitações:

- Entrada efetiva limitada (~72 bytes)
- Mais lento que Argon2 em cenários modernos
- Não é memory-hard como Argon2

Ainda assim:

- Extremamente confiável
- Amplamente adotado
- Muito bem auditado
- Ótimo custo-benefício operacional

## BCrypt vs alternativas

| Algoritmo | Seguro       | Lento | Memory-Hard | Status         |
| --------- | ------------ | ----- | ----------- | -------------- |
| MD5       | ❌           | ❌    | ❌          | Morto          |
| SHA-256   | ❌ (sozinho) | ❌    | ❌          | Não usar       |
| BCrypt    | ✅           | ✅    | ❌          | Excelente      |
| Scrypt    | ✅           | ✅    | ✅          | Bom            |
| Argon2    | ✅           | ✅    | ✅          | Estado da arte |

Se puder usar Argon2, use.
Se não, BCrypt é totalmente aceitável.

## Regra prática (o que realmente importa)

Se você fizer isso, está seguro:

- BCrypt
- Cost ≥ 12
- TLS ativado
- Rate limit no login
- MFA quando possível

Qualquer coisa fora disso é conversa fiada.
