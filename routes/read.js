const express = require('express');

const router = express.Router();

const { Inventory } = require('../helpers/dbInit');

const findItem = async (id) => {
  const foundItem = await Inventory.findOne({
    where: {
      id,
    },
  });

  return foundItem;
};

const findAllItems = async () => {
  const allItems = await Inventory.findAll();
  return allItems;
};

router.get('/items', async (req, res) => {
  let foundItems;
  try {
    foundItems = await findAllItems();
  } catch (err) {
    return res.status(400).json({ ok: false, message: `Error retrieving item from db${err?.message ? `: ${err.message}` : '.'}` });
  }

  return res.json({ ok: true, length: foundItems.length, items: foundItems });
});

router.get('/items/:id', async (req, res) => {
  const { id } = req.params;

  let foundItem;
  try {
    foundItem = await findItem(id);
  } catch (err) {
    return res.status(400).json({ ok: false, message: `Error retrieving item from db${err?.message ? `: ${err.message}` : '.'}` });
  }

  if (!foundItem) {
    return res.status(404).json({ ok: false, message: `item with ID "${id}" not found` });
  }

  return res.json({ ok: true, item: foundItem });
});

module.exports = router;
