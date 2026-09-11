const fs = require('fs');
const path = require('path');

const CAMINHO_DB = path.join(__dirname, 'dados', 'estoque.json');

function carregarDados() {
  if (!fs.existsSync(CAMINHO_DB)) {
    const dadosIniciais = {
      produtos: [],
      vendas: [],
      proximoIdProduto: 1,
      proximoIdVenda: 1
    };
    salvarDados(dadosIniciais);
    return dadosIniciais;
  }

  const conteudo = fs.readFileSync(CAMINHO_DB, 'utf-8');
  return JSON.parse(conteudo);
}

function salvarDados(dados) {
  const pasta = path.dirname(CAMINHO_DB);
  if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta, { recursive: true });
  }
  fs.writeFileSync(CAMINHO_DB, JSON.stringify(dados, null, 2), 'utf-8');
}

module.exports = { carregarDados, salvarDados };
