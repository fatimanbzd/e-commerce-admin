import moment from 'moment-jalaali';

export class DateConvertorUtil {
  static toPersianDate<T extends string | Date | null | undefined>(
    date: T,
  ): string {
    if (!date) return '-';
    const parsedDate = moment(date);
    if (!parsedDate.isValid()) return '-';

    return parsedDate.locale('fa').format('YYYY/MM/DD');
  }

  static toPersianDateTime<T extends string | Date | null | undefined>(
    date: T,
  ): string {
    if (!date) return '-';
    const parsedDate = moment(date);
    if (!parsedDate.isValid()) return '-';

    return parsedDate.locale('fa').format('YYYY/MM/DD HH:MM');
  }
}
