export const createConstantModel = (value) => {
    return () => value;
};

export const createLinearModel = (limit, start, stop) => {
    if (stop > start) {
        throw new Error('Stop value cannot be bigger than start value.');
    }
    if (start < stop) {
        let step = (stop - start) / (limit - 1);
        return () => {
            start += step;
            return start < stop ? start : stop;
        };
    }
    if (start > stop) {
        let step = (start - stop) / (limit - 1);
        return () => {
            start -= step;
            return start > stop ? start : stop;
        };
    }
    return () => start;
};
