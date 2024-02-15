import axios from "axios";

export async function ipData(ip) {
  const result = await new Promise(async (resolve, reject) => {
    await axios
      .get(
        `http://ip-api.com/json/${ip}?fields=continent,continentCode,country,countryCode,region,regionName,city,offset,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`
      )
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error(`Error getting ip data`));
        }
      })
      .catch((error) => {
        console.error(`Error connecting to ip-api.com ${error.message}`);
        reject(error);
      });
  });

  return result;
}
