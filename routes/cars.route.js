import express from 'express';
import carController from '../controllers/cars.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/allcars', authMiddleware, (req, res) => {
  carController.getAll(req, res);
});

router.post('/addcar', authMiddleware, (req, res) => {
  carController.addCar(req, res);
});

router.delete('/deletecar', authMiddleware, (req, res) => {
  carController.deleteCar(req, res);
});

export default router;
