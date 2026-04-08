# 100 Go Mistakes – Cheatsheet (PT / EN)

## Code & Project Organization

### 1 Variable Shadowing

- PT: redeclarar variável interna oculta a externa.
- EN: inner variable hides outer variable.

```go
err := doA()
if true {
  err := doB() // shadow
}
```

### 2 Nested Code

- PT: evitar muitos níveis de if.
- EN: avoid deep nesting.

```go
if err != nil {
return err
}
// happy path
```

### 3 Misusing init()

- PT: init dificulta testes e controle.
- EN: init complicates testing.

```go
func init() {
  db = connect()
}
```

### 4 Overusing Getters/Setters

- PT: Go permite acessar struct direto.
- EN: direct struct access is idiomatic.

```go
type User struct {
  Name string
}
```

### 5 Interface Pollution

- PT: não criar interface sem necessidade.
- EN: don’t create premature interfaces.

```go
type Service interface {
  Run()
}
```

### 6 Interface on Producer

- PT: interface geralmente fica no consumidor.
- EN: interfaces should live on consumer side.

### 7 Returning Interfaces

- PT: retornar concreto, aceitar interface.
- EN: return concrete types.

```go
func New() *Service {}
```

### 8 any Says Nothing

- PT: `any` remove segurança de tipo.
- EN: any loses type safety.

```go
func Print(v any)
```

### 9 Generics Confusion

- PT: usar _generics_ apenas quando necessário.
- EN: avoid premature generics.

### 10 Type Embedding Problems

- PT: _embedding_ pode expor dados sem querer.
- EN: embedding can leak fields.

```go
type A struct {
  B
}
```

### 11 Functional Options

- PT: padrão idiomático para configuração.
- EN: common configuration pattern.

```go
func New(opts ...Option)
```

### 12 Project Misorganization

- PT: estrutura inconsistente.
- EN: inconsistent project layout.

```go
project/
 ├── cmd/
 ├── internal/
 ├── pkg/
 └── main.go
```

### 13 Utility Packages

- PT: evitar util, common.
- EN: avoid meaningless packages.

### 14 Package Name Collision

- PT: variável com nome igual ao pacote.
- EN: variable collides with package.

```go
json := "value"
```

### 15 Missing Documentation

- PT: export precisa de comentário.
- EN: exported items must be documented.

```go
// User represents a system user.
type User struct{}
```

### 16 Not Using Linters

- PT: usar golangci-lint.
- EN: always lint Go code.

```go
golangci-lint run
```

## Data Types

### 17 Octal Confusion

- PT: números com 0 são octais.
- EN: leading 0 means octal.

```go
x := 010 // 8
```

### 18 Integer Overflow

- PT: overflow não gera panic.
- EN: overflow is silent.

```go
var x uint8 = 255
x++
```

### 19 Floating Point Precision

- PT: float não é exato.
- EN: floating point is approximate.

```go
fmt.Println(0.1 + 0.2)
```

### 20 Slice Len vs Cap

- PT: len ≠ cap.
- EN: length ≠ capacity.

```go
s := make([]int, 0, 10)
```

### 21 Inefficient Slice Init

- PT: pré-alocar slices.
- EN: preallocate slices.

```go
s := make([]int, 0, 100)
```

### 22 Nil vs Empty Slice

- PT: nil slice ≠ empty slice.
- EN: nil vs empty difference.

```go
var s []int
```

### 23 Checking Empty Slice

- PT: verificar len(s)==0.
- EN: check length.

```go
if len(s) == 0 {}
```

### 24 Slice Copy

- PT: usar copy.
- EN: use copy.

```go
copy(dst, src)
```

### 25 Append Side Effects

- PT: slices compartilham backing array.
- EN: append may mutate shared array.

### 26 Slice Memory Leak

- PT: slicing mantém array grande.
- EN: slicing keeps backing array.

### 27 Map Initialization

- PT: pré-definir tamanho.
- EN: preallocate maps.

```go
m := make(map[string]int, 100)
```

### 28 Map Memory Leak

