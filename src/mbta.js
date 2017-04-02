const request = require('request'),
    _ = require('lodash');

const API_KEY = process.env.API_KEY;
const BASE_URL = 'http://realtime.mbta.com/developer/api/v2/';

const getAlertsForLine = (line, callback) => {
    const url = `${BASE_URL}alertsbyroute?api_key=${API_KEY}&route=${line}&include_access_alerts=true&include_service_alerts=true&format=json`;

    request(url, (error, response, body) => {
        const parsedBody = JSON.parse(body);
        let results = _.filter(parsedBody.alerts, (alert) => {
            return alert.severity === 'Major';
        });

        callback(results);
    });
};

const getNextTrainForStation = (station, callback) => {
    const url = `${BASE_URL}predictionsbystop?api_key=${API_KEY}&stop=${station}&format=json`;

    request(url, (error, response, body) => {
        const parsedBody = JSON.parse(body);
        const nextTrain =  _.filter(parsedBody.mode[0].route[0].direction, direction => {
            if (direction.direction_name) {
                return direction.direction_name === 'Inbound';
            }
        });

        if (nextTrain && nextTrain[0].trip[0]) {
            const nextTrainTime = parseInt(nextTrain[0].trip[0].sch_arr_dt);
            const now = parseInt(Date.now() / 1000);
            const timeRemaining = ((nextTrainTime - now) / 60);
            callback(timeRemaining);
       } else {
            callback('');
       }
    });
};

module.exports = {
    getAlertsForLine: getAlertsForLine,
    getNextTrainForStation: getNextTrainForStation
};
