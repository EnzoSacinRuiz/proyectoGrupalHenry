const server = require("./src/server");
const { conn, isLocal } = require('./src/db.js');
const PORT = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
server.listen(PORT, isLocal ? null : "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
