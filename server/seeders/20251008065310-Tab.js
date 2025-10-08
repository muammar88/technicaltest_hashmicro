"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tabs",
      [
        {
          name: "Daftar Product",
          title: "Daftar Product",
          icon: "fa-solid fa-boxes-stacked", // 📦 ikon produk lebih relevan
          path: "daftar_product",
          desc: "Halaman untuk menampilkan dan mengelola daftar produk di sistem HashMicro.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Convert Text",
          title: "Convert Text",
          icon: "fa-solid fa-file-lines", // 📝 ikon teks/dokumen lebih relevan
          path: "convert_text",
          desc: "Halaman untuk mengonversi teks ke dalam berbagai format di sistem HashMicro.",
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
