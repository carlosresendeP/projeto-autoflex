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

criação dos types
Criaçao do store(hook, index, productionSlide e prouductSlide)
criação do schema dos produtos com zod
criação da pagina de produtos
criação do componente card geral
criação do form com react hook form

rota : http://localhost:5173/products

no geral a pagina de produtos carrega todos os produtos q vem do banco de dados e agora é possivel criar produtos

criação da pagina de materias-primas
criação do componente materialDetailsModal e productDetailsModal
criação do de um novo card ao clair no card tanto de produtos quanto de materias-primas
adiição do /put e /delete o slide de produtos e materias-primas
logica de edição e exclusão de produtos e materias-primas
edição do product.tsx e material.tsx para que seja possivel editar e excluir

rota : http://localhost:5173/materials

Ficou assim apos as melhorias: Agora é possivel criar, editar e excluir produtos e materias-primas 

criação da pagina composition
criação do compositionform
criação do compositionSlide e schema
criação do kpicard para mostrar a produção sugerida e receita
estilização do header e footer
Melhorias no Home

Agora o quando acessa o /compositions é possivel ver a tabela de produtos e seu material e criar um nova composição com os produtos e materias-primas com a quantidade necessária.


adcionar o toast para mostrar mensagens de sucesso e erro
npm i react-toastify
corrigir a responsividade do frontend 
correção de erros
correção na busca de produtos, materias-primas e composição feedback do usuário
remoção de comentarios do codigo e correção de linguagem