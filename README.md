<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://res.cloudinary.com/dmo7nzytn/image/upload/v1687912863/308830962_436245725278167_5731677229795523086_n_n9g23c.png" width="300" alt="Arbitralis Logo" /></a>
</p>

# Descrição
Este repositório contém o back-end da API de clima/tempo desenvolvida para o teste técnico da empresa Arbitralis. O back-end é responsável por fornecer os dados meteorológicos solicitados pelos usuários estabelecendo conexões com outras APIs, gerenciar a autenticação dos mesmos e mediação para o armazenamento dos dados no banco de dados PostgreSQL.

## Funcionalidades
- Consultar o clima atual de uma determinada cidade atráves da comunicação com a API openWeatherMap e API Geocoding do Google 🖥 <br>
- Autenticação utilizando JSON Web Token (JWT).
- Armazenamento de dados no banco de dados PostgreSQL.

## Tecnologias Utilizadas
- Framework: Nest.js
- Biblioteca de validação: JSON Web Token (JWT)
- Banco de Dados: PostgreSQL

## Rodando localmente
1. Clone o repositório
```bash
~$ git clone https://github.com/adrian-s-costa/arbitralis-back.git
```
3. Dentro do diretório onde o repositório foi clonado, instale as dependências
```bash
~$ npm i
```
4. Recrie o banco de dados em sua máquina através do arquivo `arbitrales-dump.sql`
5. Crie um aquivo `.env` na raíz do projeto e o configure de acordo com suas particularidades seguindo o padrão do `.env.example` para os nomes das variáveis de ambiente
```bash
  PORT=porta_em_que_API_vai_rodar
  JWT_SECRET=qualquer_valor_server
  OPEN_WEATHER_API_KEY=744e9bd530130dda6f010c9d2f151042
  PG_USER=nome_de_usuário_do_pgAdmin_ou_psql
  PG_PASSWORD=senha_dessa_conta_acima
  PG_DATABASE=nome_do_banco
```
As chaves de API podem ser replicadas tranquilamente, foram expostas a fim de diminuir a complexidade de rodar o projeto 
6. Execute o comando `npm run start`
```bash
~$ npm run start
```
Pronto! A API estará rodando em `http://localhost:[PORTA-ESCOLHIDA]` 😊 
(Não esqueça que essa URL que precisa ser colocada no config.js do front)

# Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
