export const orderService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      return `This action returns all order`;
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} order`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} order`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} order`;
   },
};