// TODO: Write code to define and export the Employee class
class Employee {
  // param {string} name - Name of the Employee
  // param {number} id - ID of the Employee
  // param {string} email - Email of Employee

  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
