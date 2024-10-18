let dailyWeatherData = [];

export const updateDailySummary = (data, setDailySummary) => {
    const tempC = data.main.temp - 273.15; // Convert Kelvin to Celsius
    const date = new Date(data.dt * 1000).toISOString().split('T')[0]; // Get the date

    dailyWeatherData.push({
        date,
        temp: tempC,
        condition: data.weather[0].description,
    });

    const groupedData = dailyWeatherData.reduce((acc, curr) => {
        const existingDay = acc[curr.date] || { temps: [], conditions: [] };
        existingDay.temps.push(curr.temp);
        existingDay.conditions.push(curr.condition);
        acc[curr.date] = existingDay;
        return acc;
    }, {});

    const dailySummary = Object.keys(groupedData).map((key) => {
        const temps = groupedData[key].temps;
        return {
            date: key,
            avgTemp: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(2),
            maxTemp: Math.max(...temps).toFixed(2),
            minTemp: Math.min(...temps).toFixed(2),
            dominantCondition: getDominantCondition(groupedData[key].conditions),
        };
    })[0]; // Get the latest summary

    setDailySummary(dailySummary);
};

const getDominantCondition = (conditions) => {
    const counts = {};
    conditions.forEach((cond) => {
        counts[cond] = (counts[cond] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
};
