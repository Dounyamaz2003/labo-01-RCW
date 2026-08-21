export default class Equipment {
  constructor({ name, category, dailyPrice, availableQuantity }) {
    this.name = name;
    this.category = category;
    this.dailyPrice = Number(dailyPrice);
    this.availableQuantity = Number(availableQuantity);
  }

  isValid() {
    return (
      typeof this.name === "string" &&
      this.name.trim() !== "" &&
      typeof this.category === "string" &&
      this.category.trim() !== "" &&
      Number.isFinite(this.dailyPrice) &&
      this.dailyPrice >= 0 &&
      Number.isInteger(this.availableQuantity) &&
      this.availableQuantity >= 0
    );
  }
}