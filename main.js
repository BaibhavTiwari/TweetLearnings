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

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to TweetLearnings!');
});

bot.onText(/\/tweet (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const tweetText = match[1];

  twitter.post('statuses/update', { status: tweetText }, (err, data, response) => {
    if (err) {
      bot.sendMessage(chatId, `Tweeting failed: ${err.message}`);
    } else {
      bot.sendMessage(chatId, 'Message tweeted successfully!');
    }
  });
});

bot.onText(/\/stop/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Stopping the bot. Goodbye!');
  bot.stopPolling();
});
