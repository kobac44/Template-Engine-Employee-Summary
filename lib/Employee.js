// TODO: Write code to define and export the Employee class
class Employee {
  // param {string} name - Name of the Employee
  // param {number} id - ID of the Employee
  // param {string} email - Email of Employee

  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;

    function Employee(name) {
      this.name = name;
      this.id = name;
      this.email = name;
      this.getEmployee = function () {
        return this.name;
      };
    }
  }
}
module.exports = Employee;