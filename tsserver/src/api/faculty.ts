import { Router } from 'express';
import { FacultyController } from '../controller/facultyController';

const facultyRouter = Router();

facultyRouter.get('/', FacultyController.getAllFaculties);
facultyRouter.post('/', FacultyController.createFaculty);
facultyRouter.put('/:id', FacultyController.updateFaculty);
facultyRouter.delete('/:id', FacultyController.deleteFaculty);

export default facultyRouter;