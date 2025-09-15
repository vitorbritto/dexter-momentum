import { useState, useEffect } from "react";

const PerformanceComparison = () => {
  const [renderCount, setRenderCount] = useState({
    unoptimized: 0,
    optimized: 0,
  });
  const [calculationCount, setCalculationCount] = useState({
    unoptimized: 0,
    optimized: 0,
  });
  const [startTime, setStartTime] = useState(null);
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // Simular coleta de dados de performance
    const interval = setInterval(() => {
      setPerformanceData((prev) => {
        const newData = {
          timestamp: new Date().toLocaleTimeString(),
          unoptimizedRenders:
            Math.floor(Math.random() * 10) + renderCount.unoptimized,
          optimizedRenders:
            Math.floor(Math.random() * 3) + renderCount.optimized,
          unoptimizedCalculations:
            Math.floor(Math.random() * 15) + calculationCount.unoptimized,
          optimizedCalculations:
            Math.floor(Math.random() * 5) + calculationCount.optimized,
        };

        return [...prev.slice(-9), newData]; // Manter apenas os últimos 10 registros
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [renderCount, calculationCount]);

  const runPerformanceTest = () => {
    setStartTime(Date.now());
    setRenderCount({ unoptimized: 0, optimized: 0 });
    setCalculationCount({ unoptimized: 0, optimized: 0 });

    // Simular operações que causariam re-renders
    let unoptimizedRenders = 0;
    let optimizedRenders = 0;
    let unoptimizedCalcs = 0;
    let optimizedCalcs = 0;

    for (let i = 0; i < 100; i++) {
      // Simular mudanças que causariam re-renders na versão não otimizada
      if (i % 3 === 0) {
        unoptimizedRenders += 1;
        unoptimizedCalcs += 3; // 3 cálculos por render
      }

      // Simular mudanças que causariam re-renders na versão otimizada
      if (i % 10 === 0) {
        optimizedRenders += 1;
        optimizedCalcs += 1; // 1 cálculo por render (memoizado)
      }
    }

    setRenderCount({
      unoptimized: unoptimizedRenders,
      optimized: optimizedRenders,
    });
    setCalculationCount({
      unoptimized: unoptimizedCalcs,
      optimized: optimizedCalcs,
    });
  };

  const getPerformanceGain = () => {
    if (renderCount.unoptimized === 0) return 0;
    return Math.round(
      ((renderCount.unoptimized - renderCount.optimized) /
        renderCount.unoptimized) *
        100
    );
  };

  const getCalculationGain = () => {
    if (calculationCount.unoptimized === 0) return 0;
    return Math.round(
      ((calculationCount.unoptimized - calculationCount.optimized) /
        calculationCount.unoptimized) *
        100
    );
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div className="demo-card" style={{ marginBottom: "30px" }}>
        <div className="demo-title">🔬 Análise de Performance</div>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <button
            onClick={runPerformanceTest}
            style={{
              padding: "15px 30px",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🚀 Executar Teste de Performance
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div className="performance-metrics">
            <h4>📊 Re-renders</h4>
            <div className="metric">
              <span>Sem otimizações:</span>
              <span className="metric-value" style={{ color: "#ef4444" }}>
                {renderCount.unoptimized}
              </span>
            </div>
            <div className="metric">
              <span>Com otimizações:</span>
              <span className="metric-value" style={{ color: "#10b981" }}>
                {renderCount.optimized}
              </span>
            </div>
            <div className="metric">
              <span>Redução:</span>
              <span className="metric-value" style={{ color: "#059669" }}>
                {getPerformanceGain()}%
              </span>
            </div>
          </div>

          <div className="performance-metrics">
            <h4>⚡ Cálculos</h4>
            <div className="metric">
              <span>Sem otimizações:</span>
              <span className="metric-value" style={{ color: "#ef4444" }}>
                {calculationCount.unoptimized}
              </span>
            </div>
            <div className="metric">
              <span>Com otimizações:</span>
              <span className="metric-value" style={{ color: "#10b981" }}>
                {calculationCount.optimized}
              </span>
            </div>
            <div className="metric">
              <span>Redução:</span>
              <span className="metric-value" style={{ color: "#059669" }}>
                {getCalculationGain()}%
              </span>
            </div>
          </div>
        </div>

        <div className="performance-metrics">
          <h4>📈 Dados em Tempo Real</h4>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f3f4f6" }}>
                  <th style={{ padding: "8px", border: "1px solid #d1d5db" }}>
                    Horário
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #d1d5db" }}>
                    Re-renders (Sem)
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #d1d5db" }}>
                    Re-renders (Com)
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #d1d5db" }}>
                    Cálculos (Sem)
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #d1d5db" }}>
                    Cálculos (Com)
                  </th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((data, index) => (
                  <tr key={index}>
                    <td style={{ padding: "8px", border: "1px solid #d1d5db" }}>
                      {data.timestamp}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        border: "1px solid #d1d5db",
                        color: "#ef4444",
                      }}
                    >
                      {data.unoptimizedRenders}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        border: "1px solid #d1d5db",
                        color: "#10b981",
                      }}
                    >
                      {data.optimizedRenders}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        border: "1px solid #d1d5db",
                        color: "#ef4444",
                      }}
                    >
                      {data.unoptimizedCalculations}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        border: "1px solid #d1d5db",
                        color: "#10b981",
                      }}
                    >
                      {data.optimizedCalculations}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="demo-card">
        <div className="demo-title">💡 Explicação dos Hooks de Performance</div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f0f9ff",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ color: "#0369a1", marginBottom: "10px" }}>useMemo</h3>
            <p style={{ color: "#0c4a6e", lineHeight: "1.5" }}>
              Memoriza o resultado de um cálculo e só recalcula quando as
              dependências mudam. Ideal para cálculos pesados que não precisam
              ser executados a cada render.
            </p>
          </div>

          <div
            style={{
              padding: "20px",
              backgroundColor: "#f0fdf4",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ color: "#166534", marginBottom: "10px" }}>
              useCallback
            </h3>
            <p style={{ color: "#14532d", lineHeight: "1.5" }}>
              Memoriza uma função e só cria uma nova quando as dependências
              mudam. Evita que componentes filhos re-renderizem
              desnecessariamente.
            </p>
          </div>

          <div
            style={{
              padding: "20px",
              backgroundColor: "#fef3c7",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ color: "#92400e", marginBottom: "10px" }}>memo</h3>
            <p style={{ color: "#78350f", lineHeight: "1.5" }}>
              Memoriza um componente e só re-renderiza quando suas props mudam.
              Funciona como um "PureComponent" para componentes funcionais.
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#fef2f2",
            borderRadius: "8px",
            borderLeft: "4px solid #ef4444",
          }}
        >
          <h4 style={{ color: "#991b1b", marginBottom: "10px" }}>
            ⚠️ Quando NÃO usar
          </h4>
          <ul style={{ color: "#7f1d1d", lineHeight: "1.6" }}>
            <li>
              Para cálculos simples que são mais rápidos que a própria
              memoização
            </li>
            <li>Quando as dependências mudam constantemente</li>
            <li>Em componentes que sempre precisam re-renderizar</li>
            <li>
              Para objetos/arrays que são recriados a cada render de qualquer
              forma
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PerformanceComparison;
