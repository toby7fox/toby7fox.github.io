function getTotalWeight(weight, bwE) {
    const bw = parseFloat(localStorage.getItem("bw")) || 0;
    return bwE ? parseFloat(weight) + bw : parseFloat(weight);
}

function subtractBodyweight(rm, bwE) {
    const bw = parseFloat(localStorage.getItem("bw")) || 0;
    return bwE ? rm - bw : rm;
}

function calculate1RM(weight, reps, bwE) {
    const totalWeight = getTotalWeight(weight, bwE);
    const rm = totalWeight * (1 + reps / 30);
    const adjustedRm = subtractBodyweight(rm, bwE);

    console.log("1RM: " + Math.round(adjustedRm * 100) / 100);
    return Math.round(adjustedRm * 100) / 100;
}

function calculate3RM(weight, reps, bwE) {
    return calculateNW(3, 0, reps, weight, bwE);
}

function calculate6RM(weight, reps, bwE) {
    return calculateNW(6, 0, reps, weight, bwE);
}



function calculateNW(repLow ,repHigh, reps, weight, bwE) {
    if (reps <= repHigh) return weight;

    const totalWeight = getTotalWeight(weight, bwE);
    const rm = totalWeight * (1 + reps / 30);

    const targetWeight = rm / (1 + repLow / 30);

    const finalWeight = subtractBodyweight(targetWeight, bwE); 

    console.log("NW: " + Math.round(finalWeight * 100) / 100);
    return Math.round(finalWeight * 100) / 100;
}