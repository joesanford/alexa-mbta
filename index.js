'use strict';

const Alexa = require("alexa-sdk"),
    mbta = require('./src/mbta'),
    utils = require('./src/utils'),
    env = require('dotenv').load();

const APP_ID = process.env.APP_ID;

exports.handler = function(event, context, callback) {
    let alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.resources = languageStrings;
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        this.emit('SayHello')
    },
    "GetNewFactIntent": function () {
        this.emit('SayHello')
    },
    'SayHello': function () {
        mbta.getAlertsForLine('Orange', alerts => {
            mbta.getNextTrainForStation('Natick Center', nextTrainTime => {
                utils.formatResponse('Worcester', parseInt(nextTrainTime), 'Orange', alerts, response => {
                    this.emit(':tellWithCard', response, this.t("SKILL_NAME"), response);
                });
            })
        });
    }
};

const languageStrings = {
    "en": {
        "translation": {
            "SKILL_NAME": "MBTA Status",
            "HELP_MESSAGE": "You can say tell me how the orange line is running, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT": "What can I help you with?",
            "STOP_MESSAGE": "Goodbye!",
            "GET_STATUS_MESSAGE" : "Here's your MBTA Status: ",
        }
    }
};
