import { DistanceNeuron } from './DistanceNeuron.js';

export const createDistanceNeuron = (inputsCount, distance, createWeight) => {
    let weights = Array(inputsCount);
    for (let i = 0; i < weights.length; ++i) {
        weights[i] = createWeight(i);
    }
    return DistanceNeuron(weights, distance);
};

export const createZeroedNeuron = (inputsCount, distance) => {
    return createDistanceNeuron(inputsCount, distance, () => {
        return 0.0;
    });
};

export const createRandomNeuron = (inputsCount, distance) => {
    return createDistanceNeuron(inputsCount, distance, () => {
        return Math.random();
    });
};
