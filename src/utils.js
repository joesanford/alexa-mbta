const formatResponse = (timeLine, nextTrainTime, alertsLine, alerts, crAlerts) => {
    return new Promise((resolve, reject) => {
        let minutes = (nextTrainTime === 1) ? 'minute' : 'minutes',
            alertsCount = (alerts.length === 1) ? 'alert' : 'alerts',
            crAlertsCount = (crAlerts.length === 1) ? 'alert' : 'alerts',
            response = `The next inbound train for ${timeLine} arrives in ${parseInt(nextTrainTime)} ${minutes}, with ${crAlerts.length} ${crAlertsCount}. For the ${alertsLine} line, there are ${alerts.length} major ${alertsCount}`;
        resolve(response);
    });
};

module.exports = {
    formatResponse: formatResponse
};
