const Alexa = require('alexa-sdk'),
    mbta = require('./src/mbta'),
    utils = require('./src/utils');

const APP_ID = process.env.APP_ID;

exports.handler = (event, context, callback) => {
    let alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.resources = languageStrings;
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function() {
        this.emit('SayStatus');
    },
    'MBTAIntent': function()  {
        this.emit('SayStatus')
    },
    'SayStatus': function() {
        const crLine = 'Worcester',
            tLine = 'Orange',
            station = 'Natick Center';

        let orangeAlerts,
            crAlerts;

        mbta.getAlertsForLine(tLine)
            .then(alerts => {
                orangeAlerts = alerts;
                return mbta.getAlertsForLine(crLine)
            })
            .then(alerts => {
                crAlerts = alerts;
                return mbta.getNextTrainForStation(station)
            })
            .then(nextTrainTime => {
                return utils.formatResponse(crLine, parseInt(nextTrainTime), tLine, orangeAlerts, crAlerts)
            })
            .then(response => this.emit(':tellWithCard', response, this.t("SKILL_NAME"), response))
            .catch((msg, error) => console.error(msg + " " + error));
    }
};

const languageStrings = {
    "en": {
        "translation": {
            "SKILL_NAME": "MBTA Status",
            "HELP_REPROMPT": "What can I help you with?",
            "STOP_MESSAGE": "Goodbye!",
            "GET_STATUS_MESSAGE" : "Here's your MBTA Status: "
        }
    }
};