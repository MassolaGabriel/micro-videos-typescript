import { values } from "lodash";
import ValueObject from "../value-object";

// Stub diferente do mock cria uma instancia real
class StubValueObject extends ValueObject {}

describe("ValueObject Unit Tests", () => {
  it("should set value", () => {
    let vo = new StubValueObject("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ prop1: "value1" });
    expect(vo.value).toStrictEqual({ prop1: "value1" });
  });

  it("should convert to a string", () => {
    const date = new Date();
    let arrange = [
      { received: "", expect: "" },
      { received: "fake test", expect: "fake test" },
      { received: 0, expect: "0" },
      { received: 1, expect: "1" },
      { received: 5, expect: "5" },
      { received: true, expect: "true" },
      { received: false, expect: "false" },
      { received: date, expect: date.toString() },
      {
        received: { prop1: "value1" },
        expect: JSON.stringify({ prop1: "value1" }),
      },
    ];

    arrange.forEach((value) => {
      const vo = new StubValueObject(value.received);
      expect(vo + "").toBe(value.expect);
    });
  });

  it("should be immutable", () => {
    const vo = new StubValueObject({
      prop1: "value1",
      nested: { prop2: "value2" },
    });

    console.log(vo);

    expect(() => { vo["_value"].nested.prop2 = "mudou" }).toThrow(TypeError)
  });
});
