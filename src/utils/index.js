export function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

export function countRemainings(arr, ...values) {
  let count = {};
  for (const k of values) {
    count[k] = 9;
    for (const i of arr) {
      for (const j of i) {
        if (j == k) count[k] = count[k] - 1;
      }
    }
  }
  return count;
}
