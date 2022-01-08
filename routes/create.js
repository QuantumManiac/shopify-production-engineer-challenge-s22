const express = require('express');

const router = express.Router();

const { Inventory } = require('../helpers/dbInit');

/**
 * Create an item in the DB
 * @param {*} itemName name property of item
 * @param {*} itemDesc description property of item
 * @param {*} itemQty quantity property of item
 * @returns {Object} object containing the properties of the created item
 */
const createItem = async (itemName, itemDesc = 'No Description', itemQty = 0) => {
  const itemToCreate = {
    name: itemName,
    description: itemDesc,
    quantity: itemQty,
  };

  // DB Call
  const createdItem = await Inventory.create(itemToCreate);

  return createdItem;
};

// @route  POST api/items
// @desc   Create item
router.post('/items', async (req, res) => {
  // Data validation
  // Name
  if (!('name' in req.body) || req.body.name === '') {
    return res.status(400).json({ ok: false, message: 'Missing mandatory field: name' });
  }
  // Quantity
  if (Number.isNaN(req.body.quantity) || req.body.quantity.trim() === '') {
    return res.status(400).json({ ok: false, message: 'Quantity is not a number' });
  }

  if (req.body.quantity < 0) {
    return res.status(400).json({ ok: false, message: 'Cannot have negative quantity' });
  }

  const itemBody = req.body;
  let createdItem;
  try {
    createdItem = await createItem(itemBody.name, itemBody?.description, itemBody?.quantity);
  } catch (err) {
    return res.status(400).json({ ok: false, message: `Error creating item in db${err?.message ? `: ${err.message}` : '.'}` });
  }
  return res.status(200).json({ ok: true, item: createdItem });
});

module.exports = router;
