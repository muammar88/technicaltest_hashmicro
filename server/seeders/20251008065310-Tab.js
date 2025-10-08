"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tabs",
      [
        {
          name: "Technical Testing",
          title: "Technical Testing",
          icon: "fa-solid fa-vials", // 🔬 ikon lab/testing, lebih relevan
          path: "technical_testing",
          desc: "Halaman untuk pelaksanaan technical testing di perusahaan HashMicro.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tabs", null, {});
  },
};
