"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Ambil semua tab dari tabel Tabs
    const tabs = await queryInterface.sequelize.query("SELECT id FROM Tabs;", {
      type: Sequelize.QueryTypes.SELECT,
    });

    if (tabs.length === 0) return;

    await queryInterface.bulkInsert(
      "Menus",
      [
        {
          name: "Dashboard",
          path: "dashboard",
          icon: "fa-solid fa-tachometer-alt",
          tab: `[{"id":"${tabs[0].id}"},{"id":"${tabs[1].id}"}]`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Menus", null, {});
  },
};
