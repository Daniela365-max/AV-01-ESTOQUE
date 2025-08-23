// Arquivo: api-produto/knexfile.js
module.exports = {
  development: {
    client: 'sqlite3', // Driver do banco de dados
    connection: {
      filename: './produtos.sqlite3' // Arquivo do banco de dados
    },
    useNullAsDefault: true, // Configuração padrão para SQLite
    migrations: {
      directory: './migrations' // Diretório para versionamento de schema
    }
  }
};
