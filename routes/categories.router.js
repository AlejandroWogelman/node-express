import express from 'express';

const router = express.Router();

router.get('/categories/:categoryName/products/:productId', (req, res) => {
  const { categoryName, productId } = req.params;
  const response = categories[categoryName].filter((p) => p.id == productId);

  res.json(response);
});

export default router;
