import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";

@Component({
  selector: 'admin-product-brand-search',
  imports: [
    FormsModule,
    NzButtonComponent,
    NzColDirective,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    ReactiveFormsModule
  ],
  templateUrl: './product-brand-search.component.html',
  styleUrl: './product-brand-search.component.scss'
})
export class ProductBrandSearchComponent implements OnInit {
  form!: FormGroup;
  @Output() filterChanged = new EventEmitter<any>();

  constructor( private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
    this.filterReports();
  }

  initForm() {
    this.form = this.fb.group({
      searchQuery: [null],
    });
  }

  resetForm(): void {
    this.form.reset();
    this.filterReports();
  }

  filterReports(event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    let filter: any[] = [];
    Object.keys(this.form.controls).forEach((key) => {
      let value = this.form.controls[key].value;
      if (value != undefined || value == 0)
        filter.push({
          key: key,
          value: value instanceof Date ? new Date(value).toUTCString() : value,
        });
    });
    this.filterChanged.emit(filter);
  }

}
