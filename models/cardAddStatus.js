const cardModal = require("./cardModel");
cardModal
  .updateMany({}, { $set: { status: "not started" } }, { runValidators: false })
  .then((result) => console.log("Documents updated:", result))
  .catch((err) => console.error("Error updating documents:", err))
  .finally(() => console.log("ERR"));
/**, (err, result) => {
  if (err) {
    console.error("Error updating documents:", err);
  } else {
    console.log("Documents updated:", result);
  }
} */
