const { Client } = require('pg');

const connectionString = 'postgres://rdpudmff:Q7YEDNlXwiRMLVUMDzRVqNXyGb4UV1Wx@rain.db.elephantsql.com/rdpudmff';

const client = new Client({
    connectionString: connectionString
});

client.connect().then(() => {
    console.log('Successful connection to the database !');
}).catch(error => {
    console.error('Unable to connect to database: ', error);
});

module.exports = {
    query: (text, value) => {
        return client.query(text, value);
    }
};