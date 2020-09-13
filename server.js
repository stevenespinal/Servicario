const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(serveStatic('build'));

app.get("*", (req, res) => {
  return res.sendFile(path.resolve("build", "index.html"));
});

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`));