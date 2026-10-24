import { executeQuery } from '../../utils/dbUtils';

export interface FacultyEntity {
  id: number;
  name: string;
  designation: string;
  email: string;
  department: string;
  research_area?: string | null;
  image_url?: string | null;
  created_at?: Date;
}

export interface FacultyInput {
  name: string;
  designation?: string;
  email: string;
  department?: string;
  researchArea?: string | null;
  imageUrl?: string | null;
}

export class FacultyModel {
  // Fetch all faculty records
  static async findAll(): Promise<FacultyEntity[]> {
    const query = `
      SELECT id, name, designation, email, department, research_area, image_url, created_at
      FROM faculties
      ORDER BY id DESC;
    `;
    return await executeQuery<FacultyEntity>(query);
  }

  // Fetch single faculty record by ID
  static async findById(id: number): Promise<FacultyEntity | null> {
    const query = `
      SELECT id, name, designation, email, department, research_area, image_url, created_at
      FROM faculties
      WHERE id = $1;
    `;
    const rows = await executeQuery<FacultyEntity>(query, [id]);
    return rows[0] || null;
  }

  // Create a new faculty record
  static async create(data: FacultyInput): Promise<FacultyEntity> {
    const {
      name,
      designation = 'Assistant Professor',
      email,
      department = 'Computer Science & Engineering',
      researchArea = null,
      imageUrl = null
    } = data;

    const query = `
      INSERT INTO faculties (name, designation, email, department, research_area, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, name, designation, email, department, research_area, image_url, created_at;
    `;

    const rows = await executeQuery<FacultyEntity>(query, [
      name,
      designation,
      email,
      department,
      researchArea,
      imageUrl
    ]);
    return rows[0];
  }

  // Update existing faculty record
  static async update(id: number, data: FacultyInput): Promise<FacultyEntity | null> {
    const {
      name,
      designation = 'Assistant Professor',
      email,
      department = 'Computer Science & Engineering',
      researchArea = null,
      imageUrl = null
    } = data;

    const query = `
      UPDATE faculties
      SET name = $1,
          designation = $2,
          email = $3,
          department = $4,
          research_area = $5,
          image_url = $6
      WHERE id = $7
      RETURNING id, name, designation, email, department, research_area, image_url, created_at;
    `;

    const rows = await executeQuery<FacultyEntity>(query, [
      name,
      designation,
      email,
      department,
      researchArea,
      imageUrl,
      id
    ]);
    return rows[0] || null;
  }

  // Delete a faculty record
  static async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM faculties WHERE id = $1 RETURNING id;`;
    const rows = await executeQuery<{ id: number }>(query, [id]);
    return rows.length > 0;
  }
}