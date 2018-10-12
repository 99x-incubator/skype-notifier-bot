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
        },
        {
            value: 'Show User Card',
            synonyms: ['user']
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
    case 'Show User Card':
        await turnContext.sendActivities([
            { attachments: [this.createUserCard()] }
        ]);
        break;       
      default:
          await turnContext.sendActivity('An invalid selection was parsed. No corresponding Rich Cards were found.');
  }
}

async sendCardResponseOutside(turnContext, message) {
    switch (message) {
      case 'Show User Card':
          await turnContext.sendActivities([
              { attachments: [this.createUserCard()] }
          ]);
          break;       
        default:
            await turnContext.sendActivity('An invalid selection was parsed. No corresponding Rich Cards were found.');
    }
  }

createUserCard(){

    return CardFactory.receiptCard({
        title: 'John Doe',
        facts: [
            {
                key: 'Order Number',
                value: '1234'
            },
            {
                key: 'Payment Method',
                value: 'VISA 5555-****'
            }
        ],
        items: [
            {
                title: 'Data Transfer',
                price: '$38.45',
                quantity: 368,
                image: { url: 'https://github.com/amido/azure-vector-icons/raw/master/renders/traffic-manager.png' }
            },
            {
                title: 'App Service',
                price: '$45.00',
                quantity: 720,
                image: { url: 'https://github.com/amido/azure-vector-icons/raw/master/renders/cloud-service.png' }
            }
        ],
        tax: '$7.50',
        total: '$90.95',
        buttons: CardFactory.actions([
            {
                type: 'openUrl',
                title: 'More information',
                value: 'https://azure.microsoft.com/en-us/pricing/details/bot-service/'
            }
        ])
    });
}

createSignInCard() {
  return CardFactory.signinCard(
      'Github Authentication',
      'https://github.com/login/oauth/authorize?scope=user:email&client_id=148eba2abec50398b195',
      'Sign in'
  );
}

async sendUserCard(context) {
    var msg=[];
    msg.result.value = "Show User Card";

    await sendCardResponse(context, "Show User Card");
}


}



module.exports.MyBot = MyBot;