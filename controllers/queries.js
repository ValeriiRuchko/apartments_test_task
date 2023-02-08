const Apartment = require("../models/Apartment");

// GET --> /apartments
const getAllApartments = async (filter) => {
  const apartments = await Apartment.findAll(filter);
  return apartments;
};

// POST --> /apartments
const createNewApartment = async (body_params) => {
  return await Apartment.create({
    rooms: body_params.rooms,
    name: body_params.name,
    price: body_params.price,
    description: body_params.description
  });
};

// GET --> /apartments/:id
const getApartmentById = async (apartment_id) => {
    const apartment = await Apartment.findByPk(apartment_id);
    return apartment;
}

// DELETE --> /apartments/:id
const deleteApartmentById = async (apartment_id) => {
    const del_apartment = await Apartment.destroy({where: {
        id: apartment_id
    }});
    return del_apartment;
}

module.exports = { getAllApartments, createNewApartment, getApartmentById, deleteApartmentById };
