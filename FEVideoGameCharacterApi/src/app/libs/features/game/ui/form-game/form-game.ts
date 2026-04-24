import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { GameService } from '../../service/game.service';
import { GameModel } from '../../data-access/model';
import { ToastGameConstant } from '../../data-access/constant/game.constant';
import { SystemConstant } from '../../../../core/data-access/core.constant';

@Component({
  selector: 'app-form-game',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule, DatePickerModule, MessageModule],
  providers: [GameService],
  templateUrl: './form-game.html',
  styleUrl: './form-game.scss',
})
export class FormGameComponent implements OnInit {
  form!: FormGroup;
  isCreate = true;
  submitted = false;
  dataItem?: GameModel;
  action = '';

  constructor(
    private fb: FormBuilder,
    private service: GameService,
    private messageService: MessageService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
  ) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();
    const modalData = this.config.data?.modalData;
    this.action = modalData?.action;
    if (this.action === SystemConstant.ACTION.UPDATE) {
      this.isCreate = false;
      this.dataItem = modalData.data;
      this.form.patchValue({
        ...this.dataItem,
        releaseDate: this.dataItem?.releaseDate ? new Date(this.dataItem.releaseDate) : null,
      });
    } else {
      this.isCreate = true;
    }
  }

  get f() {
    return this.form.controls;
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      genre: ['', [Validators.required, Validators.maxLength(100)]],
      publisher: ['', [Validators.required, Validators.maxLength(100)]],
      releaseDate: [null, [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(ctrl => {
        ctrl.markAsDirty();
        ctrl.updateValueAndValidity({ onlySelf: true });
      });
      return;
    }

    const value = this.form.value;
    const releaseDate = value.releaseDate instanceof Date
      ? value.releaseDate.toISOString()
      : value.releaseDate;
    const dto = { name: value.name, genre: value.genre, publisher: value.publisher, releaseDate, price: value.price };

    if (this.action === SystemConstant.ACTION.CREATE) {
      this.service.create(dto).subscribe({
        next: () => {
          this.messageService.add({
            severity: ToastGameConstant.SEVERITY.Success,
            summary: ToastGameConstant.TITLE.TitleSuccess,
            detail: ToastGameConstant.MESSAGE.createdSuccess,
          });
          this.onCancel(true);
        },
        error: () => { this.submitted = false; },
      });
    } else {
      this.service.update(value.id, dto).subscribe({
        next: () => {
          this.messageService.add({
            severity: ToastGameConstant.SEVERITY.Success,
            summary: ToastGameConstant.TITLE.TitleSuccess,
            detail: ToastGameConstant.MESSAGE.updatedSuccess,
          });
          this.onCancel(true);
        },
        error: () => { this.submitted = false; },
      });
    }
  }

  onCancel(flag = false): void {
    this.form.reset();
    this.ref.close(flag);
  }
}