- PT: map cresce mas não diminui.
- EN: maps never shrink.

```go
m := make(map[string]int, 100)
```

### 29 Comparing Values

- PT: slices não são comparáveis.
- EN: slices cannot be compared.

```go
reflect.DeepEqual(a,b)
```

## Control Structures

### 30 Range Copy

- PT: range retorna cópia.
- EN: range value is copy.

```go
for \_, v := range s {}
```

### 31 Range Evaluation

- PT: expressão range avaliada uma vez.
- EN: range evaluated once.

### 32 Pointer in Range

- PT: cuidado com ponteiros em loop.
- EN: pointer reuse issue.

### 33 Map Iteration Order

- PT: ordem não garantida.
- EN: map iteration unordered.

### 34 Break Behavior

- PT: break quebra switch interno.
- EN: break affects nearest block.

### 35 Defer in Loop

- PT: defer executa no fim da função.
- EN: defer executes at function end.

## Strings

### 36 Rune Concept

- PT: rune = code point Unicode.
- EN: rune = Unicode code point.

### 37 String Iteration

- PT: len mede bytes.
- EN: len returns bytes.

### 38 Trim Misuse

- PT: Trim remove caracteres, não substring.
- EN: Trim removes runes set.

### 39 String Concatenation

- PT: usar strings.Builder.
- EN: prefer strings.Builder.

var b strings.Builder

### 40 String Conversion

- PT: evitar string ↔ []byte desnecessário.
- EN: avoid conversions.

### 41 Substring Memory Leak

- PT: substring mantém array original.
- EN: substring shares memory.

## Functions & Methods

### 42 Receiver Type

- PT: usar pointer quando muta.
- EN: pointer receivers for mutation.

### 43 Named Return

- PT: melhora legibilidade em alguns casos.
- EN: named results sometimes useful.

### 44 Named Return Side Effects

- PT: zero value pode gerar bugs.
- EN: zero values may hide bugs.

### 45 Nil Receiver

- PT: interface pode não ser nil.
- EN: nil interface trap.

### 46 Filename Input

- PT: preferir io.Reader.
- EN: prefer io.Reader.

### 47 Defer Evaluation

- PT: argumentos avaliados imediatamente.
- EN: defer args evaluated early.

## Error Management

### 48 Panic Overuse

- PT: usar panic apenas em erro fatal.
- EN: panic only for unrecoverable.

### 49 Error Wrapping

- PT: usar %w.
- EN: wrap errors.

fmt.Errorf("failed: %w", err)

### 50 Error Type Comparison

- PT: usar errors.As.
- EN: use errors.As.

### 51 Error Value Comparison

- PT: usar errors.Is.
- EN: use errors.Is.

### 52 Handling Error Twice

- PT: logar OU retornar.
- EN: handle once.

### 53 Ignoring Error

- PT: ignorar explicitamente \_.
- EN: use blank identifier.

### 54 Defer Errors

- PT: tratar erros de defer.
- EN: check deferred errors.

## Concurrency (Foundation)

### 55 Concurrency vs Parallelism

- PT: concorrência ≠ paralelismo.
- EN: concurrency ≠ parallelism.

### 56 Concurrency Always Faster

- PT: às vezes sequencial é melhor.
- EN: concurrency not always faster.

### 57 Channels vs Mutex

- PT: coordenação vs sincronização.
- EN: coordination vs synchronization.

### 58 Data Race vs Race Condition

- PT: acesso simultâneo à memória.
- EN: concurrent memory access.

### 59 Workload Type

- PT: CPU vs IO bound.
- EN: CPU vs IO workloads.

### 60 Context

- PT: cancelamento e deadlines.
- EN: cancellation and deadlines.

## Concurrency (Practice)

### 61 Context Propagation

- PT: contexto pode ser cancelado cedo.
- EN: context may cancel early.

### 62 Goroutine Leaks

- PT: sempre saber quando parar.
- EN: know when goroutine stops.

### 63 Loop Variable Capture

- PT: variável compartilhada no loop.
- EN: closure capture bug.

