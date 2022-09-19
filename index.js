import { data } from './data.js';
import { calculateEuclideanDistance } from './distances.js';
import { createRandomNetwork } from './DistanceNetworkUtils.js';
import { WTMLearning } from './WTMLearning.js';
import { createArray2D } from './commonUtils.js';
import { runWTMTraining } from './WTMLearning.js';
import { calculateGausianDistribution } from './distributions.js';
import { createLinearModel } from './models.js';

// -- configuration

export const inputsCount = 8;
export const networkWidth = 5;
export const netowrkHeight = 5;

export const epochsLimit = 200; // learning epochs limit
export const toleratedError = 0.01; // tolerated learning error

export const initialRate = 0.3; // initial learning rate
export const initialRadius = 10.0; // winning neuron initial impact
export const finalRate = 0.1 * initialRate; // final learning rate
export const finalRadius = 0.0; // winning neuron final impact

// -- training

// Available dinstance functions: calculateChebyshevDistance / calculateRectilinearDistance / calculateEuclideanDistance

const network = createRandomNetwork(
    inputsCount,
    networkWidth,
    netowrkHeight,
    calculateEuclideanDistance
);

// Avaialble model functions: createConstantModel / createLinearModel

const rateModel = createLinearModel(epochsLimit, initialRate, finalRate);
const radiusModel = createLinearModel(
    0.75 * epochsLimit,
    initialRadius,
    finalRadius
); // learning iterations: 75% per WTM, 25% per WTA

const learning = WTMLearning(network, calculateGausianDistribution);

export const error = runWTMTraining(
    learning,
    data,
    epochsLimit,
    toleratedError,
    rateModel,
    radiusModel
);

// -- results

console.log('learning error: ' + error);

export const groups = createArray2D(netowrkHeight, networkWidth, () => ({
    name: '',
    students: [],
}));

for (let i = 0; i < data.length; ++i) {
    const input = data[i]; // student's marks
    const position = network.search$1(input); // assigned group
    const group = groups[position.y][position.x];
    group.students.push(input);
}

console.log('\nGroups:');
for (let i = 0; i < netowrkHeight; ++i) {
    let tmp = '';
    for (let j = 0; j < networkWidth; ++j) {
        const group = groups[i][j];
        tmp += ' ' + group.students.length;
    }
    console.log('   ' + tmp);
}

console.log('\nStudents:');
for (let i = 0; i < netowrkHeight; ++i) {
    for (let j = 0; j < networkWidth; ++j) {
        console.log('    Group [' + i + '][' + j + ']');
        const group = groups[i][j];
        for (const student of group.students) {
            console.log('        ' + student.join('  '));
        }
    }
}
