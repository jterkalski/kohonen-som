import { DistanceNetwork } from './DistanceNetwork.js';
import {
    createZeroedNeuron,
    createRandomNeuron,
} from './DistanceNeuronUtils.js';

export const createDistanceNetwork = (
    inputsCount,
    width,
    height,
    createNeuron
) => {
    let neurons = Array(height);
    for (let i = 0; i < neurons.length; ++i) {
        let tmp = Array(width);
        for (let j = 0; j < tmp.length; ++j) {
            tmp[j] = createNeuron(i, j);
        }
        neurons[i] = tmp;
    }
    return DistanceNetwork(inputsCount, neurons);
};

export const createZeroedNetwork = (inputsCount, width, height, distance) => {
    return createDistanceNetwork(inputsCount, width, height, () => {
        return createZeroedNeuron(inputsCount, distance);
    });
};

export const createRandomNetwork = (inputsCount, width, height, distance) => {
    return createDistanceNetwork(inputsCount, width, height, () => {
        return createRandomNeuron(inputsCount, distance);
    });
};
