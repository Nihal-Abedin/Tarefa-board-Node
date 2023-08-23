const express = require("express");

const {
  createCard,
  deleteCard,
  updateCard,
} = require("../controllers/cardsController");

const router = express.Router({ mergeParams: true });

router.route("/").post(createCard);
router.route("/:cardId").patch(updateCard).delete(deleteCard);

module.exports = router;
