
# Configurações gerias de de usuário da IntranetOne
Serviço que permite configurar os dados gerais da instalação, chaves e dados de redes sociais e configuração visual geral e por usuário
## Conteúdo
 
## Instalação

```sh
composer require dataview/ioconfig
```
```sh
php artisan io-config:install
```

- Configure o webpack conforme abaixo 
```js
...
let config = require('intranetone-config');
io.compile({
  services:[
    ...
    new config(),
    ...
  ]
});

```
- Compile os assets e faça o cache
```sh
npm run dev|prod|watch
php artisan config:cache
```
