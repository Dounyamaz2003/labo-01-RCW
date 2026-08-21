export default class Reservation {
  constructor({
    clientId,
    equipmentId,
    clientName,
    equipmentName,
    quantity,
    startDate,
    endDate,
    totalPrice = 0,
    status = "CONFIRMED"
  }) {
    this.clientId = clientId;
    this.equipmentId = equipmentId;
    this.clientName = clientName;
    this.equipmentName = equipmentName;
    this.quantity = Number(quantity);
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.totalPrice = Number(totalPrice);
    this.status = status || "CONFIRMED";
  }

  getDurationDays() {
    const difference =
      this.endDate.getTime() - this.startDate.getTime();

    return Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ) + 1;
  }

  calculateTotal(dailyPrice) {
    return (
      this.getDurationDays() *
      this.quantity *
      Number(dailyPrice)
    );
  }

  isValid() {
    return (
      typeof this.clientId === "string" &&
      this.clientId.trim() !== "" &&
      typeof this.equipmentId === "string" &&
      this.equipmentId.trim() !== "" &&
      Number.isInteger(this.quantity) &&
      this.quantity >= 1 &&
      !Number.isNaN(this.startDate.getTime()) &&
      !Number.isNaN(this.endDate.getTime()) &&
      this.endDate >= this.startDate
    );
  }
}