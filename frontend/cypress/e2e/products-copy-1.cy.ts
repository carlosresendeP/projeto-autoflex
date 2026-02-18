describe('AutoFlex - Gerenciamento de Produtos', () => {
  beforeEach(() => {
    // Como definimos a baseUrl no config, ele já sabe o início do link
    cy.visit('/products');
  });

  it('deve cadastrar um novo produto com sucesso', () => {
    cy.contains('button', '+ Novo Produto').click();

    cy.get('input[name="code"]').type('CY-100');
    cy.get('input[name="name"]').type('Produto Teste Cypress');
    cy.get('input[name="value"]').type('150.50');

    cy.contains('button', 'Salvar Produto').click();

    // Verifica se o Toastify de sucesso apareceu
    cy.get('.Toastify').should('be.visible');
    cy.contains('sucesso').should('be.visible');
  });
});

it('autoflex_full_flow.cy.ts', function() {});