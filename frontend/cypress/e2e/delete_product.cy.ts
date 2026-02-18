describe("AutoFlex - Teste de Exclusão de Produtos", () => {
  // Criamos nomes dinâmicos para evitar conflitos no PostgreSQL [cite: 2026-02-10]
  const uniqueId = Date.now();
  const productName = `Produto Teste ${uniqueId}`;
  const productCode = `CODE-${uniqueId}`;

  beforeEach(() => {
    // Interceptamos as chamadas da API para o robô saber esperar o Backend
    cy.intercept("GET", "/api/products").as("getProducts");
    cy.intercept("POST", "/api/products").as("createProduct");
    cy.intercept("DELETE", "/api/products/*").as("deleteProduct");

    cy.visit("/products");
    cy.wait("@getProducts");
  });

  it("deve criar e excluir um produto com sucesso", () => {
    // --- PASSO 1: CRIAR (RF005) ---
    cy.contains("button", "+ Novo Produto").click();

    cy.get('input[name="code"]').type(productCode);
    cy.get('input[name="name"]').type(productName);
    cy.get('input[name="value"]').type("100.50");

    cy.contains("button", "Salvar Produto").click();

    // Espera o backend responder e o item aparecer na lista
    cy.wait("@createProduct");
    cy.contains(productName, { timeout: 10000 }).should("be.visible");

    // --- PASSO 2: ABRIR MODAL ---
    // Clicamos no card. O { force: true } ignora qualquer Toastify que esteja na frente
    cy.contains(productName).click({ force: true });

    // EM VEZ DE BUSCAR O TÍTULO, VAMOS BUSCAR O BOTÃO DE EXCLUIR OU APAGAR
    // Se o botão aparecer, temos certeza que o modal abriu com sucesso [cite: 2026-02-10]
    cy.get("button", { timeout: 15000 })
      .contains(/(excluir|apagar)/i) // O regex ignora se é maiúsculo ou minúsculo
      .should("be.visible");

    // --- PASSO 3: EXCLUIR ---
    cy.contains("button", /(excluir|apagar)/i).click();

    // Aguarda o Quarkus processar a exclusão (Status 204 ou 200)
    cy.wait("@deleteProduct")
      .its("response.statusCode")
      .should("be.oneOf", [200, 204]);

    // Valida se o Toastify de sucesso apareceu [cite: 2026-02-10]
    cy.get(".Toastify").should("be.visible");

    // --- PASSO 4: VERIFICAÇÃO FINAL ---
    // O produto não pode mais existir no DOM (na tela)
    cy.contains(productName).should("not.exist");
  });
});
