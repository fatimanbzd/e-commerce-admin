import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import {
  NzTreeFlatDataSource,
  NzTreeFlattener,
  NzTreeNodeComponent,
  NzTreeNodeDefDirective,
  NzTreeNodeIndentLineDirective,
  NzTreeNodeNoopToggleDirective,
  NzTreeNodeOptionComponent,
  NzTreeNodePaddingDirective,
  NzTreeNodeToggleDirective,
  NzTreeNodeToggleRotateIconDirective,
  NzTreeViewComponent,
} from 'ng-zorro-antd/tree-view';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NgClass } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { AddTreeModel, FlatNode, MehrTreeModel } from './mehr-tree.model';
import { auditTime, BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { MehrAddUpdateNodeComponent } from './mehr-add-update-node/mehr-add-update-node.component';
import { MehrTreeService } from './mehr-tree.service';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzHighlightPipe } from 'ng-zorro-antd/core/highlight';

class FilteredTreeResult {
  constructor(
    public treeData: MehrTreeModel[],
    public needsToExpanded: MehrTreeModel[] = [],
  ) {}
}

function filterTreeData(
  data: MehrTreeModel[],
  value: string,
): FilteredTreeResult {
  const needsToExpanded = new Set<MehrTreeModel>();
  const _filter = (
    node: MehrTreeModel,
    result: MehrTreeModel[],
  ): MehrTreeModel[] => {
    console.log(node.name);
    if (node.name.search(value) !== -1) {
      result.push(node);
      return result;
    }
    if (Array.isArray(node.children)) {
      const nodes = node.children.reduce(
        (a, b) => _filter(b, a),
        [] as MehrTreeModel[],
      );
      if (nodes.length) {
        const parentNode = { ...node, children: nodes };
        needsToExpanded.add(parentNode);
        result.push(parentNode);
      }
    }
    return result;
  };
  const treeData = data.reduce((a, b) => _filter(b, a), [] as MehrTreeModel[]);
  return new FilteredTreeResult(treeData, [...needsToExpanded]);
}

