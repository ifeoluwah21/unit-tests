//ForEach abstract function for arrays.
const forEach = (array, fn) => {
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      fn(array[i], i, array);
    }
  } else {
    throw `First argument should be an array`;
  }
};

//ForEachObject loop abstract function.
const forEachObject = (obj, fn) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn(key, obj[key]);
    }
  }
};

//Unless abstract function
const unless = (bool, fn) => {
  if (!bool) {
    fn();
  }
};

//Times abstract function
const times = (times, fn) => {
  for (let i = 0; i < times; i++) {
    fn(i);
  }
};

//Every abstract function for check if every item in an array passes a condition.
const every = (array, fn) => {
  let result = true;
  if (Array.isArray(array)) {
    for (let i of array) {
      result = result && fn(array[1]);
      if (!result) {
        break;
      }
    }
  }
  console.log(result);
  return result;
};

const some = (array, fn) => {
  let result = false;
  if (Array.isArray(array)) {
    for (let i of array) {
      result = result || fn(array[i]);
      console.log(result);
      if (result) {
        break;
      }
    }
  }
  console.log(result);
  return result;
};

const sortBy = (key) => {
  return (a, b) => {
    return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
  };
};

const tap = (value) => (fn) => (
  typeof fn === `function` && fn(value), console.log(value)
);

const unary = (fn) => {
  return fn.length === 1 ? fn : (arg) => fn(arg);
};

const once = (fn) => {
  let done = false;
  return function () {
    return done === true
      ? undefined
      : ((done = true), fn.apply(this, arguments));
  };
};
const memoized = (fn) => {
  let memoziedStore = {};
  return (num) => {
    return memoziedStore[num] || (memoziedStore[num] = fn(num));
  };
};

const fastFactorial = memoized((n) => {
  if (n === 0) {
    return 1;
  }

  return n * fastFactorial(n - 1);
});

const factorial = (n) => {
  if (n === 0) {
    return 1;
  }

  return n * factorial(n - 1);
};

// const objectAssign = (target, ...source) => {
//   let clone = { ...target };
//   for (let i = 0; i < source.length; i++) {
//     for (let property in source[i]) {
//       clone[property] = source[i][property];
//     }
//   }
//   return clone;
// };

const objectKeys = (targetObj) => {
  let objectKeysArray = [];
  for (let key in targetObj) {
    objectKeysArray.push(key);
  }

  return objectKeysArray;
};

const objectEntries = (targetObj) => {
  let objectEntriesArray = [];
  for (let property in targetObj) {
    let eachEntries = [];
    eachEntries.push(property, targetObj[property]);
    objectEntriesArray.push(eachEntries);
  }

  return objectEntriesArray;
};

const map = (array, fn) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(fn(array[i]));
  }

  return result;
};

const filter = (array, fn) => {
  let results = [];
  for (let i = 0; i < array.length; i++) {
    fn(array[i]) ? results.push(array[i]) : undefined;
  }

  return results;
};

const concatAll = (array, fn) => {
  let results = [];
  for (let item of array) {
    results.push.apply(results, item);
  }

  return results;
};

const reduce = (array, fn, initialValue) => {
  let accumulator;
  if (initialValue !== undefined) {
    accumulator = initialValue;
  } else {
    accumulator = array[0];
  }

  if (initialValue !== undefined) {
    for (let i = 0; i < array.length; i++) {
      accumulator = fn(accumulator, array[i], i, array);
    }
  } else {
    for (let i = 1; i < array.length; i++) {
      accumulator = fn(accumulator, array[i], i, array);
    }
  }

  return accumulator;
};

const zip = (leftArr, rightArr, fn) => {
  let result = [];
  for (let i in leftArr) {
    for (let j in rightArr) {
      if (fn(leftArr[i], rightArr[j]) !== undefined) {
        result.push(fn(leftArr[i], rightArr[j]));
      }
    }
  }
  return result;
};

const curriedBinaryFn = (binaryFn) => (firstArg) => (secondArg) =>
  binaryFn(firstArg, secondArg);

const curry = (fn) => {
  if (typeof fn !== `function`) {
    return console.warn(
      new Error(`Kindly provide a function as the first argument`)
    );
  }

  return function curriedFn(...args) {
    if (args.length < fn.length) {
      return function () {
        return curriedFn.apply(null, args.concat([].slice.call(arguments)));
      };
    }
    return fn.apply(null, args);
  };
};

const findInArray = (fn, array) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i]) !== undefined) {
      result.push(array[i]);
    }
  }
  return result;
};

const primeFinder = (num) => {
  let primeChecker = true;
  for (let i = 2; i < num; i++) {
    if (num % i !== 0) {
      primeChecker = true;
    } else {
      primeChecker = false;
      break;
    }
  }
  return primeChecker === true ? num : undefined;
};

const evenFinder = (num) => {
  if (num % 2 === 0) {
    return num;
  } else {
    return undefined;
  }
};

const partial = (fn, ...partialArgs) => {
  let args = partialArgs;
  return function (...fullArgs) {
    //fullArgs is the remaining arguments.
    let arg = 0;
    let cloneArgs;
    for (let i = 0; i < args.length && arg < fullArgs.length; i++) {
      if (args[i] === undefined) {
        cloneArgs = [...args];
        cloneArgs[i] = fullArgs[arg++];
      }
    }
    return fn.apply(null, cloneArgs);
  };
};
const identity = (x) => {
  console.log(x);
  return x;
}

function Container(val) {
  this.value = val;
}

Container.of = function (val) {
  return new Container(val);
}

Container.prototype.isNothing = function () {
  return (this.value === undefined) || (this.value === null);
}

Container.prototype.map = function (fn) {
  return this.isNothing() ? Container.of(null) : Container.of(fn(this.value))
}

// const composeN = (...fns) => (value) => reduce(fns.reverse(), (previousValue, currentValue) => currentValue(previousValue), value)
// const pipeN = (...fns) => (value) => reduce(fns, (previousValue, currentValue) => currentValue(previousValue), value)
const arrayUtils = {
  map,
  filter,
  concatAll,
  reduce,
  zip,
};

const test = {
  Container,
  curry,
}

module.exports = test;