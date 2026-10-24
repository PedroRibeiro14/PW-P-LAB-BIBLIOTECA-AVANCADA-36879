const router = require("express").Router();
const ctrl = require("../controllers/book.controller");

router.get("/search", ctrl.search);
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

module.exports = router;
