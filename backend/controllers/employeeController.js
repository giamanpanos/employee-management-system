const employeeRepository = require("../repositories/employeeRepository");

function cleanInput(body) {
  return {
    name: typeof body.name === "string" ? body.name.trim() : body.name,

    email:
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : body.email,

    position:
      typeof body.position === "string" ? body.position.trim() : body.position,

    salary:
      body.salary === "" || body.salary === undefined ? null : body.salary,
  };
}

function validId(id) {
  return /^[1-9]\d*$/.test(String(id));
}

const employeeController = {
  async getAll(req, res, next) {
    try {
      const employees = await employeeRepository.findAll();

      res.json(employees);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      if (!validId(req.params.id)) {
        return res.status(400).json({
          message: "Invalid employee ID.",
        });
      }

      const employee = await employeeRepository.findById(req.params.id);

      if (!employee) {
        return res.status(404).json({
          message: "Employee not found.",
        });
      }

      res.json(employee);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const data = cleanInput(req.body);

      if (!data.name || !data.email) {
        return res.status(400).json({
          message: "Name and email are required.",
        });
      }

      const existing = await employeeRepository.findByEmail(data.email);

      if (existing) {
        return res.status(409).json({
          message: "An employee with this email already exists.",
        });
      }

      const employee = await employeeRepository.create(data);

      res.status(201).json(employee);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      if (!validId(req.params.id)) {
        return res.status(400).json({
          message: "Invalid employee ID.",
        });
      }

      const employee = await employeeRepository.findById(req.params.id);

      if (!employee) {
        return res.status(404).json({
          message: "Employee not found.",
        });
      }

      const data = cleanInput(req.body);

      if (!data.name || !data.email) {
        return res.status(400).json({
          message: "Name and email are required.",
        });
      }

      const existing = await employeeRepository.findByEmail(data.email);

      if (existing && existing.id !== employee.id) {
        return res.status(409).json({
          message: "An employee with this email already exists.",
        });
      }

      const updated = await employeeRepository.update(employee, data);

      res.json(updated);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      if (!validId(req.params.id)) {
        return res.status(400).json({
          message: "Invalid employee ID.",
        });
      }

      const employee = await employeeRepository.findById(req.params.id);

      if (!employee) {
        return res.status(404).json({
          message: "Employee not found.",
        });
      }

      await employeeRepository.delete(employee);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = employeeController;
