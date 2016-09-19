import asyncRunner from './asyncRunner';

// export function buildTowers(getDisk) {
//     return asyncRunner(function* () {
//         var disks = [], disk;

//         do {
//             disk = yield getDisk()

//             if (disk) {
//                 disks.push(disk);
//             }
//         } while(disk)

//         return disks
//     }, this)
// }

function arrayGenerator(array) {
    return function* arrayGen(){
        yield* array
    }
}

export function buildTowers(getDisk) {
    return asyncRunner(function* () {
        return [...getDisk()]
    }, this)
}

export function buildTowersRobust(getDisk) {
    return asyncRunner(function* () {
        var disks = [];

        for (let disk of getDisk()) {
            if (typeof(disk) === 'string') {
                disks.push(disk)
            }
        }

        return disks;
    }, this)
}
