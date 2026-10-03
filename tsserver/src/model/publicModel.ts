import { executeQuery } from '../../utils/dbUtils';

export interface LabInfo {
  name: string;
  room: string;
  institution: string;
  status: string;
}

export class PublicModel {
  // Simple database query returning general lab overview information
  static async getLabInfo(): Promise<LabInfo> {
    const query = `
      SELECT 'TADS Lab' AS name, 
             'Room L610' AS room, 
             'IIITDM Kancheepuram' AS institution, 
             'Active' AS status;
    `;
    const rows = await executeQuery<LabInfo>(query);
    return rows[0];
  }
}