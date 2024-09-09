# Formulário Multi-Páginas com ReactJS, Flask e Bootstrap
Este projeto é um sistema de formulário multi-páginas desenvolvido com ReactJS no front-end e Flask no back-end. Ele coleta dados pessoais e de saúde do usuário, valida as informações, e faz o envio para uma API desenvolvida em Flask.

Formulário de três, na web para obter informações da saúde do usuário. 


## Tecnologias Utilizadas  :

- React.js: Para a criação da interface do usuário e manipulação do estado do formulário.
- Bootstrap: Para estilização responsiva e layout do formulário.
- Flask (Python): No backend, para servir a API e lidar com as requisições do formulário.
- Axios: Para realizar requisições HTTP entre o front-end e o back-end.
- CORS: Para permitir que o front-end acesse a API do Flask (cross-origin requests).
- react-hook-form: Para gerenciar a manipulação e validação de formulários no front-end.
- MongoDB (possível implementação futura): Para persistência de dados em um banco de dados NoSQL.
- Docker (possível implementação futura): Para containerização da aplicação e banco de dados.

       
## Funcionalidades
- Formulário Multi-Páginas: Coleta de informações pessoais (nome, CPF, cargo, cidade, etc.) na Página 1, condições de saúde na Página 2 e preferências alimentares na Página 3.
- Validações de Dados: Cada página valida os dados de acordo com os requisitos estabelecidos (e.g., formato de e-mail, CPF válido, campos obrigatórios).
- Persistência de Estado: Os dados do formulário são compartilhados entre as páginas usando um contexto personalizado em React.
- Comunicação Front-end/Back-end: O formulário faz requisições HTTP para o backend em Flask, onde as informações são processadas e retornadas.
- Tipos de Alimentação: A página 3 consome uma API Flask que fornece tipos de alimentação e alimentos correspondentes (Vegano, Vegetariano, Sem Restrição).
- Envio de Formulário: Todos os dados preenchidos nas três páginas são enviados para a rota /submitFormulario, que os processa e retorna uma mensagem de sucesso.

## Estrutura do Projeto

 1. Front-end (React.js)
     - Página 1 (Dados Pessoais): Coleta informações pessoais e valida dados como CPF, estado, email, peso e altura.
     - Página 2 (Condições de Saúde): Apresenta opções para o usuário marcar se possui condições de saúde como diabetes, hipertensão, etc.
     - Página 3 (Preferências Alimentares): Consome uma API de alimentação, permitindo que o usuário selecione o tipo de alimentação e os alimentos consumidos diariamente.

2. Back-end (Flask)
     - Rota /getAlimentacao: Retorna dados sobre os tipos de alimentação e alimentos para serem exibidos na Página 3.
     - Rota /submitFormulario: Recebe os dados preenchidos no formulário e retorna uma mensagem de sucesso com os dados recebidos.
  
       
## Instalação
     - Pré-requisitos
     - Node.js (v14+)
     - Python (v3.7+)
     - Flask e bibliotecas relacionadas
     - Docker (opcional para evolução futura)
     - MongoDB (opcional para evolução futura)

# Passos para rodar o projeto localmente 
    1- Clone este repositório:
    
      bash
      Copiar código
      git clone https://github.com/gui03021995/Google_Forms_Saude
      cd Google_Forms_Saude
      Instale as dependências do front-end:

      bash
      Copiar código
      cd frontend
      npm install
      npm start
      Configure o back-end (Flask):

    2- Crie um ambiente virtual:
      bash
      Copiar código
      python -m venv venv
      source venv/bin/activate  # Para Windows: venv\Scripts\activate
      
    3- Instale as dependências:
      bash
      Copiar código
      pip install -r requirements.txt
      Inicie o servidor Flask:
      bash
      Copiar código
      flask run
    
    4- Acesse o front-end:
      Abra o navegador em http://localhost:3000 para interagir com o formulário.
## Futuras Implementações
    - MongoDB: Para persistir os dados do formulário em um banco de dados NoSQL.
    - Docker: Containerizar a aplicação e o banco de dados para facilitar a implantação.
    
## Contribuição
    Fique à vontade para abrir issues ou pull requests para sugestões e melhorias.
