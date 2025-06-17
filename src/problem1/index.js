const sum_to_n_a = (n) => {
  return (n * (n + 1)) / 2;
};



const sum_to_n_b = (n) => {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
};


const sum_to_n_c = (n) => {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};