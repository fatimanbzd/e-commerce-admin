export enum WeightCategoryEnum {
  light = 1,
  heavy,
}

export const WeightCategoryLabel: { [key in WeightCategoryEnum]: string } = {
  [WeightCategoryEnum.light]: 'سبک',
  [WeightCategoryEnum.heavy]: 'سنگین',
};
