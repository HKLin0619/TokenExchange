const { Client } = require('pg');

// const connectionString = 'postgres://rdpudmff:Q7YEDNlXwiRMLVUMDzRVqNXyGb4UV1Wx@rain.db.elephantsql.com/rdpudmff';

const client = new Client({
    // connectionString: connectionString
    user: 'postgres',
    database: 'postgres',
    password: '48da442a8944ea9a',
    port: '9991',
    host: 'db.yktk.cf'
});

client.connect().then(() => {
    console.log('Successful connection to the database !');
    client.query('SET search_path TO "KDX Schemas";')
}).catch(error => {
    console.error('Unable to connect to database: ', error);
});

module.exports = {
    query: (text, value) => {
        return client.query(text, value);
    }
};