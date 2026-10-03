import { Router } from 'express';
import PublicRoutes from './public';
import authRoutes from './authRoutes';
const apiRouter = Router();

console.log('Setting up API routes...'); // Debugging log
// Mount all modular sub-routes with their respective base paths
apiRouter.use('/public', PublicRoutes);
apiRouter.use('/auth', authRoutes);

export default apiRouter;