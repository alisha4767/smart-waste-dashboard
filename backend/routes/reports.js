import express from 'express';
import { getReports, addReport, resolveReport } from '../controllers/reportsController.js';

const router = express.Router();

router.get('/', getReports);
router.post('/', addReport);
router.patch('/:id', resolveReport);

export default router;
