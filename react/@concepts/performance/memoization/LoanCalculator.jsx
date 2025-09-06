import { useState, useMemo } from "react";

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState(10000); // valor inicial R$
  const [rate, setRate] = useState(5); // taxa % ao ano
  const [years, setYears] = useState(2); // duração em anos

  // 🧮 Cálculo do montante com juros compostos
  const totalAmount = useMemo(() => {
    console.log("Recalculando total...");
    const interestRate = rate / 100;
    return (principal * Math.pow(1 + interestRate, years)).toFixed(2);
  }, [principal, rate, years]);

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>Calculadora de Empréstimo</h1>

      <div>
        <label>
          Valor do Empréstimo (R$):
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
          />
        </label>
      </div>

      <div>
        <label>
          Taxa de Juros (% ao ano):
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
          />
        </label>
      </div>

      <div>
        <label>
          Duração (anos):
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(parseInt(e.target.value) || 0)}
          />
        </label>
      </div>

      <h2>
        Valor total a pagar após {years} anos: <br />
        <strong>R$ {totalAmount}</strong>
      </h2>
    </div>
  );
};

export default LoanCalculator;
