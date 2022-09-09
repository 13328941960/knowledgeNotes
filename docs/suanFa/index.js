

var fn = curry(function(a, b, c) {
  console.log([a, b, c]);
});

// fn("a", "b", "c") // ["a", "b", "c"]
// fn("a", "b")("c") // ["a", "b", "c"]
// fn("a")("b")("c") // ["a", "b", "c"]
// fn("a")("b", "c") // ["a", "b", "c"]
