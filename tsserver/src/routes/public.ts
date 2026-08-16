import { Router, Request, Response } from 'express';

const router = Router();

// Mock Data
const facultyList = [
  {
    id: 'f1',
    name: 'Nithish Kumar V',
    designation: 'Principal Investigator / Associate Professor',
    email: 'nithish@lab.edu',
    researchInterests: ['Distributed Systems', 'Edge Computing'],
    scholarUrl: 'https://scholar.google.com'
  }
];

const studentList = [
  {
    id: 's1',
    name: 'Rohan Sharma',
    program: 'PhD Candidate',
    researchFocus: 'Consensus Protocols in Edge Networks',
    githubUrl: 'https://github.com'
  }
];

const publications = [
  {
    id: 'p1',
    title: 'Optimizing Latency in Decentralized Edge Architecture',
    authors: ['Dr. Aris Thorne', 'Rohan Sharma'],
    venue: 'IEEE Transactions on Cloud Computing',
    year: 2025,
    doiUrl: 'https://doi.org/10.1000/182'
  }
];

// Public Endpoints
router.get('/faculty', (req: Request, res: Response) => res.json(facultyList));
router.get('/students', (req: Request, res: Response) => res.json(studentList));
router.get('/publications', (req: Request, res: Response) => res.json(publications));

export default router;