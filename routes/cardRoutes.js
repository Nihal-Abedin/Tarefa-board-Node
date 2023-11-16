const express = require("express");

const {
  createCard,
  deleteCard,
  updateCard,getSingleCard
} = require("../controllers/cardsController");

const router = express.Router({ mergeParams: true });

router.route("/").post(createCard);
router.route("/:cardId").get(getSingleCard).patch(updateCard).delete(deleteCard);

module.exports = router;
