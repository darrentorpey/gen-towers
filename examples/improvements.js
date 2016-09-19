function* diskGenerator() {
    yield 'disk1'
    yield 'disk2'
    return 'disk3'
}

function* diskGenerator(){
  yield* ['disk1', 'disk2', 'disk3']
}

// function* diskGenerator(){
//   yield* ['disk1', 'disk2', 'disk3']
// }

//
// =============================================
//

// function arrayIterator(array) {
//     return (function* arrayGen() {
//         yield* array
//     })()
// }

// function arrayGeneratorA(disks) {
//     var arrayIter = arrayIterator(disks)
//
//     return function getElement() {
//         return arrayIter.next().value
//     }
// }

function arrayGenerator(array) {
    return function* arrayGen() {
        yield* array
    }
}

// arrayGenerator(['disk1', 'disk2', 'disk3'])
// equivalent to
// arrayGeneratorA(['disk1', 'disk2', 'disk3'])

