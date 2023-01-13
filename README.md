
# Match dos Animais

O match dos animais foi uma iniciativa do **Zoologico Bagunceiro** juntamente com a **Codificar**
para desenvolver uma aplicação que possibilita que os usuario possam saber de quem cada um gostam
e desgostam entre sí.

Essa é um teste, usando ReactTypeScript e Laravel, ainda se encotnra no modelo MVP.
## Referência

 - [Dribble](https://dribbble.com/tags/top_nav)
 - [Laravel Eloquent](https://laravel.com/docs/9.x/eloquent)
 - [React Hooks](https://reactjs.org/docs/hooks-state.html)


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/oBraganca/Zoologico-Bagunceiro.git
```
### Servidor Side
Entre no diretório do projeto backend

```bash
  cd backend
```

Instale as dependências

```bash
  composer install
```
### Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DB_DATABASE`

`IMGUR_CLIENT_ID`

***Não se esqueça de entrar no .env e configurar sua chave de cliente do imgur
e suas configurações do banco de dados***
### Migragens e Seeders
Migrates
```bash
php artisan migrate
```
Passport
```bash
php artisan passport:install
```
Seeders
```bash
php artisan db:seed
```


Com as suas configurações de banco de dados configuradas, basta inicie o servidor

```bash
php artisan serve
```


### Client Side
Entre no diretório do projeto frontend

```bash
  cd frontend
```


Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```


## Autores

- [@oBraganca](https://github.com/oBraganca/)


## Demonstração

Insira um gif ou um link de alguma demonstração


## Funcionalidades

- Temas dark e light
- Preview em tempo real
- Modo tela cheia
- Multiplataforma


## Aprendizados

O que você aprendeu construindo esse projeto? Quais desafios você enfrentou e como você superou-os?


![Logo](https://i.imgur.com/yz1ERYd.png)


## Melhorias

Que melhorias você fez no seu código? Ex: refatorações, melhorias de performance, acessibilidade, etc


## Roadmap

- Melhorar o suporte de navegadores

- Adicionar mais integrações


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Stack utilizada

**Front-end:** React, Redux

**Back-end:** Laravel, Passport MySql


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```

