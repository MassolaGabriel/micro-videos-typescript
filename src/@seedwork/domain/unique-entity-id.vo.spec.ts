import UniqueEntityId from "./unique-entity-id.vo";

describe("UniqueEntityId unit tests", () => {
  // Comecar verificando os erros lancados:
  it("should throw error when uuid is invalid", () => {
    new UniqueEntityId("fake id");
  });
});
