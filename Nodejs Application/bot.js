// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes,
  CardFactory,
  ConversationState,
  TurnContext } = require('botbuilder');

const { ChoicePrompt,
  DialogSet,
  DialogTurnResult,
  DialogTurnStatus,
  ListStyle } = require('botbuilder-dialogs');

// Turn counter property
const TURN_COUNTER_PROPERTY = 'turnCounterProperty';

class MyBot {
  /**
   *
   * @param {ConversationState} conversation state object
   */
  constructor(conversationState) {
   
    this.conversationState = conversationState;
    this.dialogState = conversationState.createProperty('dialogState');
    this.dialogs = new DialogSet(this.dialogState);
    const prompt = new ChoicePrompt('cardPrompt');
    prompt.style = ListStyle.list;
    this.dialogs.add(prompt);
  }
  /**
   *
   * @param {TurnContext} on turn context object.
   */
  async onTurn(turnContext) {


    if (turnContext.activity.type === ActivityTypes.Message) {
      const dc = await this.dialogs.createContext(turnContext);

      const results = await dc.continueDialog();
      
      if (!turnContext.responded && results.status === DialogTurnStatus.empty) {

          var user = turnContext.activity.from.name;
          await turnContext.sendActivity('Hi '+ user + '! Welcome to the Rich Cards Bot!');
          
          if(turnContext.activity.text === "!config"){
          
          const promptOptions = {
              prompt: 'Please select a configuration Option:',
              reprompt: 'That was not a valid choice, please select a card or number from 1 to 8.',
              choices: this.getChoices()
          };

          // Prompt the user with the configured PromptOptions.
          await dc.prompt('cardPrompt', promptOptions);
          }
      // The bot parsed a valid response from user's prompt response and so it must respond.
          } else if (results.status === DialogTurnStatus.complete) {
            await this.sendCardResponse(turnContext, results);
          }
            await this.conversationState.saveChanges(turnContext);
    }
    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    // if (turnContext.activity.type === ActivityTypes.Message) {
    //   // read from state.
    //   let count = await this.countProperty.get(turnContext);
    //   count = count === undefined ? 1 : ++count;
    //   await turnContext.sendActivity(`${count}: You said "${turnContext.activity.text}"`);
    //   // increment and set turn counter.
    //   await this.countProperty.set(turnContext, count);
    // } else {
    //   await turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
    // }
    // Save state changes
          await this.conversationState.saveChanges(turnContext);
    }

  getChoices() {
    const cardOptions = [
        {
            value: 'Login to Github',
            synonyms: ['1', 'login', 'github']
        },
        {
            value: 'Add Repositories',
            synonyms: ['2', 'add repo', 'add']
        }
    ];

    return cardOptions;
}

async sendCardResponse(turnContext, dialogTurnResult) {
  switch (dialogTurnResult.result.value) {
      case 'Login to Github':
          await turnContext.sendActivity({ attachments: [this.createSignInCard()] });
          break;
      case 'All Cards':
          await turnContext.sendActivities([
              { attachments: [this.createSignInCard()] }
          ]);
          break;
      default:
          await turnContext.sendActivity('An invalid selection was parsed. No corresponding Rich Cards were found.');
  }
}

createSignInCard() {
  return CardFactory.signinCard(
      'Github Authentication',
      'https://github.com/login/oauth/authorize?scope=user:email&client_id=18a9a9ccd8ba489c54af',
      'Sign in'
  );
}

}

module.exports.MyBot = MyBot;