"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          code: "PRD001",
          name: "Beras Premium 5kg",
          description:
            "Beras putih kualitas premium dengan tekstur pulen dan aroma wangi alami.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "PRD002",
          name: "Minyak Goreng 2L",
          description:
            "Minyak goreng sawit jernih, tahan panas, dan ideal untuk kebutuhan dapur.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "PRD003",
          name: "Mie Instan Goreng",
          description:
            "Mie instan rasa goreng original yang menjadi favorit pelanggan minimarket.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "PRD004",
          name: "Kopi Sachet 10x20g",
          description:
            "Kopi instan kemasan sachet dengan aroma khas kopi robusta, praktis diseduh.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "PRD005",
          name: "Snack Kentang 70g",
          description:
            "Camilan ringan berbahan dasar kentang, gurih dan renyah.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
