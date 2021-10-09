const mongoose = require("mongoose");

function ConnectDatabase() {
  mongoose
    .connect(process.env.DB_URL, {
      useNewurlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then((data) =>
      console.log(`mongoo db connected to server ${data.connection.host}`)
    )
    .catch((err) => console.log(err));
}

module.exports = ConnectDatabase;
