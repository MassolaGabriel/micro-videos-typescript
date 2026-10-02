import { deepFreeze } from "../utils/object";

export default abstract class ValueObject<Value = any> {
  // VO deve ser imutavel para isso podemos usar
  // readonly e Object.freeze no construtor
  // MAS, isso protegeria apenas o 1 grau do obj,
  // Para resolvermos isso criamos deepFreeze em object.ts
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = deepFreeze(value);
  }

  get value(): Value {
    return this._value;
  }

  toString = () => {
    if (typeof this.value !== "object" || this.value === null) {
      try {
        return this.value.toString();
      } catch (e) {
        return this.value + "";
      }
    }

    const valueStr = this.value.toString();
    return valueStr === "[object Object]"
      ? JSON.stringify(this.value)
      : valueStr;
  };
}
