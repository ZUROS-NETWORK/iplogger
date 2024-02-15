import express from "express";
const app = express();
import cors from "cors";
import { authmeInfo } from "./services/authme/index.js";
import { sendMessage } from "./services/discord/index.js";
import { ipData } from "./services/ipdata/index.js";

import config from "./config/config.js";
app.use(cors());
app.set("trust proxy", true);

async function Logger(UserInfo) {
  try {
    const userData = UserInfo.query;
    const userIp = UserInfo.ip.replace("::ffff:", "");
    const userIpInfo = await ipData(userIp);
    const authmeData = await authmeInfo(userData.username);
    const authmeIpData = await ipData(authmeData.ip);
    const authmeRegIpData = await ipData(authmeData.regip);

    const ipMatch =
      authmeIpData.query === authmeRegIpData.query &&
      authmeIpData.query === userIpInfo.query;
    const countryMatch =
      authmeIpData.country === authmeRegIpData.country &&
      authmeIpData.country === userIpInfo.country;
    const cityMatch =
      authmeIpData.city === authmeRegIpData.city &&
      authmeIpData.city === userIpInfo.city;
    const ispMatch =
      authmeIpData.isp === authmeRegIpData.isp &&
      authmeIpData.isp === userIpInfo.isp;

    sendMessage({
      channelId: config.Discord.RecovererAccountChannelId,

      mensaje: `
  >>> ## :clipboard: Usuario: ${userData.username}\n
### Informacion de la base de datos 
 Ultima Ip: ${authmeIpData.query}
 Pais: ${authmeIpData.country}
 Ciudad: ${authmeIpData.city}
 ISP: ${authmeIpData.isp}

### Informacion de registro

 IP De solicitud: ${authmeRegIpData.query}
 Pais: ${authmeRegIpData.country}
 Ciudad: ${authmeRegIpData.city}
 ISP: ${authmeRegIpData.isp}

### Informacion de la solicitud

 IP De solicitud: ${userIpInfo.query}
 Pais: ${userIpInfo.country}
 Ciudad: ${userIpInfo.city}
 ISP: ${userIpInfo.isp}
 Version: ${userData.edition}

### Coincidencias
 IP: ${ipMatch ? ":white_check_mark:" : ":x:"}
 Pais: ${countryMatch ? ":white_check_mark:" : ":x:"}
 Ciudad: ${cityMatch ? ":white_check_mark:" : ":x:"}
 ISP: ${ispMatch ? ":white_check_mark:" : ":x:"}`,
    });
    return { status: true, error: false };
  } catch (error) {
    console.log(error);
    return { status: false, error: error };
  }
}

app.get("/api", async (req, res) => {
  try {
    const status = await Logger(req);

    if (!status.error) {
      res.json(status);
    } else {
      res.json({ status: false, error: "Error getting player data" });
    }
  } catch (error) {
    console.error(error);
    res.json({ status: false, error: "Internal server error" });
  }
});
app.listen(config.WebServer.port, () => {
  console.log(`Server on port ${config.WebServer.port}`);
});
