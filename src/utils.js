const formatResponse = (timeLine, nextTrainTime, alertsLine, alerts) => {
    return new Promise((resolve, reject) => {
        const minutes = (nextTrainTime === 1) ? 'minute' : 'minutes',
            alertsCount = (alerts.length === 1) ? 'alert' : 'alerts';

        let response = `The next inbound train to Boston arrives in ${parseInt(nextTrainTime)} ${minutes}`;

        if (alerts) {
            response += `, for the ${alertsLine} line, there are ${alerts.length} major ${alertsCount}`;
        }

        response += ', enjoy your trip!';

        resolve(response);
    });
};

module.exports = {
    formatResponse
};
