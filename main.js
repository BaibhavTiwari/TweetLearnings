const TelegramBot = require('node-telegram-bot-api');
const Twit = require('twit');
require('dotenv').config(); // Load environment variables from .env

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const twitterConfig = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

const bot = new TelegramBot(telegramBotToken, { polling: true });
const twitter = new Twit(twitterConfig);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  twitter.post('statuses/update', { status: `Message from user ${chatId}: ${message}` }, (err, data, response) => {
    if (err) {
      bot.sendMessage(chatId, `Tweeting failed: ${err.message}`);
    } else {
      bot.sendMessage(chatId, 'Message tweeted successfully!');
    }
    console.log(msg);
  });
});
