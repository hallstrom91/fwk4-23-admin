require("dotenv").config({ path: [".env.development.local", ".env"] });
const app = require("./service.js");
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Admin server is live on port:${PORT}`);
});
