import dotenv from "dotenv";
dotenv.config();

const config = {
  WebServer: {
    port: process.env.WEB_API_PORT,
  },
  Authme: {
    Mysql: {
      host: process.env.AUTHME_MYSQL_HOST,
      port: process.env.AUTHME_MYSQL_PORT,
      user: process.env.AUTHME_MYSQL_USER,
      password: process.env.AUTHME_MYSQL_PASSWORD,
      database: process.env.AUTHME_MYSQL_DATABASE,
    },
  },
  Discord: {
    Token: process.env.DISCORD_TOKEN,
    RecovererAccountChannelId: process.env.DISCORD_RECOVERER_ACCOUNT_CHANNEL_ID,
  },
  CrossOrigin: {
    origin: process.env.CROSSORIGIN_ORIGIN,
    methods: process.env.CROSSORIGIN_METHODS,
    credentials: process.env.CROSSORIGIN_CREDENTIALS,
  },
};

export default config;
