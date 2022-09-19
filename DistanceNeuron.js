// -- neuron

export const DistanceNeuron = (weights, distance) => {
    const getWeights = () => weights;
    const getDistance = () => distance;
    const randomize$1 = () => randomize$2(0.0, 1.0);
    const randomize$2 = (min, max) => {
        let range = max - min;
        for (let i = 0; i < weights.length; ++i) {
            weights[i] = min + range * Math.random();
        }
    };
    const compute = (inputs) => distance.call(null, weights, inputs);

    return {
        getWeights,
        getDistance,
        randomize$1,
        randomize$2,
        compute,
    };
};
