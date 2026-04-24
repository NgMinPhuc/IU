import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CharacterService } from '../../service/character.service';
import { CharacterModel } from '../../data-access/model';
import { FormCharacterComponent } from '../../ui/form-character/form-character';
import { ToastCharacterConstant } from '../../data-access/constant/character.constant';
import { SystemConstant } from '../../../../core/data-access/core.constant';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TableModule, TagModule, ConfirmDialogModule],
  providers: [CharacterService, DialogService, ConfirmationService],
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss',
})
export class CharacterListComponent implements OnInit {
  characters: CharacterModel[] = [];
  filteredCharacters: CharacterModel[] = [];
  searchKeyword = '';
  ref?: DynamicDialogRef;

  constructor(
    private service: CharacterService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.getAll().subscribe({
      next: (res) => {
        this.characters = res.data as CharacterModel[];
        this.applyFilter();
      },
      error: () => {},
    });
  }

  applyFilter(): void {
    const kw = this.searchKeyword.toLowerCase().trim();
    this.filteredCharacters = kw
      ? this.characters.filter(c => c.name.toLowerCase().includes(kw))
      : [...this.characters];
  }

  onSearch(): void {
    this.applyFilter();
  }

  openCreate(): void {
    this.ref = this.dialogService.open(FormCharacterComponent, {
      header: 'Add New Character',
      width: '480px',
      closable: true,
      data: { modalData: { action: SystemConstant.ACTION.CREATE } },
    });
    this.ref.onClose.subscribe((reload: boolean) => {
      if (reload) this.loadData();
    });
  }

  openEdit(item: CharacterModel): void {
    this.ref = this.dialogService.open(FormCharacterComponent, {
      header: 'Edit Character',
      width: '480px',
      closable: true,
      data: { modalData: { action: SystemConstant.ACTION.UPDATE, data: item } },
    });
    this.ref.onClose.subscribe((reload: boolean) => {
      if (reload) this.loadData();
    });
  }

  confirmDelete(item: CharacterModel): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${item.name}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.service.delete(item.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: ToastCharacterConstant.SEVERITY.Success,
              summary: ToastCharacterConstant.TITLE.TitleSuccess,
              detail: ToastCharacterConstant.MESSAGE.deletedSuccess,
            });
            this.loadData();
          },
          error: () => {},
        });
      },
    });
  }
}
