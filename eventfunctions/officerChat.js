const index = require('./../index.js');
const sendToDiscord = index.sendToDiscord;
const staffChannelID = process.env.STAFFCHANNEL;
const chatEmojis = require('../utilities/chatEmojis')
const getRankEmoji = chatEmojis.getRankEmoji;
const getTagEmoji = chatEmojis.getTagEmoji;

module.exports = {
  name: "officer_chat",
  async execute(rank_officer_chat, username_officer_chat, officer_chat_tag, message_officer_chat) {
    let list =  await getRankEmoji(rank_officer_chat);
    let rank_officer_chat_emoji = list[0];
    let color = list[1];

    let tag_chat_emojis = await getTagEmoji(officer_chat_tag);

    // logger.info(`OFFICER > ${rank_guild_chat} ${username_guild_chat}: ${message_guild_chat}`)
    sendToDiscord(
      `${rank_officer_chat_emoji} **${username_officer_chat}** ${tag_chat_emojis}: ${message_officer_chat}`,
      color,
      staffChannelID
    );
  },
};
