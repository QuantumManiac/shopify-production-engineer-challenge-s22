const express = require('express');

const router = express.Router();

const { Inventory } = require('../helpers/dbInit');

const updateItem = async (id, properties) => {
  const itemToUpdate = await Inventory.findOne({ where: { id } });

  if (!itemToUpdate) {
    throw new Error('Item not found');
  }

  itemToUpdate.set({ ...properties });

  const updatedItem = await itemToUpdate.save();

  return updatedItem;
};

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const properties = req.body;
  let updatedItem;
  try {
    updatedItem = await updateItem(id, properties);
  } catch (err) {
    return res.status(400).json({ ok: false, message: `Error updating item in db${err?.message ? `: ${err.message}` : '.'}` });
  }

  return res.json({ ok: true, item: updatedItem });
});

module.exports = router;
