// Em migrations/TIMESTAMP_criar_tabela_produtos.js
exports.up = function(knex) {
  return knex.schema.createTable('produtos', (table) => {
    table.increments('id').primary();         // ID auto-increment
    table.string('nome').notNullable();       // Nome do produto
    table.decimal('preco', 10, 2).notNullable(); // Preço do produto com 2 casas decimais
    table.integer('quantidade').notNullable();   // Quantidade disponível
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('produtos');    // Deleta a tabela ao reverter
};