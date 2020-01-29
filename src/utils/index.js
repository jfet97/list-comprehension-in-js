// [ list[start], list[start+nOfElements] )
function take(listIterable = [], nOfElements = 0, start = 0) {
  if (typeof start != "number" || typeof nOfElements != "number") {
    throw TypeError(
      "The 'start' and the 'nOfElements' actual parameters must be numbers"
    );
  }

  const resultingList = [];

  if (start >= 0 && nOfElements > 0) {
    let index = 0;

    for (const v of listIterable) {
      if (index == start + nOfElements) {
        break;
      }

      if (index >= start) {
        resultingList.push(v);
      }

      index++;
    }
  }

  return resultingList;
}

export { take };
