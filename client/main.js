async function getConfig() {
  try {
    const response = await fetch("config.json");
    return await response.json();
  } catch (error) {
    alert(
      "Lo sentimos, hubo un error interno del servidor. por favor notifique al staff"
    );
  }
}

async function iplogger(api) {
  try {
    const response = await fetch(api);
    return await response.json();
  } catch (error) {
    alert(
      "Lo sentimos, hubo un error interno del servidor. por favor notifique al staff"
    );
  }
}

document
  .getElementById("data")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      const config = await getConfig();
      const username = document.getElementById("username").value;
      const edition = document.getElementById("edition").value;
      const status = await iplogger(
        `${config.apiURL}?username=${username}&edition=${edition}`
      );
      console.log(status);
      if (status.error) {
        if (edition == "java") {
          alert(
            "Hubo un error asegurate de que tu nombre de usuario sea correcto."
          );
        } else {
          alert(
            "Hubo un error asegurate de que tu nombre de usuario sea correcto. Recuerda que si eres de bedrock debes poner un _ antes de tu nombre"
          );
        }
      } else {
        alert(
          "Solicitud enviada exitosamente ✅, espere a que un staff responda su ticket"
        );
      }
    } catch (error) {
      console.error(error);
    }
  });
