import { Request, Response, NextFunction } from 'express';
import { FacultyModel } from '../model/facultyModel';

export class FacultyController {
  static async getAllFaculties(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const faculties = await FacultyModel.findAll();
      res.json(faculties);
    } catch (error) {
      next(error);
    }
  }

  static async createFaculty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        res.status(400).json({ message: 'Name and email are required.' });
        return;
      }

      const newFaculty = await FacultyModel.create(req.body);
      res.status(201).json(newFaculty);
    } catch (error) {
      next(error);
    }
  }

  static async updateFaculty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params['id']);
      const updatedFaculty = await FacultyModel.update(id, req.body);

      if (!updatedFaculty) {
        res.status(404).json({ message: 'Faculty record not found.' });
        return;
      }

      res.json(updatedFaculty);
    } catch (error) {
      next(error);
    }
  }

  static async deleteFaculty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params['id']);
      const deleted = await FacultyModel.delete(id);

      if (!deleted) {
        res.status(404).json({ message: 'Faculty record not found.' });
        return;
      }

      res.json({ success: true, message: 'Faculty deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }
}