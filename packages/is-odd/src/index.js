import isEven from "@yicchi/is-even";

export const isOdd = (n) => !isEven(n);

console.log(isOdd(1));
