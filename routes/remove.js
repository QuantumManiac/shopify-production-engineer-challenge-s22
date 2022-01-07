const express = require('express');

const router = express.Router();

const { Inventory } = require('../helpers/dbInit');

const deleteItem = async (id) => {
  const result = await Inventory.destroy({
    where: {
      id,
    },
  });

  return result !== 0;
};

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
