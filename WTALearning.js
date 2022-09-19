// Winner Takes All

export const WTALearning = (network) => {
    let rate = 0.01; // learning rate
    const getRate = () => rate;
    const setRate = (value) => (rate = value);
    const update = (neuron, inputs) => {
        const weights = neuron.getWeights();
        let error = 0.0;
        for (let i = 0; i < weights.length; ++i) {
            let impact = inputs[i] - weights[i];
            weights[i] += rate * impact;
            error += Math.abs(impact);
        }
        return error;
    };

    const run = (inputs) => {
        const winner = network.search$1(inputs);
        if (winner == null) {
            return +Infinity;
        }
        const neurons = network.getNeurons();
        return update(neurons[winner.y][winner.x], inputs);
    };

    const runEpoch = (data) => {
        let error = 0.0;
        for (let i = 0; i < data.length; ++i) {
            error += this.run(data[i]);
        }
        return error;
    };

    return {
        getRate,
        setRate,
        update,
        run,
        runEpoch,
    };
};

// -- utils

export const runWTATraining = (
    learning,
    data,
    epochsLimit,
    toleratedError,
    rateModel,
    radiusModel
) => {
    let error = +Infinity;
    for (let i = 0; i < epochsLimit && error > toleratedError; ++i) {
        error = learning.runEpoch(data);
    }
    return error;
};
