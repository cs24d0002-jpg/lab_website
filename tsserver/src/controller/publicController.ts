import { Request, Response } from 'express';
import { PublicModel } from '../model/publicModel';

// GET /api/public/info
export const getPublicInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const labData = await PublicModel.getLabInfo();
    
    return res.status(200).json({
      success: true,
      message: 'Welcome to TADS Lab Public API',
      data: labData,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve public information',
      error: error.message,
    });
  }
};