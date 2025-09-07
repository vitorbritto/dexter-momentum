import { useState } from "react";

// Componente filho SEM memo - sempre re-renderiza quando o pai re-renderiza
const ExpensiveChild = ({ data, onUpdate }) => {
  console.log("🔄 ExpensiveChild (SEM memo) - Re-renderizando!");

  // Simulação de cálculo pesado
  const expensiveCalculation = () => {
    console.log("⚡ Executando cálculo pesado (SEM useMemo)...");
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result.toFixed(2);
  };

  // SEM useMemo - sempre executa o cálculo
  const calculatedValue = expensiveCalculation();

  return (
    <div
      style={{
        padding: "15px",
        backgroundColor: "#fef2f2",
        borderRadius: "8px",
        border: "2px solid #fca5a5",
      }}
    >
      <h4>Componente Filho (SEM memo)</h4>
      <p>Valor calculado: {calculatedValue}</p>
      <p>Dados recebidos: {JSON.stringify(data)}</p>
      <button onClick={() => onUpdate("Novo valor")}>
        Atualizar (SEM useCallback)
      </button>
    </div>
  );
};

// Componente principal SEM otimizações
const UnoptimizedCalculator = () => {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(2);
  const [counter, setCounter] = useState(0);

  console.log("🔄 UnoptimizedCalculator - Re-renderizando!");

  // SEM useMemo - sempre recalcula
  const calculateTotal = () => {
    console.log("⚡ Recalculando total (SEM useMemo)...");
    const interestRate = rate / 100;
    return (principal * Math.pow(1 + interestRate, years)).toFixed(2);
  };

  const totalAmount = calculateTotal();

  // SEM useMemo - sempre cria novo array
  const createDataArray = () => {
    console.log("⚡ Criando novo array (SEM useMemo)...");
    return [principal, rate, years, counter];
  };

  const dataArray = createDataArray();

  // SEM useCallback - sempre cria nova função
  const handleUpdate = (value) => {
    console.log("⚡ Executando callback (SEM useCallback)...");
    setCounter((prev) => prev + 1);
  };

  return (
    <div className="demo-card unoptimized">
      <div className="demo-title">
        🚫 Versão SEM Otimizações
        <span className="status-badge status-unoptimized">NÃO OTIMIZADO</span>
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
          <span>Contador:</span>
          <span className="result-value">{counter}</span>
        </div>
      </div>

      <ExpensiveChild data={dataArray} onUpdate={handleUpdate} />

      <div className="console-output">
        <div className="console-line">📊 Console Output:</div>
        <div className="console-line render">
          🔄 Re-renders acontecendo a cada mudança
        </div>
        <div className="console-line calculation">
          ⚡ Cálculos executados desnecessariamente
        </div>
        <div className="console-line">
          💡 Abra o DevTools para ver os logs detalhados
        </div>
      </div>

      <div className="performance-metrics">
        <h4>⚠️ Problemas de Performance</h4>
        <div className="metric">
          <span>Re-renders desnecessários:</span>
          <span className="metric-value">Muitos</span>
        </div>
        <div className="metric">
          <span>Cálculos repetidos:</span>
          <span className="metric-value">Sempre</span>
        </div>
        <div className="metric">
          <span>Funções recriadas:</span>
          <span className="metric-value">A cada render</span>
        </div>
      </div>
    </div>
  );
};

export default UnoptimizedCalculator;
