const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  database: "postgres",
  password: "48da442a8944ea9a",
  port: "9991",
  host: "db.chooh.moe",
});

client
  .connect()
  .then(() => {
    console.log("Successful connection to the database !");
    client.query('SET search_path TO "KDX Schemas";');
  })
  .catch((error) => {
    console.error("Unable to connect to database: ", error);
  });

module.exports = {
  query: (text, value) => {
    return client.query(text, value);
  },
};
