
const formatResponse = (timeLine, nextTrainTime, alertsLine, alerts, callback) => {
    let alertsResponse,
         minutes = (nextTrainTime === 1) ? 'minute' : 'minutes',
         alertsCount = (alerts.length === 1) ? 'alert' : 'alerts',
         timeResponse = `The next inbound train for ${timeLine} arrives in ${parseInt(nextTrainTime)} ${minutes}. `;
         alertsResponse = `For the ${alertsLine} line, there are ${alerts.length} major ${alertsCount}`;

    callback(timeResponse + alertsResponse);
};

module.exports = {
    formatResponse: formatResponse
};
