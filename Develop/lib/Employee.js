// TODO: Write code to define and export the Employee class
const inquirer = require("inquirer");

class Employee {

    constructor(name, role, email, id, github){

        this.name = name;
        this.role = role;
        this.email = email;
        this.id = id;
        this.github = github
    }
    getName(){
        return this.name;
    }
    getRole(){
        return "Employee";
    }
    getEmail(){
        return this.email;
    }
    getId(){
        return this.id;
    }
    getGithub(){
        return this.github;
    }

}
module.exports = Employee;