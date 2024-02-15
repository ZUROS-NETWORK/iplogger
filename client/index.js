import path from "path";
import express from "express";
const port = 3001;
const app = express();
app.use(express.static(path.join(path.resolve(), "/")));

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
