# Projeto SamTech

Este projeto é uma aplicação baseada em Node.js e Angular que utiliza um banco de dados MySQL para armazenar dados. Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

## Pré-requisitos

Antes de começar, verifique se o seu ambiente atende aos seguintes requisitos:

- **Node.js** instalado em seu sistema
- **MySQL** instalado e configurado para permitir conexões com o usuário `root` sem senha

> **Nota:** Este projeto foi configurado para uso com MySQL, mas você pode adaptar para PostgreSQL ou outro banco de dados, se necessário.

## Configuração do Banco de Dados

1. **Criar o Banco de Dados e Usuário**:
   - Abra o MySQL e crie um banco de dados com o nome `sam`:
     ```sql
     CREATE DATABASE sam;
     ```
   - Crie um usuário `root` sem senha (ou ajuste o arquivo de configuração conforme sua preferência):
     ```sql
     CREATE USER 'root'@'localhost' IDENTIFIED BY '';
     GRANT ALL PRIVILEGES ON sam.* TO 'root'@'localhost';
     FLUSH PRIVILEGES;
     ```
   
2. **Executar o Script SQL**:
   - No MySQL, execute os comandos SQL contidos no arquivo `samTech.sql` para criar as tabelas e inserir os dados necessários para o funcionamento da aplicação.
   - Exemplo:
     ```bash
     mysql -u root sam < path/to/samTech.sql
     ```
   - **Nota**: Se você alterou o nome do banco de dados, usuário ou senha, atualize as configurações no arquivo `database.js`.

## Configuração do Projeto

1. **Instalar Dependências (Backend e Frontend)**:
   - Abra o **Visual Studio Code** na pasta do projeto.
   - No terminal do VSCode, navegue até a pasta do servidor:
     ```bash
     cd server
     ```
   - Instale as dependências do backend:
     ```bash
     npm install
     ```
   - Depois de instalar as dependências do backend, vá para a pasta do cliente (frontend):
     ```bash
     cd ../client
     ```
   - Instale as dependências do frontend:
     ```bash
     npm install
     ```

## Inicializar o Projeto

1. **Iniciar o Servidor Backend**:
   - No terminal do VSCode, na pasta `server`, execute o comando:
     ```bash
     npm start
     ```
   - O servidor será iniciado na porta configurada (geralmente `http://localhost:3000`).

2. **Iniciar o Frontend**:
   - Abra um novo terminal no VSCode e navegue até a pasta `client`:
     ```bash
     cd client
     ```
   - Inicie o servidor do Angular:
     ```bash
     ng serve
     ```
   - O frontend será iniciado em `http://localhost:4200`.

3. **Acessar a Aplicação**:
   - No navegador, acesse o link: `http://localhost:4200`.
   - Use as credenciais abaixo para fazer login (dados de login são fornecidos pelo script SQL):
     - **Usuário:** `samantha@tech.com`
     - **Senha:** `123456`

## Estrutura do Projeto

```plaintext
.
├── server               # Código do backend (Node.js)
│   ├── controllers      # Controladores do backend
│   ├── config           # Configurações de banco de dados
│   ├── models           # Modelos do banco de dados
│   └── ...
├── client               # Código do frontend (Angular)
│   ├── src              # Arquivos principais do Angular
│   └── ...
└── samTech.sql          # Script SQL para criação do banco de dados
