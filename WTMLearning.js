import { WTALearning } from './WTALearning.js';

export const WTMLearning = (network, distribution) => {
    let radius = 3.0; // single neuron impact
    // let network;
    // let distribution;
    let learning = WTALearning(network);

    const getRate = () => learning.getRate();
    const setRate = (value) => learning.setRate(value);

    const getRadius = () => radius;
    const setRadius = (value) => (radius = value);

    const update = (neuron, factor, inputs) => {
        const rate = learning.getRate();
        const weights = neuron.getWeights();
        let error = 0.0;
        for (let i = 0; i < weights.length; ++i) {
            const impact = factor * (inputs[i] - weights[i]);
            weights[i] += rate * impact;
            error += Math.abs(impact);
        }
        return error;
    };

    const run = (inputs) => {
        if (radius === 0.0) {
            return learning.run(inputs);
        }
        const winner = network.search$1(inputs);
        if (winner == null) {
            return +Infinity;
        }
        const neurons = network.getNeurons();
        const winnerX = winner.x;
        const winnerY = winner.y;
        let error = 0.0;
        for (let y = 0; y < neurons.length; ++y) {
            let tmp = neurons[y];
            for (let x = 0; x < tmp.length; ++x) {
                let factor = distribution.call(
                    null,
                    radius,
                    winnerX,
                    winnerY,
                    x,
                    y
                );
                if (factor === 0.0) {
                    continue;
                }
                error += update(tmp[x], factor, inputs);
            }
        }
        return error;
    };

    const runEpoch = (data) => {
        let error = 0.0;
        for (let i = 0; i < data.length; ++i) {
            error += run(data[i]);
        }
        return error;
    };

    return {
        getRate,
        setRate,
        getRadius,
        setRadius,
        update,
        run,
        runEpoch,
    };
};

// -- utils

export const runWTMTraining = (
    learning,
    data,
    epochsLimit,
    toleratedError,
    rateModel,
    radiusModel
) => {
    let error = +Infinity;
    for (let i = 0; i < epochsLimit && error > toleratedError; ++i) {
        learning.setRate(rateModel.call());
        learning.setRadius(radiusModel.call());
        error = learning.runEpoch(data);
    }
    return error;
};
