export const imageService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      let {page} = reg || {};
   
      return `This action returns all image`;
   },

   findOne: async function (req) {
      let {page} = reg || {}
      return `This action returns a id: ${req.params.id} image`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} image`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} image`;
   },
};