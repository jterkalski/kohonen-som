// -- distributions

export const calculateGausianDistribution = (
    radius,
    winnerX,
    winnerY,
    neuronX,
    neuronY
) => {
    let dx = winnerX - neuronX;
    let dy = winnerY - neuronY;
    return Math.exp((-0.5 * (dx * dx + dy * dy)) / (radius * radius));
};
