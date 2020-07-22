// TODO: Write code to define and export the Employee class
class Employee {
  // param {string} name - Name of the Employee
  // param {number} id - ID of the Employee
  // param {string} email - Email of Employee

  constructor(name, id, email) {
    if (!name) {
      throw new Error("You are missing the name.");
    }
    if (typeof id !== "number" || isNaN(id) || id < 0) {
      throw new Error("Excepted");
    }
    this.name = name;
    this.id = id;
    this.email = email;
  }
}
module.exports = Employee;
