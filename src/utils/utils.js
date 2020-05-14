export const getCountLabel = (value, oneLabel, twoLabel, fiveLabel) => {
  const digits = value.toString().split("");
  const lastDigit = digits.pop();
  const firstDigit = digits.shift();
  if (lastDigit === "1" && firstDigit !== "1") {
    return `${value} ${oneLabel}`;
  }
  if (["2", "3", "4"].some((day) => lastDigit === day) && firstDigit !== "1") {
    return `${value} ${twoLabel}`;
  }
  return `${value} ${fiveLabel}`;
};
