module.exports = app => {
  const permissionController = require("../controllers/permission.controller");

  var router = require("express").Router();

  // Permission routes
  router.get('/', permissionController.getPermissions);
  router.get('/:id', permissionController.getPermissionById);
  router.post('/', permissionController.createPermission);
  router.put('/:id', permissionController.updatePermission);
  router.delete('/:id', permissionController.deletePermission);

  app.use('/api/permissions', router);
};