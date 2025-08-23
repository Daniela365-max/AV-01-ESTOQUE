// Arquivo: api-produtos/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Integração com Knex
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

// --- ROTAS PRODUTOS --- //

// GET /produtos - listar todos
app.get('/produtos', async (req, res) => {
  try {
    const produtos = await knex('produtos').select('*');
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos.' });
  }
});

// GET /produtos/:id - buscar produto por ID
app.get('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await knex('produtos').where('id', id).first();
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado.' });
    res.status(200).json(produto);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ message: 'Erro ao buscar produto.' });
  }
});

// POST /produtos - criar novo produto
app.post('/produtos', async (req, res) => {
  try {
    const { nome, preco, quantidade } = req.body;
    if (!nome || preco == null || quantidade == null) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Inserção no banco
    const [id] = await knex('produtos').insert({ nome, preco, quantidade });
    
    res.status(201).json({ id, nome, preco, quantidade });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ message: 'Erro ao criar produto.' });
  }
});

// PUT /produtos/:id - atualizar produto
app.put('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, quantidade } = req.body;

    if (!nome && preco == null && quantidade == null) {
      return res.status(400).json({ message: 'Pelo menos um campo deve ser fornecido para atualização.' });
    }

    const dadosParaAtualizar = {};
    if (nome) dadosParaAtualizar.nome = nome;
    if (preco != null) dadosParaAtualizar.preco = preco;
    if (quantidade != null) dadosParaAtualizar.quantidade = quantidade;

    const atualizado = await knex('produtos').where('id', id).update(dadosParaAtualizar);
    if (!atualizado) return res.status(404).json({ message: 'Produto não encontrado para atualização.' });

    res.status(200).json({ message: 'Produto atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro ao atualizar produto.' });
  }
});

// DELETE /produtos/:id - deletar produto
app.delete('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await knex('produtos').where('id', id).del();
    if (!deletado) return res.status(404).json({ message: 'Produto não encontrado para exclusão.' });
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ message: 'Erro ao deletar produto.' });
  }
});

// Inicia servidor
app.listen(port, () => {
  console.log(`Servidor da API Produtos rodando em http://localhost:${port}`);
});

