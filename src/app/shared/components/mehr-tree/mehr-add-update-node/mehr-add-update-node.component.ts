import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzColDirective } from 'ng-zorro-antd/grid';
import {
  NZ_MODAL_DATA,
  NzModalFooterDirective,
  NzModalRef,
} from 'ng-zorro-antd/modal';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ProductCategoryService } from '../../../../features/admin-base-information/services/product-category.service';
import { Utilities } from '@core/Utils/utilities';
import { IProductCategoryAddModel } from '../../../../features/admin-base-information/interfaces/product-category-add.model';
import { IProductCategoryEditModel } from '../../../../features/admin-base-information/interfaces/product-category-edit.model';
import { AddTreeModel, NodeInfoTreeModel } from '../mehr-tree.model';
import { MehrTreeService } from '../mehr-tree.service';

@Component({
  selector: 'admin-mehr-add-update-node',
  imports: [
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    ReactiveFormsModule,
    NzSwitchComponent,
    NzInputDirective,
    NzColDirective,
    NzModalFooterDirective,
    NzButtonComponent,
  ],
  templateUrl: './mehr-add-update-node.component.html',
  styleUrl: './mehr-add-update-node.component.scss',
})
export class MehrAddUpdateNodeComponent implements OnInit, OnDestroy {
  readonly nzModalData = inject(NZ_MODAL_DATA);
  protected submitted = false;
  form!: FormGroup;

  private _destroy = new Subject<void>();

  constructor(
    private modal: NzModalRef,
    private fb: NonNullableFormBuilder,
    private treeService: MehrTreeService,
  ) {
    treeService.updatedNode$
      .pipe(takeUntil(this._destroy))
      .subscribe((data) => modal.close(data));
  }

  initForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      isActive: [false, Validators.required],
      description: [null],
    });
  }
  ngOnInit() {
    this.initForm();
    if (this.nzModalData.editMode) this.getData();
  }

  getData() {
    this.form.patchValue(this.nzModalData.node);
  }

  submit() {
    if (this.form.invalid) {
      Utilities.checkValidation(this.form);
      return;
    }

    if (this.nzModalData.editMode) this.update();
    else this.add();
  }

  add() {
    const model: AddTreeModel = {
      name: this.form.value.name,
      parentId: this.nzModalData.node.key,
      isActive: this.form.value.isActive,
      description: this.form.value.description,
    };
    this.treeService.setSubmittedNodeForm({ model, editMode: false });
  }

  update() {
    const model: AddTreeModel = {
      name: this.form.value.name,
      parentId: this.nzModalData.node.parentId,
      isActive: this.form.value.isActive,
      description: this.form.value.description,
    };

    this.treeService.setSubmittedNodeForm({
      model,
      id: this.nzModalData.node.id,
      editMode: true,
    });
  }

  cancel(): void {
    this.modal.destroy(false);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
