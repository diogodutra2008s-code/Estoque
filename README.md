# Sistema de Estoque

Sistema desenvolvido em JavaScript (Node.js) para controle de produtos, estoque e vendas, via linha de comando.

## Funcionalidades

- Cadastro de produtos
- Consulta de produtos (por ID ou nome)
- Controle de estoque (entrada e saída)
- Registro de vendas (com baixa automática no estoque)
- Relatório de produtos (valor em estoque, itens vendidos, alerta de estoque baixo)
- Exclusão de produtos

## Tecnologias

- JavaScript
- Node.js (sem dependências externas)

## Estrutura do projeto

```
estoque/
├── dados/
│   └── estoque.json      # "banco de dados" local, em JSON
├── db.js                 # leitura e escrita dos dados
├── produtos.js            # regras de cadastro/consulta/estoque
├── vendas.js               # regras de registro de vendas
├── relatorios.js            # geração de relatórios
├── index.js                  # menu principal (interface no terminal)
├── package.json
└── README.md
```

## Como executar

1. Clone o repositório
   ```
   git clone https://github.com/diogodutra2008s-code/Estoque.git
   ```
2. Entre na pasta do projeto
   ```
   cd Estoque
   ```
3. Execute o sistema (não precisa instalar nada, usa só Node.js nativo)
   ```
   node index.js
   ```
4. Use o menu numérico exibido no terminal para navegar entre as opções.

## Próximos passos (roadmap)

- [ ] Validação mais rígida dos dados digitados
- [ ] Testes automatizados
- [ ] Interface web (ex: Express + front-end simples)
- [ ] Exportação de relatórios em CSV/PDF
