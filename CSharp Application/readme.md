# Welcome to SkypeBotForCICD!
![Face](icon.png?raw=true "Face")
## What is a bot?
A bot is an app that users interact with in a conversational way using text, graphics (cards), or speech. It may be a simple question and answer dialog,
or a sophisticated bot that allows people to interact with services in an intelligent manner using pattern matching,
state tracking and artificial intelligence techniques well-integrated with existing business services.
## This application
This application uses bot authentication capabilities in Azure Bot Service, providing features to make it easier to develop a bot
that authenticates users to GitHub and provide frequent updates about PR and other CI/CD pipeline related updates.
## To try this bot
- Clone the repository.
```bash
git clone https://github.com/99xt-incubator/skype-notifier-bot
```
- [Optional] Update the `appsettings.json` file under with your botFileSecret.  For Azure Bot Service bots, you can find the botFileSecret under application settings.
## Visual Studio
- Navigate to the `skype-notifier-bot/CSharp Application/` folder and open SkypeBot.sln in Visual Studio 
- Hit F5
## Visual Studio Code
- Open `skype-notifier-bot/CSharp Application/` folder
- Bring up a terminal, navigate to the `skype-notifier-bot/CSharp Application/` folder
- Type 'dotnet run'.
## Update packages
- In Visual Studio right click on the solution and select "Restore NuGet Packages".

## Testing the bot using Bot Framework Emulator
[Microsoft Bot Framework Emulator](https://github.com/microsoft/botframework-emulator) is a desktop application that allows bot 
developers to test and debug their bots on localhost or running remotely through a tunnel.
- Install the Bot Framework emulator from [here](https://aka.ms/botframeworkemulator).

## Connect to bot using Bot Framework Emulator **V4**
- Launch the Bot Framework Emulator.
- File -> Open bot and navigate to `skype-notifier-bot/CSharp Application/` folder.
- Select `BotConfiguration.bot` file.
# Deploy this bot to Azure
You can use the [MSBot](https://github.com/microsoft/botbuilder-tools) Bot Builder CLI tool to clone and configure any services this sample depends on. 

To install all Bot Builder tools - 

Ensure you have [Node.js](https://nodejs.org/) version 8.5 or higher

```bash
npm i -g msbot chatdown ludown qnamaker luis-apis botdispatch luisgen
```
To clone this bot, run
```
msbot clone services -f deploymentScripts/msbotClone -n <BOT-NAME> -l <Azure-location> --subscriptionId <Azure-subscription-id>
```
# Further reading
- [Azure Bot Service](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0)
- [Bot basics](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0)
- [Channels and Bot Connector service](https://docs.microsoft.com/en-us/azure/bot-service/bot-concepts?view=azure-bot-service-4.0)
- [Activity processing](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-activity-processing?view=azure-bot-service-4.0)
- [Bot Authorization](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-authentication?view=azure-bot-service-4.0&tabs=csharp)