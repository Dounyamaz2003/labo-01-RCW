export default class Notification {
  constructor({ recipient, message, type }) {
    this.recipient = recipient;
    this.message = message;
    this.type = type || "INFO";
  }

  isValid() {
    return (
      typeof this.recipient === "string" &&
      this.recipient.trim() !== "" &&
      typeof this.message === "string" &&
      this.message.trim() !== "" &&
      typeof this.type === "string" &&
      this.type.trim() !== ""
    );
  }
}