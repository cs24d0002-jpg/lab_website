import { Router } from 'express';
import { getPublicInfo } from '../controller/publicController';

const router = Router();

// Public GET endpoint
router.get('/info', getPublicInfo);

export default router;