/**
Inspired by: https://ponyfoo.com/articles/understanding-javascript-async-await

// If you have `async` function support:
async function asyncFunction(a, b, c) {
  // example function body
}

// With only promises and generators:
function asyncFunction(a, b, c) {
  return spawn(function* () {
    // example function body
  }, this);
}
*/

function asyncFunction(a, b, c) {
  return asyncRunner(function* () {
    /*
    // Example function body...
    yield 1;
    yield 2;
    return 3;
    */
  }, this);
}

// Executes a generator function while allowing for asynchronous "pauses" when the generator yields
// Takes a generator function, `genFunc` and `context` and calls that function (with `context` as its context)
// It then takes the iterator and, for each value, 
function asyncRunner(genFunc, context) {
  return new Promise(function(resolve, reject) {
    var iterator = genFunc.call(context);

    step(() => iterator.next(undefined));

    function step(draw) {
      var next;

      try {
        // Draw the next value from the generator
        next = draw();
      } catch(e) {
        // Generator had a failure; reject the promise
        reject(e);

        return;
      }

      if (next.done) {
        // Generator successfully finished; resolve the promise
        resolve(next.value);
      } else {
        // Generator not finished; chain off the yielded promise and `step` again
        Promise.resolve(next.value).then(
          val => step(() => iterator.next(val)),
          err => step(() => iterator.throw(err))
        );
      }
    }
  });
}

export default asyncRunner
