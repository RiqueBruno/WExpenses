# 💰 WExpenses - Carteira de Controle de Despesas

![Project Banner](https://via.placeholder.com/1200x400?text=WExpenses+Preview)
> Uma carteira digital inteligente para gerenciamento de gastos com conversão de moedas em tempo real.

[![Deploy](https://img.shields.io/badge/Acesse_o_App-Ver_Online-green?style=for-the-badge&logo=vercel)](https://wexpenses.vercel.app/)
## 💸 Sobre o Projeto

O **WExpenses** é uma aplicação de controle financeiro desenvolvida para resolver um problema comum: gerenciar gastos em múltiplas moedas (Dólar, Euro, Libra) convertendo automaticamente para a moeda local (Real Brasileiro).

Este projeto foi um marco no meu desenvolvimento pois foca intensamente em **Gerenciamento de Estado Global** complexo. Diferente de aplicações simples, aqui os dados precisam trafegar entre componentes distantes (Header, Tabela, Formulário) de forma sincronizada.

## ⚙️ Arquitetura e Redux

A principal "engenharia" deste projeto está no uso do **Redux** para manter a verdade única dos dados (Single Source of Truth).
- **Store Global:** Armazena o saldo total e o array de despesas.
- **Redux Thunk:** Utilizado para lidar com a assincronicidade da API de cotações antes de disparar as actions para o Reducer.

## ✨ Funcionalidades

- 🔐 **Login:** Validação de formato de email e senha segura.
- 💵 **Registro de Despesa:** Adicione gastos informando valor, descrição, moeda, método de pagamento (Dinheiro/Cartão) e categoria.
- 💱 **Conversão em Tempo Real:** Ao adicionar uma despesa em Dólar (ou outra moeda), a aplicação consulta uma API de Cotações atualizada e salva o valor convertido.
- 📊 **Tabela de Gastos:** Visualização detalhada de todas as transações.
- 🗑️ **Edição e Exclusão:** Remova ou edite itens da tabela, com recálculo automático do saldo total no cabeçalho.

## 🚀 Tecnologias Utilizadas

- **[React.js](https://reactjs.org/)** - Construção da UI.
- **[Redux](https://redux.js.org/)** - Gerenciamento de estado global.
- **Redux Thunk** - Middleware para requisições assíncronas.
- **React Router** - Navegação entre páginas.
- **AwesomeAPI** - API pública utilizada para obter as cotações das moedas.
- **CSS3** - Estilização.

## 📂 Como Rodar o Projeto

```bash
# 1. Clone o repositório
git clone [https://github.com/RiqueBruno/WExpenses.git](https://github.com/RiqueBruno/WExpenses.git)

# 2. Entre na pasta
cd WExpenses

# 3. Instale as dependências
npm install

# 4. Inicie a aplicação
npm start
