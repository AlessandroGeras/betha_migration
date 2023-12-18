const oracledb = require('oracledb');
const dbConfig = {
user : 'gt_portal',
password : 'Alaska#25Gc',
connectString : '192.168.0.216/orcl'
};


(async function() {
let conn; // Declared here for scoping purposes

try {
    conn = await oracledb.getConnection(dbConfig);

    console.log('Connected to database');

   

   
} catch (err) {
    console.log('Error in processing', err);
} finally {
    if (conn) { // conn assignment worked, need to close
        try {
            await conn.close();

            console.log('Connection closed');
        } catch (err) {
            console.log('Error closing connection', err);
        }
    }
}
})();