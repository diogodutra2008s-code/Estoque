const { carregarDados, salvarDados } = require('./db');

function registrarVenda(produtoId, quantidade) {
  const dados = carregarDados();
  const produto = dados.produtos.find((p) => p.id === Number(produtoId));

  if (!produto) {
    throw new Error('Produto não encontrado.');
  }

  if (produto.quantidade < Number(quantidade)) {
    throw new Error(`Estoque insuficiente. Disponível: ${produto.quantidade}`);
  }

  produto.quantidade -= Number(quantidade);

  const venda = {
    id: dados.proximoIdVenda,
    produtoId: produto.id,
    produtoNome: produto.nome,
    quantidade: Number(quantidade),
    precoUnitario: produto.precoVenda,
    total: produto.precoVenda * Number(quantidade),
    data: new Date().toISOString()
  };

  dados.vendas.push(venda);
  dados.proximoIdVenda += 1;
  salvarDados(dados);

  return venda;
}

function listarVendas() {
  const dados = carregarDados();
  return dados.vendas;
}

module.exports = { registrarVenda, listarVendas };
