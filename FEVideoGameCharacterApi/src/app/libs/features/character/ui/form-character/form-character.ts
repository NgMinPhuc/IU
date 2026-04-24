import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { CharacterService } from '../../service/character.service';
import { CharacterModel } from '../../data-access/model';
import { ToastCharacterConstant } from '../../data-access/constant/character.constant';
import { SystemConstant } from '../../../../core/data-access/core.constant';

@Component({
  selector: 'app-form-character',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule, MessageModule],
  providers: [CharacterService],
  templateUrl: './form-character.html',
  styleUrl: './form-character.scss',
})
export class FormCharacterComponent implements OnInit {
  form!: FormGroup;
  isCreate = true;
  submitted = false;
  dataItem?: CharacterModel;
  action = '';

  constructor(
    private fb: FormBuilder,
    private service: CharacterService,
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
      this.form.patchValue(this.dataItem!);
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
      role: ['', [Validators.required, Validators.maxLength(100)]],
      power: [0, [Validators.required, Validators.min(0)]],
      blood: [0, [Validators.required, Validators.min(0)]],
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

    if (this.action === SystemConstant.ACTION.CREATE) {
      this.service.create({ name: value.name, role: value.role, power: value.power, blood: value.blood }).subscribe({
        next: () => {
          this.messageService.add({
            severity: ToastCharacterConstant.SEVERITY.Success,
            summary: ToastCharacterConstant.TITLE.TitleSuccess,
            detail: ToastCharacterConstant.MESSAGE.createdSuccess,
          });
          this.onCancel(true);
        },
        error: () => { this.submitted = false; },
      });
    } else {
      this.service.update(value.id, { name: value.name, role: value.role, power: value.power, blood: value.blood }).subscribe({
        next: () => {
          this.messageService.add({
            severity: ToastCharacterConstant.SEVERITY.Success,
            summary: ToastCharacterConstant.TITLE.TitleSuccess,
            detail: ToastCharacterConstant.MESSAGE.updatedSuccess,
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