### 64 Select Randomness

- PT: select escolhe aleatoriamente.
- EN: select is random.

```go
select {
case <-ch:
  fmt.Println("Received from channel")
case <-time.After(1 * time.Second):
  fmt.Println("Timeout")
default:
  fmt.Println("Default")
}
```

### 65 Notification Channels

- PT: usar `chan struct{}`.
- EN: signal channels.

```go
ch := make(chan struct{})
```

### 66 Nil Channels

- PT: nil channel bloqueia.
- EN: nil channels block forever.

### 67 Channel Size

- PT: tamanho influencia sincronização.
- EN: buffer affects behavior.

### 68 String Formatting Side Effects

- PT: fmt pode chamar métodos.
- EN: fmt triggers methods.

### 69 Append Data Race

- PT: append concorrente pode causar race.
- EN: append may race.

### 70 Mutex with Maps

- PT: map é ponteiro interno.
- EN: map is reference type.

### 71 WaitGroup Misuse

- PT: chamar Add antes da goroutine.
- EN: Add before goroutine.

```go
wg := sync.WaitGroup{}
wg.Add(1)
go func() {
  defer wg.Done()
}()
wg.Wait()
```

### 72 sync.Cond

- PT: útil para notificações múltiplas.
- EN: condition signaling.

### 73 errgroup

- PT: coordena goroutines + erro.
- EN: goroutine group with error.

### 74 Copying sync Types

- PT: mutex não pode ser copiado.
- EN: sync types must not copy.

## Standard Library

### 75 Wrong time.Duration

- PT: unidade é nanosegundo.
- EN: duration = nanoseconds.

### 76 time.After Leak

- PT: cuidado com loops.
- EN: may leak timers.

### 77 JSON Mistakes

- PT: tipos podem mudar no decode.
- EN: JSON numbers → float64.

### 78 SQL Mistakes

- PT: usar prepared statements.
- EN: use prepared statements.

### 79 Not Closing Resources

- PT: fechar recursos.
- EN: always close.

defer resp.Body.Close()

### 80 HTTP Handler Return

- PT: retornar após erro.
- EN: return after http.Error.

### 81 Default HTTP Client

- PT: sem timeout.
- EN: missing timeouts.

## Testing

### 82 Test Categories

- PT: separar unit/integration.
- EN: categorize tests.

### 83 Race Flag

- PT: usar -race.
- EN: detect races.

### 84 Parallel Tests

- PT: usar t.Parallel().
- EN: parallel tests.

### 85 Table Driven Tests

- PT: padrão comum.
- EN: table driven tests.

### 86 Sleeping Tests

- PT: evitar time.Sleep.
- EN: avoid sleeps.

### 87 Time in Tests

- PT: controlar tempo.
- EN: mock time.

### 88 Testing Utilities

- PT: usar httptest.
- EN: use testing helpers.

### 89 Benchmark Errors

- PT: benchmark mal configurado.
- EN: inaccurate benchmarks.

### 90 Testing Features

- PT: usar coverage e tools.
- EN: use Go testing features.

## Optimization

### 91 CPU Cache

- PT: acesso sequencial é mais rápido.
- EN: cache locality matters.

### 92 False Sharing

- PT: goroutines competem por cache line.
- EN: cache contention.

### 93 Instruction Parallelism

- PT: CPU executa instruções paralelas.
- EN: instruction pipelining.

### 94 Data Alignment

- PT: ordenar campos da struct.
- EN: struct alignment.

### 95 Stack vs Heap

- PT: stack é mais rápido.
- EN: stack allocation faster.

### 96 Reduce Allocations

- PT: menos GC.
- EN: reduce allocations.

### 97 Inlining

- PT: funções pequenas são inline.
- EN: compiler inlining.

### 98 Diagnostics Tools

- PT: usar pprof e trace.
- EN: use profiling.

### 99 GC Understanding

- PT: GC afeta performance.
- EN: understand garbage collector.

### 100 Go in Containers

- PT: recursos do container afetam runtime.
- EN: container limits affect Go runtime.
