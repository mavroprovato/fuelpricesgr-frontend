import { format } from 'date-fns';
import { el } from 'date-fns/locale/el'

export class Formatter {
    static CURRENCY = new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 3 });

    static currency(value?: number): string {
        if (!value) { return '' }
        return Formatter.CURRENCY.format(value);
    }

    static date(value: Date | null, year: boolean): string {
        if (!value) { return '' }
        return format(value, year ? 'd MMMM yyyy': 'd MMMM', { locale: el });
    }
}
