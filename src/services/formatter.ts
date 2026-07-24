import {DateTime} from 'luxon';

export class Formatter {
    static CURRENCY = new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 3 });

    static currency(value: number): string {
        return Formatter.CURRENCY.format(value);
    }

    static date(value: Date): string {
        return DateTime.fromJSDate(value).toLocaleString(DateTime.DATE_FULL, { locale: 'el-GR' });
    }
}
