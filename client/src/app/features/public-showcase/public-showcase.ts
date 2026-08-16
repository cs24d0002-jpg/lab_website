import { Component, inject, OnInit, signal } from '@angular/core';
import { Faculty, PublicLabService } from '../../core/services/public-lab';

@Component({
  selector: 'app-public-showcase',
  standalone: true,
  templateUrl: './public-showcase.html',
  styleUrl: './public-showcase.css'
})
export class PublicShowcaseComponent implements OnInit {
  private labService = inject(PublicLabService);
  facultyList = signal<Faculty[]>([]);

  ngOnInit() {
    this.labService.getFaculty().subscribe((data) => this.facultyList.set(data));
  }
}