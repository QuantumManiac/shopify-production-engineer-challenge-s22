const express = require('express');

const router = express.Router();

const { Inventory } = require('../helpers/dbInit');

/**
 * Gets all records from DB
 * @returns {Object[]} List of all records in table
 */
const findAllItems = async () => {
  // DB Call
  const allItems = await Inventory.findAll();
  return allItems.map((item) => ({
    name: item.name,
    description: item.description,
    quantity: item.quantity,
  }));
};

/**
 * Generates CSV from given data
 * @param {Object[]} data List of DB records in object form
 * @returns generated CSV string
 */
const generateCsv = (data) => {
  if (!data.length) {
    return '';
  }

  return [
    Object.keys(data[0]),
    ...data.map((item) => Object.values(item).map((cell) => {
      // Escape double quotes
      const cleanedCell = String(cell).replaceAll('"', '""');
      // Enclose CSV cell values in quotes
      return `"${cleanedCell}"`;
    })),
  ]
    .map((e) => e.join(','))
    .join('\n');
};

// @route  GET api/export
// @desc   Get CSV file of inventory contents
router.get('/export', async (req, res) => {
  let foundItems;
  try {
    // DB Call
    foundItems = await findAllItems();
  } catch (err) {
    return res.status(400).json({ ok: false, message: `Error retrieving items from db${err?.message ? `: ${err.message}` : '.'}` });
  }

  const csv = generateCsv(foundItems);

  return res.json({ ok: true, csv });
});

module.exports = router;
