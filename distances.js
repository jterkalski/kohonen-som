// -- distances

// Source: https://dirask.com/posts/JavaScript-Chebyshev-Distance-function-p5q6Rp

export const calculateChebyshevDistance = (a, b) => {
    if (a.length === 0 || a.length !== b.length) {
        return NaN;
    }
    let max = Math.abs(a[0] - b[0]);
    for (let i = 1; i < a.length; ++i) {
        let tmp = Math.abs(a[i] - b[i]);
        if (tmp > max) {
            max = tmp;
        }
    }
    return max;
};

export const calculateEuclideanDistance = (a, b) => {
    if (a.length === 0 || a.length !== b.length) {
        return NaN;
    }
    let sum = 0.0;
    for (let i = 0; i < a.length; ++i) {
        let tmp = a[i] - b[i];
        sum += tmp * tmp;
    }
    return Math.sqrt(sum);
};

// Source: https://dirask.com/posts/JavaScript-Rectilinear-Distance-function-1XgJgj

export const calculateRectilinearDistance = (a, b) => {
    if (a.length === 0 || a.length !== b.length) {
        return NaN;
    }
    let sum = 0.0;
    for (let i = 0; i < a.length; ++i) {
        sum += Math.abs(a[i] - b[i]);
    }
    return sum;
};
