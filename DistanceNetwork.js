import { detectArrayWidth, detectArrayHeight } from './commonUtils.js';

export const DistanceNetwork = (inputsCount, neurons) => {
    const width = detectArrayWidth(neurons);
    const height = detectArrayHeight(neurons);
    const outputsCount = width * height;

    const getInputsCount = () => inputsCount;
    const getOutputsCount = () => outputsCount;
    const getWidth = () => width;
    const getHeight = () => height;
    const getNeurons = () => neurons;
    const getNeuron$1 = (position) => getNeuron$2(position.x, position.y);

    const getNeuron$2 = (positionX, positionY) => {
        let tmp = neurons[positionY];
        if (tmp) {
            return tmp[positionX];
        }
        return null;
    };

    const randomize$1 = () => {
        for (let y = 0; y < height; ++y) {
            let tmp = neurons[y];
            for (let x = 0; x < width; ++x) {
                tmp[x].random$1();
            }
        }
    };

    const randomize$2 = (min, max) => {
        for (let y = 0; y < height; ++y) {
            let tmp = neurons[y];
            for (let x = 0; x < width; ++x) {
                tmp[x].randomize$2(min, max);
            }
        }
    };

    // Computes neurons outputs.
    //
    const compute$1 = (inputs) => {
        let index = -1;
        let outputs = new Array(outputsCount);
        for (let y = 0; y < height; ++y) {
            let tmp = neurons[y];
            for (let x = 0; x < width; ++x) {
                outputs[++index] = tmp[x].compute(inputs);
            }
        }
        return outputs;
    };

    // Computes neurons outputs for each data row.
    //
    const compute$2 = (data) => {
        let result = Array(data.length);
        for (let i = 0; i < data.length; ++i) {
            result[i] = compute$1(data[i]);
        }
        return result;
    };

    // Searches for the winning neuron and returns his position.
    // Winning neuron is neuron that has weights closest to the inputs values (smallest distance).
    //
    const search$1 = (inputs) => {
        let positionX = -1;
        let positionY = -1;
        let index = -1;
        let value = +Infinity;
        let outputs = new Array(outputsCount);
        for (let y = 0; y < height; ++y) {
            let tmp = neurons[y];
            for (let x = 0; x < width; ++x) {
                let output = tmp[x].compute(inputs);
                if (output < value) {
                    positionX = x;
                    positionY = y;
                    value = output;
                }
                outputs[++index] = output;
            }
        }
        if (positionX === -1) {
            return null;
        }
        return {
            x: positionX,
            y: positionY,
            value: value,
        };
    };

    // Searches for the winning neuron of each data row and returns their positions.
    //
    const search$2 = (data) => {
        let result = Array(data.length);
        for (let i = 0; i < data.length; ++i) {
            result[i] = search$1(data[i]);
        }
        return result;
    };

    return {
        getInputsCount,
        getOutputsCount,
        getWidth,
        getHeight,
        getNeurons,
        getNeuron$1,
        getNeuron$2,
        randomize$1,
        randomize$2,
        compute$1,
        compute$2,
        search$1,
        search$2,
    };
};
