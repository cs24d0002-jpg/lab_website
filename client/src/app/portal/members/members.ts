import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberService } from '../../core/services/member.service';
import { Member } from '../../core/models/member.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-member-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './members.html',
  styleUrl: './members.css'
})
export class MemberAdminComponent implements OnInit {
  private memberService = inject(MemberService);
  private toastService = inject(ToastService);

  members = signal<Member[]>([]);
  isLoading = signal<boolean>(false);
  isModalOpen = signal<boolean>(false);
  isEditing = signal<boolean>(false);

  currentMember: Member = this.getEmptyMember();

  ngOnInit(): void {
    this.loadMembers();
  }

  getEmptyMember(): Member {
    return {
      name: '',
      role: 'Research Scholar',
      email: '',
      degree: 'Ph.D.',
      research_topic: '',
      image_url: ''
    };
  }

  loadMembers(): void {
    this.isLoading.set(true);
    this.memberService.getMembers().subscribe({
      next: (data) => {
        this.members.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.toastService.error('Failed to load lab members.');
      }
    });
  }

  openAddModal(): void {
    this.isEditing.set(false);
    this.currentMember = this.getEmptyMember();
    this.isModalOpen.set(true);
  }

  openEditModal(member: Member): void {
    this.isEditing.set(true);
    this.currentMember = { ...member };
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  saveMember(): void {
    if (!this.currentMember.name || !this.currentMember.email) {
      this.toastService.error('Name and Email are required.');
      return;
    }

    if (this.isEditing() && this.currentMember.id) {
      this.memberService.updateMember(this.currentMember.id, this.currentMember).subscribe({
        next: () => {
          this.toastService.success('Member updated successfully!');
          this.closeModal();
          this.loadMembers();
        },
        error: () => this.toastService.error('Failed to update member.')
      });
    } else {
      this.memberService.addMember(this.currentMember).subscribe({
        next: () => {
          this.toastService.success('Member added successfully!');
          this.closeModal();
          this.loadMembers();
        },
        error: () => this.toastService.error('Failed to add member.')
      });
    }
  }

  deleteMember(id?: number): void {
    if (!id) return;
    if (confirm('Are you sure you want to remove this member?')) {
      this.memberService.deleteMember(id).subscribe({
        next: () => {
          this.toastService.success('Member removed successfully!');
          this.loadMembers();
        },
        error: () => this.toastService.error('Failed to delete member.')
      });
    }
  }
}