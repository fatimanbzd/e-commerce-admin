import {IEnumModel} from '../interfaces/enum.model';

export class EnumConvertorUtils {
  static customEnumToModelList<T extends number>(
    enumValues: T[],
    labelObject: { [key in T]: string },
  ): IEnumModel<T>[] {
    return enumValues.map((value) => ({
      value: value,
      name: labelObject[value],
    }));
  }

  static enumToListModel<T extends number | string>(enumObj: {
    [key: number]: string;
  }): IEnumModel<T>[] {
    return Object.keys(enumObj).map((key) => ({
      value: Number(key) as T,
      name: (enumObj as Record<string, string>)[key],
    }));
  }
}
