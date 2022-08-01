
// import * as lib from "../lib/es8-functional.js";

var assert = require('assert');
// describe('Array', function () {
//     describe('#indexOf()', function () {
//         it('should return -1 when the value is not present',
//             function () {
//                 assert.equal(-1, [1, 2, 3].indexOf(6));
//             });
//         it('should return 2 when the value is not present',
//             function () {
//                 assert.equal(2, [1, 2, 3].indexOf(3));
//             });
//     });
// });




const fns = require(`../lib/es8-functional`);

describe(`Curry`, function () {
    it(`Curry should always return a function`, function () {
        let add = function () { };
        assert.equal(typeof fns.curry(add), `function`)
    })
    // it(`Curry should take a function as argument`, function () {
    //     assert.throws(fns.curry, Error);
    // })
    it(`calling curried function and original function with same
    arguments should return the same value`, function () {
        let add = (x, y, z) => x + y + z
        let curriedAdd = fns.curry(add);
        assert.equal(add(1, 2, 3), curriedAdd(1)(2)(3))
        assert.equal(add(1, 2, 3), curriedAdd(1, 2)(3))
        assert.equal(add(1, 2, 3), curriedAdd(1)(2, 3))

        curriedAdd = fns.curry(add)(2);
        assert.equal(add(1, 2, 3), curriedAdd(1, 3))
    })
})



describe(`Functor`, function () {
    it(`A functor is a container that holds a value`, function () {
        let functor = fns.Container.of(3);
        assert.equal(functor.value, 3);
        functor = fns.Container.of(`Ay`);
        assert.equal(functor.value, `Ay`)
    })

    it(`A functor is a plain object that implements the map method`, function () {
        let functor = fns.Container.of(3);
        assert.equal(typeof functor.map, `function`);
        functor = fns.Container.of(`Ay`);
        assert.equal(typeof functor.map, `function`);
        assert.equal(functor.map((x) => x.toUpperCase()).value, `AY`)
    })

    it(`A functor should handle null or undefined`, function () {
        let functor = fns.Container.of(null).map((x) => x + 23);
        assert.equal(functor.value, null)
    })
    it(`Functor should chain`, function () {
        let functor = fns.Container.of(1).map((x) => x + 1).map((x) => x + 1).map((x) => x + 1)
        assert.equal(functor.value, 4)
    })
})