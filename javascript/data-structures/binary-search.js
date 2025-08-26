const candidates = Array.from({ length: 20 }, (_, i) => ({
  name: `Candidato ${i + 1}`,
  score: Math.floor(Math.random() * 100),
}));


function top3Binary(candidates) {
  const sorted = [...candidates].sort((a, b) => a.score - b.score);
  return sorted.slice(-3).reverse();
}

console.log("Todos:", candidates);

console.log("Top 3 (Binária via ordenação):", top3Binary(candidates));