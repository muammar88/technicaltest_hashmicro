"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Ambil daftar produk dari tabel Products
    const products = await queryInterface.sequelize.query(
      "SELECT id, code FROM Products;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (products.length === 0) return;

    // Fungsi bantu untuk ambil ID produk berdasarkan kode
    const findProductId = (code) =>
      products.find((p) => p.code === code)?.id || null;

    await queryInterface.bulkInsert(
      "Items",
      [
        // === Produk: Beras Premium 5kg ===
        {
          product_id: findProductId("PRD001"),
          item_code: "ITM-BRS-001",
          name: "Beras Premium Cap Mawar 5kg",
          price: 72000.0,
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: findProductId("PRD001"),
          item_code: "ITM-BRS-002",
          name: "Beras Premium Cap Jago 5kg",
          price: 69500.0,
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // === Produk: Minyak Goreng 2L ===
        {
          product_id: findProductId("PRD002"),
          item_code: "ITM-MNY-001",
          name: "Minyak Goreng Bimoli 2L",
          price: 31000.0,
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: findProductId("PRD002"),
          item_code: "ITM-MNY-002",
          name: "Minyak Goreng Tropical 2L",
          price: 30500.0,
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // === Produk: Mie Instan Goreng ===
        {
          product_id: findProductId("PRD003"),
          item_code: "ITM-MIE-001",
          name: "Mie Instan Goreng Original",
          price: 3500.0,
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: findProductId("PRD003"),
          item_code: "ITM-MIE-002",
          name: "Mie Instan Goreng Pedas",
          price: 3700.0,
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // === Produk: Kopi Sachet 10x20g ===
        {
          product_id: findProductId("PRD004"),
          item_code: "ITM-KOP-001",
          name: "Kopi Kapal Api Sachet 10x20g",
          price: 15500.0,
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: findProductId("PRD004"),
          item_code: "ITM-KOP-002",
          name: "Kopi ABC Sachet 10x20g",
          price: 15000.0,
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // === Produk: Snack Kentang 70g ===
        {
          product_id: findProductId("PRD005"),
          item_code: "ITM-SNK-001",
          name: "Snack Kentang Chitato 70g",
          price: 10500.0,
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: findProductId("PRD005"),
          item_code: "ITM-SNK-002",
          name: "Snack Kentang Lays 70g",
          price: 11500.0,
          status: "unavailable", // contoh stok kosong
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Items", null, {});
  },
};
