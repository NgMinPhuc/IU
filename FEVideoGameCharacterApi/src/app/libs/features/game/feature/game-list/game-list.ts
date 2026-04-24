import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GameService } from '../../service/game.service';
import { GameModel } from '../../data-access/model';
import { FormGameComponent } from '../../ui/form-game/form-game';
import { ManageGameCharactersComponent } from '../../ui/manage-game-characters/manage-game-characters';
import { ToastGameConstant } from '../../data-access/constant/game.constant';
import { SystemConstant } from '../../../../core/data-access/core.constant';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TableModule, TagModule, ConfirmDialogModule, TooltipModule],
  providers: [GameService, DialogService, ConfirmationService],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss',
})
export class GameListComponent implements OnInit {
  games: GameModel[] = [];
  filteredGames: GameModel[] = [];
  searchKeyword = '';
  ref?: DynamicDialogRef;

  constructor(
    private service: GameService,
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
        this.games = res.data as GameModel[];
        this.applyFilter();
      },
      error: () => {},
    });
  }

  applyFilter(): void {
    const kw = this.searchKeyword.toLowerCase().trim();
    this.filteredGames = kw
      ? this.games.filter(g => g.name.toLowerCase().includes(kw))
      : [...this.games];
  }

  onSearch(): void {
    this.applyFilter();
  }

  openCreate(): void {
    this.ref = this.dialogService.open(FormGameComponent, {
      header: 'Add New Game',
      width: '520px',
      closable: true,
      data: { modalData: { action: SystemConstant.ACTION.CREATE } },
    });
    this.ref.onClose.subscribe((reload: boolean) => {
      if (reload) this.loadData();
    });
  }

  openEdit(item: GameModel): void {
    this.ref = this.dialogService.open(FormGameComponent, {
      header: 'Edit Game',
      width: '520px',
      closable: true,
      data: { modalData: { action: SystemConstant.ACTION.UPDATE, data: item } },
    });
    this.ref.onClose.subscribe((reload: boolean) => {
      if (reload) this.loadData();
    });
  }

  openManageCharacters(item: GameModel): void {
    this.ref = this.dialogService.open(ManageGameCharactersComponent, {
      header: `Manage Characters — ${item.name}`,
      width: '620px',
      closable: true,
      data: { game: item },
    });
    this.ref.onClose.subscribe((reload: boolean) => {
      if (reload) this.loadData();
    });
  }

  confirmDelete(item: GameModel): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${item.name}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.service.delete(item.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: ToastGameConstant.SEVERITY.Success,
              summary: ToastGameConstant.TITLE.TitleSuccess,
              detail: ToastGameConstant.MESSAGE.deletedSuccess,
            });
            this.loadData();
          },
          error: () => {},
        });
      },
    });
  }
}
