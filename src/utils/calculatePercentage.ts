
export const calculatePercentage = (current: number, previous: number) => {
    if (previous === 0) return "N/A";
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1) + "%";
  };