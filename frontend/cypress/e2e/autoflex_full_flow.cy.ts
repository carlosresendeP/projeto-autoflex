describe("AutoFlex - Fluxo Completo de Produção", () => {
  const productName = `Poltrona Teste ${Date.now()}`; // Nome único para não dar erro de código duplicado

  beforeEach(() => {
    // Intercepta as chamadas de API para o Cypress saber quando o backend respondeu
    cy.intercept("GET", "/api/products").as("getProducts");
    cy.intercept("GET", "/api/materials").as("getMaterials");
    cy.intercept("GET", "/api/compositions").as("getCompositions");
    cy.visit("/");
  });

  it("deve realizar o ciclo completo: Material -> Produto -> Composição", () => {
    // --- PASSO 1: MATÉRIA-PRIMA ---
    cy.visit("/materials");
    cy.wait("@getMaterials"); // Espera carregar a lista antes de clicar
    cy.contains("button", "+ Novo Material").click();
    cy.get('input[name="code"]').type(`MAT-${Date.now()}`);
    cy.get('input[name="name"]').type("Espuma D33");
    cy.get('input[name="stockQuantity"]').type("100");
    cy.contains("button", "Salvar Material").click();
    cy.get(".Toastify").should("be.visible");

    // --- PASSO 2: PRODUTO ---
    cy.visit("/products");
    cy.wait("@getProducts");
    cy.contains("button", "+ Novo Produto").click();
    cy.get('input[name="code"]').type(`PROD-${Date.now().toFixed(2)}`);
    cy.get('input[name="name"]').type(productName);
    cy.get('input[name="value"]').type("1500");
    cy.contains("button", "Salvar Produto").click();
    cy.get(".Toastify").should("be.visible");

    // --- PASSO 3: COMPOSIÇÃO (VÍNCULO) ---
    cy.visit("/compositions");
    cy.wait("@getCompositions");
    cy.contains("button", "+ Nova Composição").click();

    // 1. Espera o Select de Produto existir e conter o texto do produto que criamos
    // O Cypress vai tentar por até 10 segundos encontrar a opção antes de dar erro
    cy.get('select[name="productId"]', { timeout: 10000 })
      .should("contain", productName) // Força o robô a esperar o React renderizar o nome [cite: 2026-02-10]
      .select(productName);

    // 2. Faz o mesmo para o Material
    cy.get('select[name="rawMaterialId"]', { timeout: 10000 })
      .should("contain", "Espuma D33")
      .select("Espuma D33");

    cy.get('input[name="quantityRequired"]').type("5");
    cy.contains("button", "Salvar Composição").click();
    cy.get(".Toastify").should("be.visible");
  });

  it("deve exibir o Modal de Detalhes e permitir exclusão", () => {
    cy.visit("/products");
    cy.wait("@getProducts");

    // Clica no card que acabamos de criar
    // O scrollIntoView garante que o robô "enxergue" o card se a lista for longa
    cy.contains(productName).scrollIntoView().click({ force: true });

    // Verifica se o DetailsModal abriu (RF005/RF006) [cite: 2026-02-10]
    cy.contains("Detalhes do Registro", { timeout: 10000 }).should(
      "be.visible",
    );

    // Testa o botão de excluir e o confirm do navegador
    cy.contains("button", /(excluir|apagar)/i).click();
    cy.get(".Toastify").should("be.visible");
  });
});
