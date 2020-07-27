const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//team members json object
const employees = [];
let oneMngr = 0;

//function call to initialize

promptUser();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function promptUser() {
  try {
    console.log(
      "Welcome to the CLI HR Team Generator add your summer team here!"
    );

    // create name of each employee

    const { name } = await inquirer.prompt({
      type: "input",
      name: "name",
      message: "Employee's name:  ",
    });

    const { id } = await inquirer.prompt({
      type: "input",
      name: "id",
      message: "Employee's ID:  ",
      validate: function (id) {
        const idValid = /^[1000-3009]+$/.test(id);
        if (idValid) {
          console.log("      YES!!!");
          return true;
        } else {
          console.log(".  Please enter a new id; not a valid whole number");
          return false;
        }
      },
    });
    // create an email for each employee

    const { email } = await inquirer.prompt({
      type: "input",
      name: "email",
      message: "Employee's email:  ",
      default: () => {},
      validate: function (email) {
        //  regex thing.. still need to figure it out
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

        if (valid) {
          console.log("     SWEET!");
          return true;
        } else {
          console.log(".   a valid email please");
          return false;
        }
      },
    });

    // select the role of HR Team

    const { role } = await inquirer.prompt({
      type: "list",
      name: "role",
      message: "Select which part of the team this employee is on:",
      choices: ["Engineer", "Intern", "Manager"],
    });

    // using a conditional

    const { Eng } = inquirer.prompt({
      type: "input",
      name: "Engineer",
      message: "Engineers will enter thier Github:",
      when: (answers) => role === "Engineer",
    });

    // using a conditional

    const { Int } = await inquirer.prompt({
      type: "input",
      name: "Int",
      message: "Intern should enter the school connect to this HR prog.:",
      when: (answers) => role === "Intern",
    });

    // using a conditional

    const { Mngr } = await inquirer.prompt({
      type: "input",
      name: "Mngr",
      message: "Enter Manager's office number:",
      when: (answers) => role === "Manager",
    });

    // switch case used to push Engineer, Intern, and Manager json object

    switch (role) {
      case "Engineer":
        let github = Eng;
        employees.push(new Engineer(name, id, email, github));
        console.log("engineer is part of the team now!");
        break;
      case "Int":
        let school = Int;
        employees.push(new Intern(name, id, email, school));
        console.log("intern is part of the team now!");
        break;
      case "Manager":
        if (oneMngr < 1) {
          let officeNumber = Mngr;
          employees.push(new Manager(name, id, email, officeNumber));
          console.log("Manager is on the team now!");
          oneMngr++;
        } else {
          console.log("There is only one manager for this project.");
        }
        break;
    }

    // inquirer if there are any more employee enteries at this time

    const { addTeamMember } = await inquirer.prompt({
      type: "list",
      message: "Add another Team Member?",
      name: "addTeamMember",
      choices: ["Yes", "No"],
    });

    // if the user wants to add another team member the switch returns to promptUser function

    // returned from the `render` function. Now write it to a file named `team.html` in the output folder

    let addMem = addTeamMember;
    switch (addMem) {
      case "Yes":
        promptUser();
        break;
      case "No":
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(employees), "utf8");
        console.log(
          "This HR Team will be the Summer Success for the MIO Tech Company!"
        );
        break;
    }
  } catch (err) {
    console.log(err); // log error if try does not complete
  }
}
