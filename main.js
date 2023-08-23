const TelegramBot = require('node-telegram-bot-api');
const Twit = require('twit');
require('dotenv').config(); 

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const twitterConfig = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

const bot = new TelegramBot(telegramBotToken, { polling: true });


const twitter = new Twit(twitterConfig);


const welcomedUsers = new Set();

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;


  if (!welcomedUsers.has(chatId)) {
    bot.sendMessage(chatId, 'Welcome to TweetLearnings!😃\n\n' +
      'Commands:\n' +
      '/start - Starting the Bot👋\n' +
      '/tweet <message> - Tweet the provided message🕊️\n' +
      '/stop - Stop the bot⛔');
    welcomedUsers.add(chatId); 
  } else {
    bot.sendMessage(chatId, 'You are already welcomed. Type /start to see the available commands.');
  }
});

bot.onText(/\/tweet (.+)/, (msg, match) => {

});

bot.onText(/\/stop/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Stopping the bot. Goodbye!');
  bot.stopPolling();
});