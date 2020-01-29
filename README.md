# List Comprehension in JS

## Install

```sh
npm i list-comprehension-in-js
```

&nbsp;

## The What

It is a common pattern in functional programming, to the point that some programming languages like Haskell, Clojure, Perl, Python and others do support it directly with syntactic constructs. It allow us to express the _set builder-notation_ into our code.

Let's take an example: `S = { 2*x | x € N, x^2 > 100 }`, where we are saying "take all the natural number which square is greater than `100`, double them and use these results to create a new set". The resulting set will be: `{ 22, 24, 26, ... }`.

&nbsp;

## The Why

It reflects the idea of ​​having a set of candidates as solutions to a problem, on which transformations and filtering are applied to narrow the number of them, until right solutions are obtained.

&nbsp;

## The How

Let's take Haskell as example. The following is the way we can express the previous set comprehension:

```hs
[ 2*x | x <- [1..], x^2 > 100 ]
```

Pretty terse notation, huh? The output will be an infinite, lazy list containing (potentially) all the elements of our set.

Let's take another example. We want to generate all the right triangle that have an even perimeter. This is the Haskell way:

```hs
list = [
    {-
        The single element of the resulting list is a triple
        containing the values of the ipothenuse and the two cathets
    -}
    (ipo, cat1, cat2) |

    -- Three ranges for three variables
    ipo <- [1..],
    cat1 <- [1..ipo-1],
    cat2 <-[1..cat1],

    -- Two predicates to satisfy
    ipo^2 == cat1^2 + cat2^2,
    mod (ipo + cat1 + cat2) 2 == 0 ]
```

Ranges optimizations apart, it's worth noting that:

* it is possible to have multiple ranges and variables into play
* it is possible to use the current value taken by a previous defined variable as upper/ lower limit for a following range
* it is possible to have more predicates to satisfy
* the output element expression is custom

&nbsp;

## The How in JavaScript

This library is a custom solution to achieve all of this great possibilities in JS!\
It is based on [`ES6` generators](https://dev.to/jfet97/javascript-iterators-and-generators-synchronous-generators-3ai4), to achieve the infinite, lazy approach:\
```js
const { Comprehension, range } = require("list-comprehension-in-js");

let allRightTrianglesWithEvenPerimeter = new Comprehension(
    // custom output
    (ipo, cat1, cat2) => ({ ipo, cat1, cat2 }),
    [
        // ranges
        () => range(1, Infinity),
        (ipo) => range(1, ipo - 1),
        (_, cat1) => range(1, cat1)
    ],
    [
        // predicates to satisfy
        (ipo, cat1, cat2) => (ipo ** 2 == cat1 ** 2 + cat2 ** 2),
        (ipo, cat1, cat2) => ((ipo + cat1 + cat2) % 2 == 0),
    ]
);
```

Where `range` is nothing more than a generator function that provides an [iterable](https://dev.to/jfet97/javascript-iterators-and-generators-synchronous-iterators-141d) of integer numbers and the `allRightTrianglesWithEvenPerimeter` is itself an iterable too!\
So the library perfectly fits in the JavaScript ecosystem.

There is also an utility to extract a finite part of the infinite list, putting the elements into an array:
```js
const { take } = require("list-comprehension-in-js");

const finiteList = take(allRightTrianglesWithEvenPerimeter, 5, 10);

for (const triangle of finiteList) {
    console.log(`hyp: ${triangle.ipo}, c1: ${triangle.cat1}, c2: ${triangle.cat2}`);
}
/*
{hyp: 30, c1: 24, c2: 18}
{hyp: 34, c1: 30, c2: 16}
{hyp: 35, c1: 28, c2: 21}
{hyp: 37, c1: 35, c2: 12}
{hyp: 39, c1: 36, c2: 15}
*/
```

&nbsp;

## Utilities API

### range
Create an iterable which will output a set of **increasing** numbers (`start` must be `<=` than `end`):
```js
function* range(start, end, step = v => v) {
    // ...
}
```
* **start**: the integer value from which start to generate the numbers
* **end**: the last integer value to take
* **step**: a mapper function to eventually transform each produced value

### rangeReversed
Create an iterable which will output a set of **decreasing** numbers (`start` must be `>=` than `end`):
```js
function* rangeReversed(start, end, step = v => v) {
    // ...
}
```
* **start**: the integer value from which start to generate the numbers
* **end**: the last integer value to take
* **step**: a mapper function to eventually transform each produced value

### take
Take at most `nOfElements` starting from the index `start`.\
It returns an array containing the elements.
```js
function take(listIterable = [], nOfElements = 0, start = 0) {
    // ...
}
```

* **listIterable**: any iterable, like the one returned by the `Comprehension` constructor
* **nOfElements**: number of elements to pick
* **start**: starting index

