| Princípio | Pergunta                                      | Foco                      | Mitigação                                        | Sintoma                                                |
| --------- | --------------------------------------------- | ------------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| YAGNI     | “Isso é realmente necessário agora?”          | Escopo e timing           | Overengineering por antecipação                  | Código “preparado para o futuro” que nunca chega       |
| KISS      | “Existe um jeito mais simples de fazer isso?” | Complexidade              | Soluções elegantes demais para problemas simples | Muitas camadas, conceitos e arquivos para pouca lógica |
| POLA      | “Isso se comporta como eu espero?”            | Previsibilidade cognitiva | Surpresas e pegadinhas no comportamento          | Funções que fazem mais (ou menos) do que o nome sugere |

## Como eles se complementam (regra de ouro)

- YAGNI decide se você deve fazer
- KISS decide como você deve fazer
- POLA decide como isso será entendido

## Se você violar qualquer um, o custo aparece:

- YAGNI → código morto e complexidade latente
- KISS → manutenção cara e lenta
- POLA → bugs humanos (os piores)
