import { Router } from 'express';
import { MemberController } from '../controller/memberController';

const memberRouter = Router();

memberRouter.get('/', MemberController.getAllMembers);
memberRouter.post('/', MemberController.createMember);
memberRouter.put('/:id', MemberController.updateMember);
memberRouter.delete('/:id', MemberController.deleteMember);

export default memberRouter;