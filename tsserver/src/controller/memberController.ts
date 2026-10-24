import { Request, Response, NextFunction } from 'express';
import { MemberModel } from '../model/membersModels';

export class MemberController {
  static async getAllMembers(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const members = await MemberModel.findAll();
      res.json(members);
    } catch (error) {
      next(error);
    }
  }

  static async createMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        res.status(400).json({ message: 'Name and email are required.' });
        return;
      }
      const newMember = await MemberModel.create(req.body);
      res.status(201).json(newMember);
    } catch (error) {
      next(error);
    }
  }

  static async updateMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params['id']);
      const updated = await MemberModel.update(id, req.body);
      if (!updated) {
        res.status(404).json({ message: 'Member record not found.' });
        return;
      }
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params['id']);
      const deleted = await MemberModel.delete(id);
      if (!deleted) {
        res.status(404).json({ message: 'Member record not found.' });
        return;
      }
      res.json({ success: true, message: 'Member deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }
}