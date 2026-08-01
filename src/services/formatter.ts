import { format } from 'date-fns';
import { el } from 'date-fns/locale/el'

export class Formatter {
    static CURRENCY = new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 3 });

    static currency(value?: number): string {
        if (!value) {
            return ''
        }

        return Formatter.CURRENCY.format(value);
    }

    static date(value?: Date, hideYear?: boolean): string {
        if (!value) {
            return ''
        }

        return format(value, hideYear ? 'd MMMM' : 'd MMMM yyyy', { locale: el });
    }

    static isoDate(value?: Date): string {
        if (!value) {
            return ''
        }

        return format(value, 'yyyy-MM-dd');
    }
}
