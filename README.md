# Projeto Trybe Futebol Clube

Trybe Futebol Clube foi o 27° projeto realizado durante a formação da Trybe. Esse projeto pertence a seção 10 do Modulo de Back-end e foi desenvolvido em novembro de 2022.

## O que foi desenvolvido

Um site informativo sobre partidas e classificações de futebol. O front-end estava pronto sendo necessario desenvolver apenas o back-end.


## Como rodar a aplicação

- Clone o repositório com `git@github.com:GusCabraal/trybe-futebol-clube.git`
- Instale as dependencias `npm install`
- Rode o script `npm run compose:up:dev`, esse script subirá o front-end na porta 3000, o back-end na porta 3001 e o banco de dados na porta 3002;
- Acesse o front end no localmente no endereço `http://localhost:3000`;
- Importe o arquivo `routes-project-trybe-futebol-clube.json` para dentro do Insominia
- Consuma a API sem moderação.

## Rotas da aplicação

### Rotas de usuário

- POST `/login` -> Faz o login na aplicação;
- POST `/login/validate` -> Retorna a função do usuario logado;

### Rotas de times

- GET `/teams` -> Lista todos os times;
- GET `/teams/:id` -> Busca um time pelo seu ID;

### Rotas de partidas

- GET `/matches` -> Lista todas as partidas;
- GET `/matches?inProgress=status` -> Filtra as partidas por `em progresso` e `finalizadas`;
- POST `/matches` -> Cadastra uma nova partida;
- PATCH `/matches/:id` -> Finaliza uma partida em andamento;

### Rotas de classificação

- GET `/leaderboard` -> Retorna a tabela de classificação completa;
- GET `/leaderboard/home` -> Retorna a tabela de classificação apenas dos times mandantes;
- GET `/leaderboard/away` -> Retorna a tabela de classificação apenas dos times visitantes;