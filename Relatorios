const { carregarDados } = require('./db');

const ESTOQUE_MINIMO = 5;

function gerarRelatorio() {
  const dados = carregarDados();
  const { produtos, vendas } = dados;

  const totalProdutos = produtos.length;
  const valorTotalEstoque = produtos.reduce(
    (soma, p) => soma + p.quantidade * p.precoCusto,
    0
  );
  const produtosBaixoEstoque = produtos.filter((p) => p.quantidade <= ESTOQUE_MINIMO);
  const totalVendido = vendas.reduce((soma, v) => soma + v.total, 0);
  const totalItensVendidos = vendas.reduce((soma, v) => soma + v.quantidade, 0);

  return {
    totalProdutos,
    valorTotalEstoque,
    produtosBaixoEstoque,
    totalVendas: vendas.length,
    totalItensVendidos,
    totalVendido
  };
}

module.exports = { gerarRelatorio, ESTOQUE_MINIMO };
