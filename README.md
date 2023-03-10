

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
***É importante ressaltar que o em si tem 2 sub projetos, backend e frontend, então para que o backend funcione de forma correta, é importante que o banco de dados esteja funcionando. Para o frontend funcionar de forma correta, é necessário que o backend esteja funcionando de forma correta.***

Clone o Projeto

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

Já tinha experiencias com a linguagem PHP e React, mas com o laravel foi um desafio, mesmo já tendo experiencia com o Django, que é um framework muito parecido com o laravel, tive algumas dificuldades de fazer algumas implementações, porém a API foi construída sem muitos problemas.

Usando o React, pude me aprofundar no uso dos Hooks e seus, consegui ver a necessidade do reaproveitamento dos componentes, mas devido ao tempo, não foi possivel realizar essa refatoração, mas consegui implementar o redux, que me axiliou na tarefa de guardar o estado do usuario e algumas informações essenciais, diminuindo as requisições desnecessarias.


![Logo](https://i.imgur.com/yz1ERYd.png)


## Melhorias
- Refatoração do código.
- Abstração de componentes, como o do formulario.
- Melhorias de performance.
- Pensar nas experiencias de usuário de forma mais empática (me colocar no lugar do usuário)
- Implementar o web-socket para atualizar as curtidas em tempo real


## Roadmap

- Melhorar o suporte de navegadores
- Mensagens de erros e sucessos nos formulário (funciona no cadastro de animais do zelador)
- Fazer testes para chegar o funcionamento do codigo
- Atualizar cadastro de usuario do lado do usuario não logado
- Arrumar erros de layout em algumas paginas
- Colocar o projeto no Docker pra poder resolver problemas de dependencia e portabilidade



## Stack utilizada

**Front-end:** React, Redux

**Back-end:** Laravel, Passport, MySql


