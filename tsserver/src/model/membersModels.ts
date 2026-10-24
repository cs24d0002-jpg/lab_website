import { executeQuery } from '../../utils/dbUtils';

export interface MemberEntity {
  id: number;
  name: string;
  role: string;
  email: string;
  degree: string;
  research_topic?: string | null;
  image_url?: string | null;
  created_at?: Date;
}

export interface MemberInput {
  name: string;
  role?: string;
  email: string;
  degree?: string;
  researchTopic?: string | null;
  imageUrl?: string | null;
}

export class MemberModel {
  static async findAll(): Promise<MemberEntity[]> {
    const query = `
      SELECT id, name, role, email, degree, research_topic, image_url, created_at
      FROM members
      ORDER BY id DESC;
    `;
    return await executeQuery<MemberEntity>(query);
  }

  static async findById(id: number): Promise<MemberEntity | null> {
    const query = `
      SELECT id, name, role, email, degree, research_topic, image_url, created_at
      FROM members
      WHERE id = $1;
    `;
    const rows = await executeQuery<MemberEntity>(query, [id]);
    return rows[0] || null;
  }

  static async create(data: MemberInput): Promise<MemberEntity> {
    const {
      name,
      role = 'Research Scholar',
      email,
      degree = 'Ph.D.',
      researchTopic = null,
      imageUrl = null
    } = data;

    const query = `
      INSERT INTO members (name, role, email, degree, research_topic, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, name, role, email, degree, research_topic, image_url, created_at;
    `;

    const rows = await executeQuery<MemberEntity>(query, [
      name,
      role,
      email,
      degree,
      researchTopic,
      imageUrl
    ]);
    return rows[0];
  }

  static async update(id: number, data: MemberInput): Promise<MemberEntity | null> {
    const {
      name,
      role = 'Research Scholar',
      email,
      degree = 'Ph.D.',
      researchTopic = null,
      imageUrl = null
    } = data;

    const query = `
      UPDATE members
      SET name = $1,
          role = $2,
          email = $3,
          degree = $4,
          research_topic = $5,
          image_url = $6
      WHERE id = $7
      RETURNING id, name, role, email, degree, research_topic, image_url, created_at;
    `;

    const rows = await executeQuery<MemberEntity>(query, [
      name,
      role,
      email,
      degree,
      researchTopic,
      imageUrl,
      id
    ]);
    return rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM members WHERE id = $1 RETURNING id;`;
    const rows = await executeQuery<{ id: number }>(query, [id]);
    return rows.length > 0;
  }
}