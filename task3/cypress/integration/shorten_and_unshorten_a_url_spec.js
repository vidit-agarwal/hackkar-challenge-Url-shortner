describe("Shortener UI", () => {
  it("can shorten and unshorten URLs", () => {
    const longUrl = "https://www.hackkar.com?really=needs&ashort=url";
    cy.visit("http://localhost:3001");
    cy.get("#app__url-input").type(longUrl);
    cy.get("#app__url-submit").click();
    cy.get("#app__shortcode-result")
      .invoke("text")
      .should("match", /^[0-9a-zA-Z]{6}$/)
      .then($result => {
        cy.get("#app__shortcode-result").then($div => {
          const shortcode = $div.text();
          console.log(shortcode);
          cy.get("#app__shortcode-input").type(shortcode);
          cy.get("#app__shortcode-submit").click();
          cy.get("#app__url-result")
            .invoke("text")
            .should("contain", longUrl);
        });
      });
  });
});
