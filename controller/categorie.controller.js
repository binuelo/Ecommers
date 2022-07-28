const { Categorie } = require("../models/categories.model");
// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const createCategorie = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const newCategorie = await Categorie.create({ name });
  res.status(201).json({
    status: "succes",
    newCategorie,
  });
});

const getAllCategory = catchAsync(async (req, res, next) => {
  const allcategori = await Categorie.findAll({ where: { status: "active" } });
  res.status(201).json({
    status: "succes",
    allcategori,
  });
});

const updateIdCategory = catchAsync(async (req, res, next) => {
  const { categorie } = req;
  const { name } = req.body;
  const category = await categorie.update({ name });

  res.status(204).json({ status: "success", category });
});
module.exports = { createCategorie, getAllCategory, updateIdCategory };
