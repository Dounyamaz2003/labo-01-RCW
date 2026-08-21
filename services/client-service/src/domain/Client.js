export default class Client {
  constructor({ name, email, phone }) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  isValid() {
    return (
      typeof this.name === "string" &&
      this.name.trim() !== "" &&
      typeof this.email === "string" &&
      this.email.trim() !== "" &&
      typeof this.phone === "string" &&
      this.phone.trim() !== ""
    );
  }
}