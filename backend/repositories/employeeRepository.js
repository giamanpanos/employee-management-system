const Employee = require("../models/Employee");

const employeeRepository = {
  findAll() {
    return Employee.findAll({
      order: [["id", "ASC"]],
    });
  },

  findById(id) {
    return Employee.findByPk(id);
  },

  findByEmail(email) {
    return Employee.findOne({
      where: { email },
    });
  },

  create(data) {
    return Employee.create(data);
  },

  update(employee, data) {
    return employee.update(data);
  },

  delete(employee) {
    return employee.destroy();
  },
};

module.exports = employeeRepository;
