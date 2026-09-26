import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Faculty {
  name: string;
  designation: string;
  email: string;
  profileUrl: string;
  researchInterests: string[];
  bio: string;
  avatar: string;
}

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculties.html',
  styleUrl: './faculties.css'
})
export class FacultiesComponent {
  faculties: Faculty[] = [
    {
      name: 'Dr. B. Sivaselvan',
      designation: 'Professor',
      email: 'sivaselvanb@iiitdm.ac.in',
      profileUrl: 'https://www.iiitdm.ac.in/people/faculty/sivaselvanb@iiitdm.ac.in',
      researchInterests: ['Data Science', 'Knowledge Engineering', 'Database Systems', 'Big Data Analytics'],
      bio: 'Leading research in data science, knowledge engineering, and database architectures with a focus on scalable intelligence systems.',
      avatar: ''
    },
    {
      name: 'Dr. N. Sadagopan',
      designation: 'Associate Professor',
      email: 'sadagopan@iiitdm.ac.in',
      profileUrl: 'https://www.iiitdm.ac.in/people/faculty/sadagopan@iiitdm.ac.in',
      researchInterests: ['Theoretical Computer Science', 'Graph Theory', 'Algorithms & Data Structures'],
      bio: 'Specializing in graph theory, algorithmic analysis and theoretical computer science.',
      avatar: ''
    },
    {
      name: 'Dr. S. Raghavan',
      designation: 'Assistant Professor',
      email: 'raghavans@iiitdm.ac.in',
      profileUrl: 'https://www.iiitdm.ac.in/people/faculty/raghavans@iiitdm.ac.in',
      researchInterests: ['Cloud Computing', 'Membrane Computing', 'Machine Learning'],
      bio: 'Focusing on theoretical foundations of computing, combinatorial models, and formal verification frameworks.',
      avatar: ''
    }
  ];

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/faculty-placeholder.png'; // Fallback if profile image fails to load
  }
}