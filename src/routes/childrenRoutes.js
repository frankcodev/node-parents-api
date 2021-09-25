const router = require("express").Router();
const { checkToken } = require('../controllers/authMiddlewares')
const childrenController = require('../controllers/childrenController')


router.get('/:parentId', checkToken, childrenController.getChildrenByParent);

module.exports = router;