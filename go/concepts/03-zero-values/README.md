# Zero Values

Casos em que não se deve confiar no zero value em Go:

- Quando o struct representa um estado inválido por padrão
  - Ex.: conexão aberta, transação ativa, recurso alocado. Se "vazio" não faz sentido, zero value é enganoso.
- Quando campos são obrigatórios para o contrato
  - Ex.: User{ID string} onde ID nunca pode ser vazio. O zero value quebra a invariável.
- Quando há dependências internas que precisam estar inicializadas
  - Ex.: map, slice ou channel que sempre devem existir para uso imediato.
- Quando o tipo precisa garantir invariantes de negócio
  - Ex.: valores mínimos/máximos, combinações válidas de campos, estados consistentes.
- Quando nil e "zero" têm significados diferentes
  - Ex.: distinguir "não informado" de "informado como zero".
- Quando o struct encapsula recursos externos
  - Ex.: arquivos, conexões de banco, sockets, locks. Zero value não representa um recurso válido.
- Quando o tipo será usado como API pública
  - Se usuários externos podem instanciar o tipo errado, é melhor forçar um construtor.

### Regra prática

Se você precisa checar vários campos antes de usar o struct, o zero value provavelmente não é um bom default.
