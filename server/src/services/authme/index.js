import mysql from "mysql2";
import config from "../../config/config.js";
console.log(config);
export async function authmeInfo(username) {
  const connection = mysql.createConnection(config.Authme.Mysql);

  const result = await new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(new Error("Authme database connection error: " + err));
      }
      connection.query(
        "SELECT * FROM authme WHERE username = ?",
        [username],
        (err, results) => {
          if (err) {
            reject(new Error("Error getting player data"));
          } else {
            if (results.length > 0) {
              resolve(results[0]);
            } else {
              reject(new Error("Error getting player data"));
            }
          }

          connection.end();
        }
      );
    });
  });

  return result;
}
