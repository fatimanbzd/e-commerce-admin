export interface IMenuModel {
  label: string;
  icon: string;
  permission: boolean;
  route?: string;
  children?: ISubMenuModel[];
  selected?: boolean;
  isOpen: boolean;
}

interface ISubMenuModel {
  label: string;
  route: string;
  children?: ISubMenuModel[];
  permission?: boolean;
}
