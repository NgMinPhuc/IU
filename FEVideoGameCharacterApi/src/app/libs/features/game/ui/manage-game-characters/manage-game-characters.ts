import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { GameService } from '../../service/game.service';
import { CharacterService } from '../../../character/service/character.service';
import { GameModel } from '../../data-access/model';
import { CharacterModel } from '../../../character/data-access/model';
import { ToastGameConstant } from '../../data-access/constant/game.constant';

@Component({
  selector: 'app-manage-game-characters',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, SelectModule, TableModule, TagModule],
  providers: [GameService, CharacterService],
  templateUrl: './manage-game-characters.html',
  styleUrl: './manage-game-characters.scss',
})
export class ManageGameCharactersComponent implements OnInit {
  game!: GameModel;
  allCharacters: CharacterModel[] = [];
  availableCharacters: CharacterModel[] = [];
  selectedCharacterId: string | null = null;
  loading = false;

  constructor(
    private gameService: GameService,
    private characterService: CharacterService,
    private messageService: MessageService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
  ) {}

  ngOnInit(): void {
    this.game = { ...this.config.data?.game, characters: [...(this.config.data?.game?.characters ?? [])] };
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.characterService.getAll().subscribe({
      next: (res) => {
        this.allCharacters = res.data as CharacterModel[];
        this.refreshAvailable();
      },
    });
  }

  refreshAvailable(): void {
    const assignedIds = new Set(this.game.characters.map(c => c.id));
    this.availableCharacters = this.allCharacters.filter(c => !assignedIds.has(c.id));
  }

  onAdd(): void {
    if (!this.selectedCharacterId) return;
    this.loading = true;
    this.gameService.addCharacter(this.game.id, this.selectedCharacterId).subscribe({
      next: (res) => {
        this.game = res.data as GameModel;
        this.refreshAvailable();
        this.selectedCharacterId = null;
        this.loading = false;
        this.messageService.add({
          severity: ToastGameConstant.SEVERITY.Success,
          summary: ToastGameConstant.TITLE.TitleSuccess,
          detail: ToastGameConstant.MESSAGE.characterAddedSuccess,
        });
      },
      error: () => { this.loading = false; },
    });
  }

  onRemove(character: CharacterModel): void {
    this.loading = true;
    this.gameService.removeCharacter(this.game.id, character.id).subscribe({
      next: () => {
        this.game = { ...this.game, characters: this.game.characters.filter(c => c.id !== character.id) };
        this.refreshAvailable();
        this.loading = false;
        this.messageService.add({
          severity: ToastGameConstant.SEVERITY.Success,
          summary: ToastGameConstant.TITLE.TitleSuccess,
          detail: ToastGameConstant.MESSAGE.characterRemovedSuccess,
        });
      },
      error: () => { this.loading = false; },
    });
  }

  onClose(): void {
    this.ref.close(true);
  }
}
