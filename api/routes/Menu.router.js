const express = require('express');
const router = express.Router();

const {
    getAllMenuColumns,
    getSingleMenuColumn,
    addMenuColumn,
    updateMenuColumn,
    deleteMenuColumn,
} = require('../controllers/Menu.controller');

router.route('/').post(addMenuColumn).get(getAllMenuColumns);
router
    .route('/:id')
    .get(getSingleMenuColumn)
    .delete(deleteMenuColumn)
    .put(updateMenuColumn);

module.exports = router;
