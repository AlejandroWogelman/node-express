import express from 'express';
import { UserService } from '../services/user.service.js';

const router = express.Router();
const service = new UserService();

//query params
router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  const users = service.all();
  res.json(users);
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);
  res.json(user);
});

router.post('/', (req, res) => {
  const body = req.body;
  const user = service.create(body);
  res.status(201).json(user);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  console.log(body);
  console.log(id);

  const user = service.update(id, body);
  res.status(200).json(user);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.delete(id);
  res.json(user);
});

export default router;
