import {buildTowers, buildTowersRobust} from '../towers'

function arrayGenerator(array) {
    return function* arrayGen() {
        yield* array
    }
}

test('#buildTowers', () => {
    return buildTowers(arrayGenerator(['disk1', 'disk2', 'disk3'])).then((disks) => {
    // return buildTowers(makeDiskFetcher()).then((disks) => {
        expect(disks).toEqual(['disk1', 'disk2', 'disk3'])
    })
})

test('#buildTowersRobust can handle bad (integer) input', () => {
    const mixedData = ['disk1', 'disk2', 1, 'disk3'];

    return buildTowersRobust(arrayGenerator(mixedData)).then((disks) => {
        expect(disks).toEqual(['disk1', 'disk2', 'disk3'])
    })
})

test('#buildTowersRobust can handle bad (undefined) input', () => {
    const mixedData = ['disk1', undefined, 'disk2', 'disk3'];

    return buildTowersRobust(arrayGenerator(mixedData)).then((disks) => {
        expect(disks).toEqual(['disk1', 'disk2', 'disk3'])
    })
})
