import { Category } from "./category";
import { omit } from "lodash";
import UniqueEntityId from "@seedwork/domain/unique-entity-id.vo";

describe("Category Unit Tests", () => {
  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });
    let props = omit(category.props, "created_at");
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: "Movie",
      description: "Some description",
      is_active: false,
    });
    let created_at = new Date();
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "Some description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "Another description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "Another description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("id field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.id).toBeInstanceOf(UniqueEntityId);

    const uniqueEntityId = new UniqueEntityId();
    category = new Category({ name: "Movie" }, uniqueEntityId);
    expect(category.id).toBe(uniqueEntityId);
  });

  test("getter of name prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("getter and setter of description prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.description).toBe(null);

    category = new Category({ name: "Movie", description: "Some description" });
    expect(category.description).toBe("Some description");

    // Podemos usar o [] para testarmos o setters em metodos privados
    category["description"] = "Other description";
    expect(category.description).toBe("Other description");

    category["description"] = null;
    expect(category.description).toBeNull();

    category["description"] = undefined;
    expect(category.description).toBeNull();
  });

  test("getter and setter of is_active prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: true });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy();

    category["is_active"] = false;
    expect(category.is_active).toBeFalsy();

    category["is_active"] = undefined;
    expect(category.is_active).toBeTruthy();
  });

  test("getter of created_at prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({ name: "Movie", created_at: created_at });
    expect(category.created_at).toBe(created_at);
  });
});
