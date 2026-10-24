import { Router } from 'express';
import PublicRoutes from './public';
import authRoutes from './authRoutes';
import facultyRoutes from './faculty';
import memberRoutes from './member';
const apiRouter = Router();

console.log('Setting up API routes...'); // Debugging log
// Mount all modular sub-routes with their respective base paths
apiRouter.use('/public', PublicRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/faculties', facultyRoutes);
apiRouter.use('/members', memberRoutes);

export default apiRouter;