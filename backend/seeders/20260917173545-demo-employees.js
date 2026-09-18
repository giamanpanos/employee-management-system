"use strict";

const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("employees", [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        position: "Software Engineer",
        salary: 55000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        position: "Project Manager",
        salary: 65000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Michael Brown",
        email: "michael.brown@example.com",
        position: "Frontend Developer",
        salary: 52000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
        position: "UI/UX Designer",
        salary: 48000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "David Wilson",
        email: "david.wilson@example.com",
        position: "Backend Developer",
        salary: 58000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sarah Davis",
        email: "sarah.davis@example.com",
        position: "HR Manager",
        salary: 62000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Robert Miller",
        email: "robert.miller@example.com",
        position: "DevOps Engineer",
        salary: 60000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Laura Anderson",
        email: "laura.anderson@example.com",
        position: "Business Analyst",
        salary: 51000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Daniel Taylor",
        email: "daniel.taylor@example.com",
        position: "QA Engineer",
        salary: 47000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sophia Thomas",
        email: "sophia.thomas@example.com",
        position: "Product Manager",
        salary: 68000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("employees", {
      email: {
        [Op.in]: [
          "john.doe@example.com",
          "jane.smith@example.com",
          "michael.brown@example.com",
          "emily.johnson@example.com",
          "david.wilson@example.com",
          "sarah.davis@example.com",
          "robert.miller@example.com",
          "laura.anderson@example.com",
          "daniel.taylor@example.com",
          "sophia.thomas@example.com",
        ],
      },
    });
  },
};
