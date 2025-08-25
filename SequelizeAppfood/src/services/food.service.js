import models from "../models/app.model"

export const foodService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      const allFood = await models.food.findAll();
			console.log(allFood);
      return allFood
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} food`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} food`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} food`;
   },
};