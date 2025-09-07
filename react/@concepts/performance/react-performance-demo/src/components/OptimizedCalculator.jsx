import { useState, useMemo, useCallback, memo } from "react";

// Componente filho COM memo - só re-renderiza quando props mudam
const ExpensiveChild = memo(({ data, onUpdate }) => {
  console.log(
    "✅ ExpensiveChild (COM memo) - Re-renderizando apenas quando necessário!"
  );

  // Simulação de cálculo pesado
  const expensiveCalculation = () => {
    console.log("⚡ Executando cálculo pesado (COM useMemo)...");
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result.toFixed(2);
  };

  // COM useMemo - só executa quando data muda
  const calculatedValue = useMemo(() => {
    return expensiveCalculation();
  }, [data]);

  return (
    <div
      style={{
        padding: "15px",
        backgroundColor: "#f0fdf4",
        borderRadius: "8px",
        border: "2px solid #86efac",
      }}
    >
      <h4>Componente Filho (COM memo)</h4>
      <p>Valor calculado: {calculatedValue}</p>
      <p>Dados recebidos: {JSON.stringify(data)}</p>
      <button onClick={() => onUpdate("Novo valor")}>
        Atualizar (COM useCallback)
      </button>
    </div>
  );
});

// Componente principal COM otimizações
const OptimizedCalculator = () => {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(2);
  const [counter, setCounter] = useState(0);

  console.log("✅ OptimizedCalculator - Re-renderizando!");

  // COM useMemo - só recalcula quando dependências mudam
  const totalAmount = useMemo(() => {
    console.log("⚡ Recalculando total (COM useMemo)...");
    const interestRate = rate / 100;
    return (principal * Math.pow(1 + interestRate, years)).toFixed(2);
  }, [principal, rate, years]);

  // COM useMemo - só cria novo array quando dependências mudam
  const dataArray = useMemo(() => {
    console.log("⚡ Criando novo array (COM useMemo)...");
    return [principal, rate, years, counter];
  }, [principal, rate, years, counter]);

  // COM useCallback - só cria nova função quando dependências mudam
  const handleUpdate = useCallback((value) => {
    console.log("⚡ Executando callback (COM useCallback)...");
    setCounter((prev) => prev + 1);
  }, []);

  // COM useMemo - cálculo adicional para demonstrar otimização
  const monthlyPayment = useMemo(() => {
    console.log("⚡ Calculando pagamento mensal (COM useMemo)...");
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;
    if (monthlyRate === 0) return (principal / totalMonths).toFixed(2);

    const payment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    return payment.toFixed(2);
  }, [principal, rate, years]);

  // COM useMemo - estatísticas calculadas apenas quando necessário
  const statistics = useMemo(() => {
    console.log("⚡ Calculando estatísticas (COM useMemo)...");
    const totalInterest = (parseFloat(totalAmount) - principal).toFixed(2);
    const interestPercentage = (
      (parseFloat(totalInterest) / principal) *
      100
    ).toFixed(2);

    return {
      totalInterest,
      interestPercentage,
      totalMonths: years * 12,
    };
  }, [totalAmount, principal, years]);

  return (
    <div className="demo-card optimized">
      <div className="demo-title">
        ✅ Versão COM Otimizações
        <span className="status-badge status-optimized">OTIMIZADO</span>
      </div>

      <div className="controls">
        <div className="control-group">
          <label>Valor do Empréstimo (R$):</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="control-group">
          <label>Taxa de Juros (% ao ano):</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="control-group">
          <label>Duração (anos):</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="control-group">
          <label>Contador (para forçar re-renders):</label>
          <input
            type="number"
            value={counter}
            onChange={(e) => setCounter(parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="results">
        <h3>Resultados</h3>
        <div className="result-item">
          <span>Valor total a pagar:</span>
          <span className="result-value">R$ {totalAmount}</span>
        </div>
        <div className="result-item">
          <span>Pagamento mensal:</span>
          <span className="result-value">R$ {monthlyPayment}</span>
        </div>
        <div className="result-item">
          <span>Total de juros:</span>
          <span className="result-value">R$ {statistics.totalInterest}</span>
        </div>
        <div className="result-item">
          <span>% de juros:</span>
          <span className="result-value">{statistics.interestPercentage}%</span>
        </div>
        <div className="result-item">
          <span>Contador:</span>
          <span className="result-value">{counter}</span>
        </div>
      </div>

      <ExpensiveChild data={dataArray} onUpdate={handleUpdate} />

      <div className="console-output">
        <div className="console-line">📊 Console Output:</div>
        <div className="console-line render">✅ Re-renders otimizados</div>
        <div className="console-line calculation">
          ⚡ Cálculos executados apenas quando necessário
        </div>
        <div className="console-line">
          💡 Abra o DevTools para ver os logs detalhados
        </div>
      </div>

      <div className="performance-metrics">
        <h4>🚀 Benefícios de Performance</h4>
        <div className="metric">
          <span>Re-renders desnecessários:</span>
          <span className="metric-value">Eliminados</span>
        </div>
        <div className="metric">
          <span>Cálculos repetidos:</span>
          <span className="metric-value">Evitados</span>
        </div>
        <div className="metric">
          <span>Funções recriadas:</span>
          <span className="metric-value">Memoizadas</span>
        </div>
      </div>
    </div>
  );
};

export default OptimizedCalculator;
