function* rangeGenerator(start = 0, end = 0, step = v => v) {
  if (start < end) {
    for (let i = start; i <= end; i++) {
      yield (step && step(i)) || i;
    }
  } else {
    for (let i = start; i >= end; i--) {
      yield (step && step(i)) || i;
    }
  }
}

function* range(start, end, step = v => v) {
  if (typeof start !== "number" || typeof end !== "number") {
    throw TypeError(
      "The 'start' and the 'end' actual parameters must be numbers"
    );
  }

  if (start <= end) {
    yield* rangeGenerator(start, end, step);
  }
}

function* rangeReversed(start, end, step = v => v) {
  if (typeof start !== "number" || typeof end !== "number") {
    throw TypeError(
      "The 'start' and the 'end' actual parameters must be numbers"
    );
  }

  if (start >= end) {
    yield* rangeGenerator(start, end, step);
  }
}

export { range, rangeReversed };
