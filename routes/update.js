const express = require('express');

const router = express.Router();

const { Inventory } = require('../helpers/dbInit');

/**
 * Update an item of the given ID with the properties given
 * @param {String} id The ID of the item to update
 * @param {Object} properties An object containing the properties to update and updated values
 * @returns {Object} The updated item
 */
const updateItem = async (id, properties) => {
  // DB Call
  const itemToUpdate = await Inventory.findOne({ where: { id } });

  if (!itemToUpdate) {
    throw new Error('Item not found');
  }

  itemToUpdate.set({ ...properties });

  const updatedItem = await itemToUpdate.save();

  return updatedItem;
};

// @route  PUT api/items/:id
// @desc   Updates item with given ID
router.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const properties = req.body;
  let updatedItem;

  // Data validation
  // ID
  if ('id' in properties) {
    return res.status(400).json({ ok: false, message: 'Cannot change IDs of records' });
  }

  // Name
  if (properties.name === '') {
    return res.status(400).json({ ok: false, message: 'Missing mandatory field: name' });
  }

  // Quantity
  if (Number.isNaN(req.body.quantity)) {
    return res.status(400).json({ ok: false, message: 'Quantity is not a number' });
  }

  if (properties.quantity < 0) {
    return res.status(400).json({ ok: false, message: 'Cannot have negative quantity' });
  }

  try {
    updatedItem = await updateItem(id, properties);
  } catch (err) {
    return res.status(400).json({ ok: false, message: `Error updating item in db${err?.message ? `: ${err.message}` : '.'}` });
  }

  return res.json({ ok: true, item: updatedItem });
});

module.exports = router;
