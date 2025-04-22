import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  NzTreeFlatDataSource,
  NzTreeFlattener,
  NzTreeNodeComponent,
  NzTreeNodeDefDirective,
  NzTreeNodeIndentLineDirective,
  NzTreeNodeOptionComponent,
  NzTreeNodePaddingDirective,
  NzTreeNodeToggleDirective,
  NzTreeNodeToggleRotateIconDirective,
  NzTreeViewComponent,
} from 'ng-zorro-antd/tree-view';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { ProductCategoryService } from '../../../services/product-category.service';
import { Subject, takeUntil } from 'rxjs';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ProductCategoryAddDialogComponent } from '../product-category-add-dialog/product-category-add-dialog.component';
import { ToastrService } from 'ngx-toastr';
import {
  IProductCategoryResponseModel,
  IProductCategoryTreeModel,
} from '../../../../../shared/interfaces/product-category.model';
import { NgClass } from '@angular/common';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { FlatNode } from '../../../../product/interfaces/product-add.model';

@Component({
  selector: 'admin-product-category-list',
  imports: [
    NzTreeNodeIndentLineDirective,
    NzTreeNodeToggleDirective,
    NzTreeViewComponent,
    NzTreeNodeOptionComponent,
    NzButtonComponent,
    NzIconDirective,
    NzTreeNodeToggleRotateIconDirective,
    NzTreeNodeComponent,
    NzTreeNodePaddingDirective,
    NgClass,
    NzPopconfirmDirective,
    NzTooltipDirective,
    NzModalModule,
    NzTreeNodeDefDirective,
  ],
  templateUrl: './product-category-list.component.html',
  styleUrl: './product-category-list.component.scss',
})
export class ProductCategoryListComponent implements OnDestroy {
  private transformer = (
    node: IProductCategoryTreeModel,
    level: number,
  ): FlatNode => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.key === node.key
        ? existingNode
        : {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level,
            key: node.key,
            parentId: node.parentId,
            isActive: node.isActive,
          };
    flatNode.name = node.name;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };
  flatNodeMap = new Map<FlatNode, IProductCategoryTreeModel>();
  nestedNodeMap = new Map<IProductCategoryTreeModel, FlatNode>();
  selectListSelection = new SelectionModel<FlatNode>(true);

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  treeFlattener = new NzTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  treeData: IProductCategoryTreeModel[] = [];
  private _destroy = new Subject<void>();

  constructor(
    private productCategoryService: ProductCategoryService,
    private modal: NzModalService,
    private toastr: ToastrService,
  ) {
    this.getData();
  }

  private getData() {
    this.productCategoryService
      .categories()
      .pipe(takeUntil(this._destroy))
      .subscribe((ca: any) => {
        this.treeData = this.buildTree(ca.items);
        this.dataSource.setData(this.treeData);
        this.treeControl.expandAll();
      });
  }

  buildTree(
    items: IProductCategoryResponseModel[],
  ): IProductCategoryTreeModel[] {
    const itemMap: { [key: number]: IProductCategoryTreeModel } = {};
    let root: IProductCategoryTreeModel[] = [];

    items.forEach((item) => {
      itemMap[item.id] = {
        key: item.id,
        name: item.name,
        isActive: item.isActive,
        parentId: item.parentId,
        children: [],
      };
    });
    const addChild = (
      parent: IProductCategoryTreeModel | null,
      child: IProductCategoryTreeModel,
    ) => {
      if (parent) {
        parent.children?.push(child);
      }
    };

    items.forEach((item) => {
      if (item.parentId === null) {
        root.push(itemMap[item.id]);
      } else {
        addChild(itemMap[item.parentId], itemMap[item.id]);
      }
    });

    return root;
  }

  hasChild = (_: number, node: FlatNode): boolean => node.expandable;
  hasNoContent = (_: number, node: FlatNode): boolean => node.name === '';
  trackBy = (_: number, node: FlatNode): string => `${node.key}-${node.name}`;

  delete(node: FlatNode): void {
    this.productCategoryService
      .removeCategory(node.key)
      .pipe(takeUntil(this._destroy))
      .subscribe({
        next: () => {
          this.toastr.success(`دسته بندی ${node.name} حذف شد`);
          this.getData();
        },
      });
  }

  AddUpdateNode(node: FlatNode, editMode: boolean): void {
    const parentNode = this.flatNodeMap.get(node);
    if (parentNode) {
      const modalRef = this.modal.create({
        nzTitle: `${editMode ? 'ویرایش دسته بندی' : 'دسته بندی جدید'} `,
        nzData: {
          node: parentNode,
          editMode: editMode,
        },

        nzContent: ProductCategoryAddDialogComponent,
        nzAfterClose: new EventEmitter<boolean>(),
      });

      modalRef.afterClose
        .pipe(takeUntil(this._destroy))
        .subscribe((result: any) => {
          if (!result) {
            return;
          }
          if (!editMode && result?.id) {
            this.toastr.success('دسته بندی با موفقیت ثبت شد.');
          } else if (editMode && result)
            this.toastr.success('دسته بندی با موفقیت ویرایش شد.');
          this.getData();
        });
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
