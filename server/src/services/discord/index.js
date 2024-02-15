import axios from "axios";
import config from "../../config/config.js";

async function sendMessage({ mensaje, channelId }) {
  const url = `https://discord.com/api/v10/channels/${channelId}/messages`;

  await axios
    .post(
      url,
      {
        content: mensaje,
      },
      {
        headers: {
          Authorization: `Bot ${config.Discord.Token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log("Message successfully sent to discord");
    })
    .catch((error) => {
      console.error("Error sending message to discord:", error);
    });
}

export { sendMessage };
