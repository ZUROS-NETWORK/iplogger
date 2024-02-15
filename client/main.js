const config = {
  ApiUrl: "http://localhost:3000/api/",
};

async function iplogger(api) {
  const response = await fetch(api);
  const data = await response.json();
  return data;
}

document
  .getElementById("data")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const edition = document.getElementById("edition").value;

    const status = await iplogger(
      `${config.ApiUrl}?username=${username}&edition=${edition}`
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
  });
