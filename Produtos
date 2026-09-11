const { carregarDados, salvarDados } = require('./db');

function cadastrarProduto({ nome, categoria, quantidade, precoCusto, precoVenda }) {
  const dados = carregarDados();

  const novoProduto = {
    id: dados.proximoIdProduto,
    nome,
    categoria,
    quantidade: Number(quantidade),
    precoCusto: Number(precoCusto),
    precoVenda: Number(precoVenda),
    criadoEm: new Date().toISOString()
  };

  dados.produtos.push(novoProduto);
  dados.proximoIdProduto += 1;
  salvarDados(dados);

  return novoProduto;
}

function listarProdutos() {
  const dados = carregarDados();
  return dados.produtos;
}

function buscarProduto(termo) {
  const dados = carregarDados();
  const termoLower = String(termo).toLowerCase();

  return dados.produtos.filter(
    (p) => String(p.id) === termoLower || p.nome.toLowerCase().includes(termoLower)
  );
}

function atualizarEstoque(id, quantidade, tipo) {
  const dados = carregarDados();
  const produto = dados.produtos.find((p) => p.id === Number(id));

  if (!produto) {
    throw new Error('Produto não encontrado.');
  }

  if (tipo === 'entrada') {
    produto.quantidade += Number(quantidade);
  } else if (tipo === 'saida') {
    if (produto.quantidade < Number(quantidade)) {
      throw new Error('Estoque insuficiente para essa saída.');
    }
    produto.quantidade -= Number(quantidade);
  } else {
    throw new Error('Tipo de movimentação inválido. Use "entrada" ou "saida".');
  }

  salvarDados(dados);
  return produto;
}

function excluirProduto(id) {
  const dados = carregarDados();
  const indice = dados.produtos.findIndex((p) => p.id === Number(id));

  if (indice === -1) {
    throw new Error('Produto não encontrado.');
  }

  const removido = dados.produtos.splice(indice, 1);
  salvarDados(dados);
  return removido[0];
}

module.exports = {
  cadastrarProduto,
  listarProdutos,
  buscarProduto,
  atualizarEstoque,
  excluirProduto
};
