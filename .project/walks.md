Descrição do problema:

Uma indústria que produz produtos diversos, necessita controlar o estoque dos insumos (matérias-primas) necessárias para a produção dos itens que fabrica. Para isso será necessário o desenvolvimento de um sistema que permita manter o controle dos produtos e das matérias-primas que são utilizadas para a produção de cada produto.

Para o produto devem ser armazenados, além do código, o nome e o valor.

Para as matérias-primas, além do código, também devem armazenados o nome e quantidade em estoque. Obviamente, deverá ser feito a associação dos produtos e das matérias primas que o compõem, com as respectivas quantidades necessárias de cada matéria prima para produzir o produto.

Além da manutenção dos cadastros, deseja-se saber quais produtos (e quais quantidades) podem ser produzidos com as matérias-primas em estoque, e o valor total que será obtido com a produção sugerida pelo sistema.

A priorização de quais produtos devem ser sugeridos pelo sistema, deve ser pelos produtos de maior valor, uma vez que uma determinada matéria-prima pode ser utilizada em mais de um produto.




#passo a passo

## 1. Crie a estrutura do projeto

/backend
quarkus create app com.autoflex:inventory-management `
    --extension="resteasy-reactive,resteasy-reactive-jackson,hibernate-orm-panache,jdbc-postgresql" `
    --no-code

quarkus dev  - rodar o projeto0  **ok**

/frontend

instalar frontend
npm create vite@latest frontend -- --template react
instalar tailwindcss
npm install tailwindcss @tailwindcss/vite
instalar redux
npm install @reduxjs/toolkit react-redux
instalar react-router
npx create-react-router@latest
instalar react-hook-form
npm install react-hook-form
instalar axios
npm install axios

testar funcionamento do frontend  **ok**

## Criando os arquivos e a logica do backend
*voltando ao backend*
/backend

criação das pastas
java/com/autoflex
-models
    -produto (codigo, nome e valor)
    -materiaPrima (codigo, nome e quantidade)
    -produtoMateriaPrima (produto, materiaPrima, quantidade)
    -sugestão de produto DTO (nome, quantidade e valor)
-resources
    -productResource(/products , get, post, put, delete)
    -RawmaterialResource(/materials , get, post, put, delete)
    -ProductIngredientResource(/ingredients , get, post, put, delete)
    -productionResorce(/suggestions , get)
-services
    -ProductionSevice (Vai calcular a produção sugerida)

-adcionar o cors como true no resourse

criando um banco com o docker  (docker run --name ... )
mudando nome de uma rota
testes de requisisoes de todas as rotas
get, post, put, e delete *ok*


### Criando os arquivos e a logica do frontend
*voltado do frontend*
criação de algumas pastas=> pages, services, types, components, store
.env
    Api URL localhost:8080
services
    -api.ts (com axios)

