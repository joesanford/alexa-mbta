
const formatResponse = (timeLine, nextTrainTime, alertsLine, alerts, crAlerts) => {
    return new Promise((resolve, reject) => {
        let minutes = (nextTrainTime === 1) ? 'minute' : 'minutes',
            alertsCount = (alerts.length === 1) ? 'alert' : 'alerts',
            crAlertsCount = (crAlerts.length === 1) ? 'alert' : 'alerts',
            timeResponse = `The next inbound train for ${timeLine} arrives in ${parseInt(nextTrainTime)} ${minutes}, `,
            crAlertsResponse = `with ${crAlerts.length} ${crAlertsCount}. `,
            alertsResponse = `For the ${alertsLine} line, there are ${alerts.length} major ${alertsCount}`;

        resolve(timeResponse + crAlertsResponse + alertsResponse);
    });

};

module.exports = {
    formatResponse: formatResponse
};
