const candidates = Array.from({ length: 20 }, (_, i) => ({
  name: `Candidato ${i + 1}`,
  score: Math.floor(Math.random() * 100),
}));


function top3Linear(candidates) {
  let s1 = -Infinity, 
      s2 = -Infinity,
      s3 = -Infinity;
  let c1 = null,
      c2 = null,
      c3 = null;

  for (const cand of candidates) {
    const s = cand.score;

    if (s > s1) {            // entra no 1º lugar
      s3 = s2; c3 = c2;
      s2 = s1; c2 = c1;
      s1 = s;  c1 = cand;
    } else if (s > s2) {     // entra no 2º lugar
      s3 = s2; c3 = c2;
      s2 = s;  c2 = cand;
    } else if (s > s3) {     // entra no 3º lugar
      s3 = s;  c3 = cand;
    }
  }

  return [c1, c2, c3]; // do maior pro menor
}

console.log("Todos:", candidates);

console.log("Top 3 (Linear):", top3Linear(candidates));