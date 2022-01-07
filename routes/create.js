const express = require('express');

const router = express.Router();

const { Inventory } = require('../helpers/dbInit');

const createItem = async (itemName, itemDesc = 'No Description', itemQty = 0) => {
  const itemToCreate = {
    name: itemName,
    description: itemDesc,
    quantity: itemQty,
  };
  const createdItem = await Inventory.create(itemToCreate);

  return createdItem;
};

router.post('/items', async (req, res) => {
  // Verify that name field exists as it is mandatory
  if (!('name' in req.body)) {
    return res.status(400).json({ ok: false, message: 'missing mandatory field: name' });
  }
  const itemBody = req.body;
  let createdItem;
  try {
    createdItem = await createItem(itemBody.name, itemBody?.desc, itemBody?.qty);
  } catch (err) {
    return res.status(400).json({ ok: false, message: `Error creating item in db${err?.message ? `: ${err.message}` : '.'}` });
  }
  return res.status(200).json({ ok: true, item: createdItem });
});

module.exports = router;
