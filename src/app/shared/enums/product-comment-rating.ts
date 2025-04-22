export enum ProductCommentRatingEnum {
  veryBad,
  bad,
  normal,
  good,
  veryGood,
}
export const ProductCommentRatingLabel: {
  [key in ProductCommentRatingEnum]: string;
} = {
  [ProductCommentRatingEnum.veryBad]: 'خیلی بد',
  [ProductCommentRatingEnum.bad]: 'بد',
  [ProductCommentRatingEnum.normal]: 'متوسط',
  [ProductCommentRatingEnum.good]: 'خوب',
  [ProductCommentRatingEnum.veryGood]: 'خیلی خوب',
};
