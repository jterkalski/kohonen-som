// detect size

export const detectArrayHeight = (array) => {
    if (array == null) {
        return 0;
    }
    return array.length;
};

export const detectArrayWidth = (array) => {
    if (array === null || array.length === 0) {
        return 0;
    }
    let tmp = array[0];
    if (tmp == null) {
        return 0;
    }
    return tmp.length;
};

// create array

export const createArray1D = (size, setter) => {
    const array = Array(size);
    for (let i = 0; i < size; ++i) {
        array[i] = setter(i);
    }
    return array;
};

export const createArray2D = (width, height, setter) => {
    return createArray1D(height, () => createArray1D(width, setter));
};

// color

export const calculateWeightedColor = (weights) => {
    if (!weights)
        return {
            red: 238,
            green: 238,
            blue: 238,
        };

    const colors = [
        { red: 230, green: 23, blue: 23 },
        { red: 255, green: 145, blue: 0 },
        { red: 229, green: 230, blue: 23 },
        { red: 23, green: 230, blue: 27 },
        { red: 23, green: 230, blue: 229 },
        { red: 23, green: 23, blue: 230 },
        { red: 150, green: 0, blue: 255 },
        { red: 255, green: 0, blue: 180 },
    ];

    if (colors.length !== weights.length) {
        throw new Error('Values and weights arrays must have same size.');
    }
    let r = 0,
        g = 0,
        b = 0; // sums of components
    let s = 0; // sum of weights
    for (let i = 0; i < colors.length; ++i) {
        const color = colors[i];
        const weight = weights[i] > 4.5 ? weights[i] * 2 : weights[i]; // premiuje oceny 5.0 dla lepszej wizualizacji
        r += weight * color.red;
        g += weight * color.green;
        b += weight * color.blue;
        s += weight;
    }
    return {
        red: Math.round(r / s),
        green: Math.round(g / s),
        blue: Math.round(b / s),
    };
};
