const mariadb = require('mariadb');
const pool = mariadb.createPool({
    user: 'root',
    host: '127.0.0.1',
    database: 'sam',
    password: '',
    port: 3306,
    connectionLimit: 20, // Aumente o limite de conexões
    connectTimeout: 10000, // Tempo de conexão inicial
    acquireTimeout: 20000 // Aumente o tempo para adquirir uma conexão
});

module.exports = pool

pool.getConnection()
    .then(conn => {
        console.log("Conexão com o banco de dados estabelecida com sucesso");
        conn.release();
    })
    .catch(err => {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    });