function isFunction(fn) {
  if (typeof fn != "function") {
    return false;
  }
  return true;
}

class Comprehension {
  constructor(output = () => {}, ranges = [], predicates = []) {
    if (!isFunction(output)) {
      throw TypeError("The 'output' actual parameter must be a function");
    }

    if (!ranges.every(isFunction) || !predicates.every(isFunction)) {
      throw TypeError(
        "The 'ranges' and the 'predicates' actual parameters must be functions arrays"
      );
    }

    // a function that specifies how we want the elements to be reflected in the resulting list
    this._output = output;
    // array of functions that provides custom ranges
    this._ranges = ranges;
    // array of predicates to filter out unwanted values
    this._predicates = predicates;
  }

  *[Symbol.iterator]() {
    yield* this._actualEval(this._ranges, []);
  }

  *_actualEval([fn, ...restOfFns], values) {
    // The functions inside 'this.ranges' array will provide all the ranges needed for the list comprehension.
    // Functions were used to be able to reuse one or more
    // of the previous ranges' current values as upper/lower limit.
    // Ranges are lazy, so we are able to handle infinite ones. Generators are used under the hood.
    // For example:
    // let newC = new Comprehension(
    //     (i, c1, c2) => ({ i, c1, c2 }),
    //     [
    //         () => range(1, 10),
    //         (i) => range(1, i - 1),
    //         (_, c1) => range(1, c1)
    //     ],
    //     [
    //         (i, c1, c2) => (i ** 2 == c1 ** 2 + c2 ** 2),
    //         (i, c1, c2) => (i + c1 + c2 == 24),
    //     ]
    // )
    // This list comprehension will output all the triangles that fit some conditions.
    // The interesting point is the possibility to limit, for example, the upper value of a cathetus to
    // the current value of the hypotenuse - 1, because there are no triangles where the hypotenuse
    // isn't the longest side
    //
    // This means that there is a precedence between the ranges.
    // Like nested for-loops: the outer is the first range and the inner is the last range.
    // The following is the corresponding code written using nested for-loops to visualize what's happening:
    // for (let i = 1; i <= 10; i++) {
    //     for (let c1 = 1; c1 <= i - 1; c1++) {
    //         for (let c2 = 1; c2 <= c1; c2++) {
    //             // use the values
    //         }
    //     }
    // }

    // To achieve this goal we have to extract each function, following the precedence (so the one on the left),
    // and we call it to get its range generator.
    // Inside the 'values' array we have the previous obtained values, from previous range functions.
    // There is one value for each previous range function at a time. Remember the analogy with for-loops.
    let currListIterator = fn(...values);

    if (restOfFns.length != 0) {
      // For each obtained value from the call to 'fn' we have to recursively call all the other functions
      // passing each value at time, so that the other range functions will be able to use them.
      // Moreover, at the current step, some previous functions could have passed one of their values,
      // so we need to append the current ones, one at time, to the already present values, respecting the order
      // (therefore the precedence).

      // Obviously this must happen if there are other range functions after the current one.

      for (const val of currListIterator) {
        // recursively delegate to support lazy evaluation
        yield* this._actualEval(restOfFns, [...values, val]);
      }
    } else {
      // If the current range function is the last, it means we are inside the body of inner for-loop,
      // with one of the many instances of possible outer values into the 'values' array.
      // So we have to use them, with any value produced by the current range function (the one corresponding to
      // the inner for-loop), one by one.

      for (const val of currListIterator) {
        // Before calling the output function, the one that map one instance of the values
        // to one entity in the resulting list, we have to filter out those instances that
        // do not pass the conditions (predicates).
        // It is obvious that every predicate must have access to every value inside the current instances
        // of them; in order just like before.
        if (
          this._predicates.every(predicate => predicate(...[...values, val]))
        ) {
          yield this._output(...[...values, val]);
        }
      }
    }
  }
}

export { Comprehension };
