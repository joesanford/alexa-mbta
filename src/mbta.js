const request = require('request');

const MBTA_API_KEY = process.env.MBTA_API_KEY;
const BASE_URL = 'http://realtime.mbta.com/developer/api/v2/';


const getAlertsForLine = line => {
    return new Promise((resolve, reject) => {
        const url = `${BASE_URL}alertsbyroute?api_key=${MBTA_API_KEY}&route=${line}&include_access_alerts=true&include_service_alerts=true&format=json`;

        request(url, (error, response, body) => {
            if (error) reject(eror);
            const parsedBody = JSON.parse(body);
            const results = parsedBody.alerts.filter(alert => {
                return alert.severity === 'Major';
            });

            resolve(results);
        });
    });
};


const getNextTrainForStation = station => {
    return new Promise((resolve, reject) => {
        const url = `${BASE_URL}predictionsbystop?api_key=${MBTA_API_KEY}&stop=${station}&format=json`;

        request(url, (error, response, body) => {
            if (error) reject(eror);
            const parsedBody = JSON.parse(body);
            const nextTrain =  parsedBody.mode[0].route[0].direction.filter(direction => {
                if (direction.direction_name) {
                    return direction.direction_name === 'Inbound';
                }
            });

            if (nextTrain && nextTrain[0] && nextTrain[0].trip[0]) {
                const nextTrainTime = parseInt(nextTrain[0].trip[0].sch_arr_dt);
                const now = parseInt(Date.now() / 1000);
                const timeRemaining = ((nextTrainTime - now) / 60);

                return resolve(timeRemaining);
            }

            resolve('unknown');
        });
    });

};

module.exports = {
    getAlertsForLine,
    getNextTrainForStation
};
