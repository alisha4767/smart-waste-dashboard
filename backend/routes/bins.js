import express from 'express';
import { getBins } from '../controllers/binsController.js';

const router = express.Router();

// GET /bins -> Returns active tracking telemetry
router.get('/', getBins);

export default router;
