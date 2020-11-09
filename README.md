Construção de UM RES API

. Verificar se tem o node instalado

> node --version

. Verificar se tem o npm instalado

> npm --version

. Criar uma pasta para o projeto

> mkdir NOME-DA-PASTA

. Iniciar o projeto

> npm init

. Abrir o projeto no vs code

> code .

. Instalar as dependências

> npm install --save express

. Criar o arquivo para filtrar o que será enviado para o git

> .gitignore

. Acrescentar a pasta node_modules para não ser incluída no repositório

> node_modules/

Obs.
http.cat
para saber mais sobre os status do http

. Biblioteca morgan
.. Monitora as chamadas http e mostra um log no console

> npm install --save morgan

. Body-parser
.. Definir o corpo da requisição

> npm install --save body-parser

CORS
. Cross Origin Resource Sharing
Permite que o site acesse outro site dependendo das restrições do headers do http
É um mecanismo utilizado pelos navegadores para compartilhar recursos entre diferentes origens

    > https://www.treinaweb.com.br/blog/o-que-e-cors-e-como-resolver-os-principais-erros/
