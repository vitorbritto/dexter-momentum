import { useState } from "react";
import UnoptimizedCalculator from "./components/UnoptimizedCalculator";
import OptimizedCalculator from "./components/OptimizedCalculator";
import PerformanceComparison from "./components/PerformanceComparison";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("comparison");

  return (
    <div className="container">
      <div className="header">
        <h1>🚀 React Performance Demo</h1>
        <p>
          Comparação entre componentes com e sem otimizações (useMemo,
          useCallback, memo)
        </p>
      </div>

      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "comparison" ? "active" : ""}`}
          onClick={() => setActiveTab("comparison")}
        >
          📊 Comparação Lado a Lado
        </button>
        <button
          className={`tab-button ${
            activeTab === "unoptimized" ? "active" : ""
          }`}
          onClick={() => setActiveTab("unoptimized")}
        >
          🚫 Sem Otimizações
        </button>
        <button
          className={`tab-button ${activeTab === "optimized" ? "active" : ""}`}
          onClick={() => setActiveTab("optimized")}
        >
          ✅ Com Otimizações
        </button>
        <button
          className={`tab-button ${
            activeTab === "performance" ? "active" : ""
          }`}
          onClick={() => setActiveTab("performance")}
        >
          🔬 Análise de Performance
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "comparison" && (
          <div className="demo-section">
            <UnoptimizedCalculator />
            <OptimizedCalculator />
          </div>
        )}

        {activeTab === "unoptimized" && (
          <div className="single-demo">
            <UnoptimizedCalculator />
          </div>
        )}

        {activeTab === "optimized" && (
          <div className="single-demo">
            <OptimizedCalculator />
          </div>
        )}

        {activeTab === "performance" && <PerformanceComparison />}
      </div>

      <div className="instructions">
        <h2>📋 Como Testar a Performance</h2>
        <div className="instruction-grid">
          <div className="instruction-card">
            <h3>1. Abra o DevTools</h3>
            <p>
              Pressione F12 e vá para a aba Console para ver os logs de
              re-render
            </p>
          </div>
          <div className="instruction-card">
            <h3>2. Modifique os Valores</h3>
            <p>Altere os campos de entrada e observe a diferença nos logs</p>
          </div>
          <div className="instruction-card">
            <h3>3. Compare os Comportamentos</h3>
            <p>Veja como a versão otimizada evita cálculos desnecessários</p>
          </div>
          <div className="instruction-card">
            <h3>4. Use o Profiler</h3>
            <p>No React DevTools, use o Profiler para medir performance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
