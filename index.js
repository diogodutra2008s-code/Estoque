const readline = require('readline');
const {
  cadastrarProduto,
  listarProdutos,
  buscarProduto,
  atualizarEstoque,
  excluirProduto
} = require('./produtos');
const { registrarVenda, listarVendas } = require('./vendas');
const { gerarRelatorio } = require('./relatorios');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function perguntar(texto) {
  return new Promise((resolve) => rl.question(texto, (resposta) => resolve(resposta.trim())));
}

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function mostrarMenu() {
  console.log('\n================================');
  console.log('       SISTEMA DE ESTOQUE');
  console.log('================================');
  console.log('1. Cadastrar produto');
  console.log('2. Listar produtos');
  console.log('3. Buscar produto');
  console.log('4. Entrada de estoque');
  console.log('5. Saída de estoque');
  console.log('6. Registrar venda');
  console.log('7. Listar vendas');
  console.log('8. Relatório de produtos');
  console.log('9. Excluir produto');
  console.log('0. Sair');
}

function imprimirProduto(p) {
  console.log(
    `#${p.id} | ${p.nome} | Categoria: ${p.categoria} | Qtd: ${p.quantidade} | Custo: ${formatarMoeda(
      p.precoCusto
    )} | Venda: ${formatarMoeda(p.precoVenda)}`
  );
}

async function opcaoCadastrar() {
  const nome = await perguntar('Nome do produto: ');
  const categoria = await perguntar('Categoria: ');
  const quantidade = await perguntar('Quantidade inicial: ');
  const precoCusto = await perguntar('Preço de custo: ');
  const precoVenda = await perguntar('Preço de venda: ');

  const produto = cadastrarProduto({ nome, categoria, quantidade, precoCusto, precoVenda });
  console.log('\nProduto cadastrado com sucesso!');
  imprimirProduto(produto);
}

async function opcaoListar() {
  const produtos = listarProdutos();
  if (produtos.length === 0) {
    console.log('\nNenhum produto cadastrado ainda.');
    return;
  }
  console.log('\n--- Produtos cadastrados ---');
  produtos.forEach(imprimirProduto);
}

async function opcaoBuscar() {
  const termo = await perguntar('Digite o ID ou nome do produto: ');
  const resultado = buscarProduto(termo);
  if (resultado.length === 0) {
    console.log('\nNenhum produto encontrado.');
    return;
  }
  console.log('\n--- Resultado da busca ---');
  resultado.forEach(imprimirProduto);
}

async function opcaoMovimentarEstoque(tipo) {
  const id = await perguntar('ID do produto: ');
  const quantidade = await perguntar(`Quantidade de ${tipo}: `);
  try {
    const produto = atualizarEstoque(id, quantidade, tipo);
    console.log('\nEstoque atualizado com sucesso!');
    imprimirProduto(produto);
  } catch (erro) {
    console.log(`\nErro: ${erro.message}`);
  }
}

async function opcaoRegistrarVenda() {
  const produtoId = await perguntar('ID do produto vendido: ');
  const quantidade = await perguntar('Quantidade vendida: ');
  try {
    const venda = registrarVenda(produtoId, quantidade);
    console.log('\nVenda registrada com sucesso!');
    console.log(`${venda.produtoNome} x${venda.quantidade} = ${formatarMoeda(venda.total)}`);
  } catch (erro) {
    console.log(`\nErro: ${erro.message}`);
  }
}

async function opcaoListarVendas() {
  const vendas = listarVendas();
  if (vendas.length === 0) {
    console.log('\nNenhuma venda registrada ainda.');
    return;
  }
  console.log('\n--- Vendas realizadas ---');
  vendas.forEach((v) => {
    console.log(
      `#${v.id} | ${v.produtoNome} | Qtd: ${v.quantidade} | Total: ${formatarMoeda(
        v.total
      )} | Data: ${new Date(v.data).toLocaleString('pt-BR')}`
    );
  });
}

async function opcaoRelatorio() {
  const relatorio = gerarRelatorio();
  console.log('\n--- Relatório de Produtos ---');
  console.log(`Total de produtos cadastrados: ${relatorio.totalProdutos}`);
  console.log(`Valor total em estoque (custo): ${formatarMoeda(relatorio.valorTotalEstoque)}`);
  console.log(`Total de vendas realizadas: ${relatorio.totalVendas}`);
  console.log(`Total de itens vendidos: ${relatorio.totalItensVendidos}`);
  console.log(`Valor total vendido: ${formatarMoeda(relatorio.totalVendido)}`);

  if (relatorio.produtosBaixoEstoque.length > 0) {
    console.log('\nAtenção: produtos com estoque baixo:');
    relatorio.produtosBaixoEstoque.forEach(imprimirProduto);
  }
}

async function opcaoExcluir() {
  const id = await perguntar('ID do produto a excluir: ');
  try {
    const removido = excluirProduto(id);
    console.log(`\nProduto "${removido.nome}" removido com sucesso.`);
  } catch (erro) {
    console.log(`\nErro: ${erro.message}`);
  }
}

async function iniciar() {
  console.log('====================================');
  console.log('     SISTEMA DE ESTOQUE');
  console.log('====================================');
  console.log('Sistema iniciado com sucesso!');

  let continuar = true;
  while (continuar) {
    mostrarMenu();
    const opcao = await perguntar('\nEscolha uma opção: ');

    switch (opcao) {
      case '1':
        await opcaoCadastrar();
        break;
      case '2':
        await opcaoListar();
        break;
      case '3':
        await opcaoBuscar();
        break;
      case '4':
        await opcaoMovimentarEstoque('entrada');
        break;
      case '5':
        await opcaoMovimentarEstoque('saida');
        break;
      case '6':
        await opcaoRegistrarVenda();
        break;
      case '7':
        await opcaoListarVendas();
        break;
      case '8':
        await opcaoRelatorio();
        break;
      case '9':
        await opcaoExcluir();
        break;
      case '0':
        continuar = false;
        break;
      default:
        console.log('\nOpção inválida, tente novamente.');
    }
  }

  console.log('\nAté logo!');
  rl.close();
}

iniciar();
