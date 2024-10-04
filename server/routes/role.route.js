
module.exports = app => {
  const roleController = require("../controllers/role.controller.js");

  var router = require("express").Router();

  // Role routes
  router.get('/', roleController.getRoles);
  router.get('/:id', roleController.getRoleById);
  router.post('/', roleController.createRole);
  router.put('/:id', roleController.updateRole);
  router.delete('/:id', roleController.deleteRole);

// Add permissions to a specific role
  router.post('/:roleId/permissions', roleController.addPermissionsToRole);

  app.use('/api/roles', router);
};