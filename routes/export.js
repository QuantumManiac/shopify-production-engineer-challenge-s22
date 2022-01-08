const express = require('express');

const router = express.Router();

const { Inventory } = require('../helpers/dbInit');

const findAllItems = async () => {
  const allItems = await Inventory.findAll();
  return allItems.map((item) => ({
    name: item.name,
    description: item.description,
    quantity: item.quantity,
  }));
};

const generateCsv = (data) => {
  if (!data.length) {
    return '';
  }

  return [
    Object.keys(data[0]),
    ...data.map((item) => Object.values(item)),
  ]
    .map((e) => e.join(','))
    .join('\n');
};

router.get('/export', async (req, res) => {
  let foundItems;
  try {
    foundItems = await findAllItems();
  } catch (err) {
    return res.status(400).json({ ok: false, message: `Error retrieving items from db${err?.message ? `: ${err.message}` : '.'}` });
  }

  const csv = generateCsv(foundItems);

  return res.json({ ok: true, csv });
});

module.exports = router;
