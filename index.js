const path = require('path');
const restify = require('restify');
const { BotFrameworkAdapter, MemoryStorage, ConversationState } = require('botbuilder');
const { BotConfiguration } = require('botframework-config');
const { MyBot } = require('./bot');

// Read botFilePath and botFileSecret from .env file
// Note: Ensure you have a .env file and include botFilePath and botFileSecret.
const ENV_FILE = path.join(__dirname, '.env');
const env = require('dotenv').config({path: ENV_FILE});
var express = require('express');
var querystring = require('querystring');
var request = require('request');
var session = require('express-session');

// bot endpoint name as defined in .bot file
// See https://aka.ms/about-bot-file to learn more about .bot file its use and bot configuration .
const DEV_ENVIRONMENT = 'development';

// bot name as defined in .bot file
// See https://aka.ms/about-bot-file to learn more about .bot file its use and bot configuration.
const BOT_CONFIGURATION = (process.env.NODE_ENV || DEV_ENVIRONMENT);


// Create HTTP server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`\n${server.name} listening to ${server.url}`);
    console.log(`\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator`);
    console.log(`\nTo talk to your bot, open myChatBot.bot file in the Emulator`);
});

server.use(session({secret: process.env.SESSION_SECRET}));

var session;
// .bot file path
const BOT_FILE = path.join(__dirname, (process.env.botFilePath || ''));

// Read bot configuration from .bot file.
let botConfig;
try {
    botConfig = BotConfiguration.loadSync(BOT_FILE, process.env.botFileSecret);
} catch (err) {
    console.error(`\nError reading bot file. Please ensure you have valid botFilePath and botFileSecret set for your environment.`);
    console.error(`\n - The botFileSecret is available under appsettings for your Azure Bot Service bot.`);
    console.error(`\n - If you are running this bot locally, consider adding a .env file with botFilePath and botFileSecret.\n\n`);
    process.exit();
}
const endpointConfig = botConfig.findServiceByNameOrId(BOT_CONFIGURATION);

const adapter = new BotFrameworkAdapter({
    appId: endpointConfig.appId || process.env.microsoftAppID,
    appPassword: endpointConfig.appPassword || process.env.microsoftAppPassword
});
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);

const myBot = new MyBot(conversationState);

adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError]: ${error}`);
    context.sendActivity(`Oops. Something went wrong!`);
    await conversationState.load(context);
    await conversationState.clear(context);
    await conversationState.saveChanges(context);
};



server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await myBot.onTurn(context);
    });
});


server.get('/callback', function (req, res) {

    var query = req.getQuery();
    var code = query.split('=');
    session = req.session;


    var post_data = {
        'client_id': process.env.GITHUB_CLIENT_ID,
        'client_secret': process.env.GITHUB_CLIENT_SECRET,
        'code' : code[1],
        'accept' : 'json'
    };

    const options = {
        url: "https://github.com/login/oauth/access_token",
        form: post_data
    }

    request.post(options, function(err,httpResponse,body){

        
        var string = querystring.parse(body);
        var accessToken = string.access_token;
        session.access_token = accessToken;

        getGithubUser();
    });

    function getGithubUser(){

        const options = {
            url: "https://api.github.com/user",
            headers: {
                'Authorization': 'Bearer '+ session.access_token,
                'User-Agent': 'Skype Notification Bot'
              }
        }
        

        request.get(options, function(err,httpResponse,body){

            var obj = JSON.parse(body);
            session.name = obj.name;
            res.send(session.name);

            adapter.processActivity(req, res, async (context) => {
                await myBot.sendUserCard(context);
            });
        });


    }
   // console.log(code[1]);

});