@Component({
  selector: 'admin-mehr-tree',
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
    NzInputGroupComponent,
    NzInputDirective,
    FormsModule,
    NzNoAnimationDirective,
    NzHighlightPipe,
    NzTreeNodeNoopToggleDirective,
    NzTreeNodeDefDirective,
  ],
  templateUrl: './mehr-tree.component.html',
  styleUrl: './mehr-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MehrTreeComponent implements OnDestroy, OnChanges {
  @Input() data: MehrTreeModel[] = [];
  @Input() TitleTree: string = 'طبقه بندی';
  @Input() addNodeBtn: boolean = false;
  @Input() updateNodeBtn: boolean = false;
  @Input() deleteNodeBtn: boolean = false;
  @Input() expandAll = false;
  @Input() onDeleteNode!: (value: any) => boolean;
  @Input() search: boolean = false;
  @Output() formSubmitted = new EventEmitter<AddTreeModel>();
  searchValue: string | null = null;
  originData$ = new BehaviorSubject(this.data);
  searchValue$ = new BehaviorSubject<string | null>(null);
  loading = true;
  private readonly _destroy = new Subject<void>();

  private transformer = (node: MehrTreeModel, level: number): FlatNode => {
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

  flatNodeMap = new Map<FlatNode, MehrTreeModel>();
  nestedNodeMap = new Map<MehrTreeModel, FlatNode>();
  selectListSelection = new SelectionModel<FlatNode>(true);
  expandedNodes: MehrTreeModel[] = [];
  treeControl = new FlatTreeControl<FlatNode, MehrTreeModel>(
    (node) => node.level,
    (node) => node.expandable,
    {
      trackBy: (flatNode) => this.flatNodeMap.get(flatNode)!,
    },
  );

  treeFlattener = new NzTreeFlattener<MehrTreeModel, FlatNode, MehrTreeModel>(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  treeData: any[] = [];

  constructor(
    private modal: NzModalService,
    private toastr: ToastrService,
    private treeService: MehrTreeService,
  ) {
    treeService.responseNodeInfo$
      .pipe(takeUntil(this._destroy))
      .subscribe((data) => this.openUpdateModal(data));

    treeService.deletedNode$
      .pipe(takeUntil(this._destroy))
      .subscribe((data: any) => {
        this.toastr.success(`${this.TitleTree} ${data.name} حذف شد`);
        this.treeData = this.buildTree(this.data);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.treeData = this.buildTree(this.data);
    this.originData$.next(this.treeData);
    combineLatest([
      this.originData$,
      this.searchValue$.pipe(
        auditTime(300),
        map((value) => (this.searchValue = value)),
      ),
    ])
      .pipe(
        map(([data, value]) => {
          return value
            ? filterTreeData(data, value)
            : new FilteredTreeResult(data);
        }),
      )
      .subscribe((result: any) => {
        this.dataSource.setData(result.treeData || []);
        if (this.expandAll) this.treeControl.expandAll();
        console.log();
        const hasSearchValue = !!this.searchValue;
        if (hasSearchValue) {
          if (this.expandedNodes.length === 0) {
            this.expandedNodes = this.treeControl.expansionModel.selected;
            this.treeControl.expansionModel.clear();
          }
          this.treeControl.expansionModel.select(...result.needsToExpanded);
        } else {
          if (this.expandedNodes.length) {
            this.treeControl.expansionModel.clear();
            this.treeControl.expansionModel.select(...this.expandedNodes);
            this.expandedNodes = [];
          }
        }
      });
  }

  buildTree(items: MehrTreeModel[]): MehrTreeModel[] {
    const itemMap: { [key: number]: MehrTreeModel } = {};
    let root: MehrTreeModel[] = [];

    items.forEach((item) => {
      itemMap[item.key] = {
        key: item.key,
        name: item.name,
        isActive: item.isActive,
        parentId: item.parentId,
        children: [],
      };
    });
    const addChild = (parent: MehrTreeModel | null, child: MehrTreeModel) => {
      if (parent) {
        parent.children?.push(child);
      }
    };

    items.forEach((item) => {
      if (item.parentId === null) {
        root.push(itemMap[item.key]);
      } else {
        addChild(itemMap[item.parentId], itemMap[item.key]);
      }
    });

    return root;
  }

  addNode(node: FlatNode): void {
    const parentNode = this.flatNodeMap.get(node);
    if (parentNode) {
      const modalRef = this.modal.create({
        nzTitle: `${this.TitleTree} جدید`,
        nzData: {
          node: parentNode,
          editMode: false,
        },
        nzContent: MehrAddUpdateNodeComponent,
        nzAfterClose: new EventEmitter<AddTreeModel>(),
      });

      modalRef.afterClose
        .pipe(takeUntil(this._destroy))
        .subscribe((result: any) => {
          if (!result) return;
          this.treeData = this.buildTree(this.data);
        });
    }
  }

  updateNode(node: FlatNode): void {
    const node_info = this.flatNodeMap.get(node);

    if (node_info) this.treeService.setRequestInfoSubject(node_info.key);
  }

  openUpdateModal(data: any) {
    const modalRef = this.modal.create({
      nzTitle: `ویرایش ${this.TitleTree}`,
      nzData: {
        node: data,
        editMode: true,
      },
      nzContent: MehrAddUpdateNodeComponent,
      nzAfterClose: new EventEmitter<AddTreeModel>(),
    });

    modalRef.afterClose
      .pipe(takeUntil(this._destroy))
      .subscribe((result: any) => {
        if (!result) return;
        this.treeData = this.buildTree(this.data);
      });
  }

  delete(node: FlatNode): void {
    this.treeService.setAcceptedRemoveNodeSubject({
      id: node.key,
      name: node.name,
    });
  }

  trackBy = (_: number, node: FlatNode): string => {
    const mappedNode = this.flatNodeMap.get(node);
    return mappedNode
      ? `${mappedNode.key}-${mappedNode.name}`
      : 'undefined-node';
  };
  hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
