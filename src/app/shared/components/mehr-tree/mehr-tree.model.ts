export interface MehrTreeModel {
  key: number;
  name: string;
  isActive: boolean;
  parentId: number;
  children?: MehrTreeModel[];
  template?: any;
}

export interface AddTreeModel {
  name: string;
  parentId: number;
  isActive: boolean;
  description: string;
}

export interface NodeInfoTreeModel {
  id: number;
  name: string;
  isActive: boolean;
  parentId: number;
  parentName: string | null;
  description: string;
}

export interface FlatNode {
  expandable: boolean;
  name: string;
  key: number;
  level: number;
  parentId: number;
  isActive: boolean;
}
