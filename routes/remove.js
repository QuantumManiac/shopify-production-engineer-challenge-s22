const express = require('express');

const router = express.Router();

const { Inventory } = require('../helpers/dbInit');

/**
 * Deletes an item with the given ID
 * @param {String} id ID of item to delete
 * @returns {Boolean} Whether or not item has been deleted
 */
const deleteItem = async (id) => {
  // DB Call
  const result = await Inventory.destroy({
    where: {
      id,
    },
  });

  // Result is number of records deleted. If zero, item did not exist to be deleted.
  return result !== 0;
};

// @route  DELETE api/items/:id
// @desc   Delete item of given ID
router.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  let result;
  try {
    result = await deleteItem(id);
  } catch (err) {
    return res.status(400).json({ ok: false, message: `Error deleting item from db${err?.message ? `: ${err.message}` : '.'}` });
  }

  if (!result) {
    return res.status(400).json({ ok: false, message: 'Item does not exist' });
  }

  return res.json({ ok: true, message: 'Item deleted' });
});

module.exports = router;
