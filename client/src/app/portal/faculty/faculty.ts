import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacultyService } from '../../core/services/faculty.service';
import { Faculty } from '../../core/models/faculty.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-faculty-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faculty.html',
  styleUrl: './faculty.css'
})
export class FacultyAdminComponent implements OnInit {
  private facultyService = inject(FacultyService);
  private toastService = inject(ToastService);

  faculties = signal<Faculty[]>([]);
  isLoading = signal<boolean>(false);
  isModalOpen = signal<boolean>(false);
  isEditing = signal<boolean>(false);

  currentFaculty: Faculty = this.getEmptyFaculty();

  ngOnInit(): void {
    this.loadFaculties();
  }

  getEmptyFaculty(): Faculty {
    return {
      name: '',
      designation: 'Assistant Professor',
      email: '',
      department: 'Computer Science & Engineering',
      researchArea: '',
      imageUrl: ''
    };
  }

  loadFaculties(): void {
    this.isLoading.set(true);
    this.facultyService.getFaculties().subscribe({
      next: (data) => {
        this.faculties.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.toastService.error('Failed to load faculty details.');
      }
    });
  }

  openAddModal(): void {
    this.isEditing.set(false);
    this.currentFaculty = this.getEmptyFaculty();
    this.isModalOpen.set(true);
  }

  openEditModal(faculty: Faculty): void {
    this.isEditing.set(true);
    this.currentFaculty = { ...faculty };
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  saveFaculty(): void {
    if (!this.currentFaculty.name || !this.currentFaculty.email) {
      this.toastService.error('Name and Email are required.');
      return;
    }

    if (this.isEditing() && this.currentFaculty.id) {
      this.facultyService.updateFaculty(this.currentFaculty.id, this.currentFaculty).subscribe({
        next: () => {
          this.toastService.success('Faculty updated successfully!');
          this.closeModal();
          this.loadFaculties();
        },
        error: () => this.toastService.error('Failed to update faculty.')
      });
    } else {
      this.facultyService.addFaculty(this.currentFaculty).subscribe({
        next: () => {
          this.toastService.success('Faculty added successfully!');
          this.closeModal();
          this.loadFaculties();
        },
        error: () => this.toastService.error('Failed to add faculty.')
      });
    }
  }

  deleteFaculty(id?: number): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this faculty member?')) {
      this.facultyService.deleteFaculty(id).subscribe({
        next: () => {
          this.toastService.success('Faculty deleted successfully!');
          this.loadFaculties();
        },
        error: () => this.toastService.error('Failed to delete faculty.')
      });
    }
  }
}