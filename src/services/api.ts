interface DateRange {
    startDate: Date;
    endDate: Date;
}

interface FuelData {
    fuel_type: string;
    price: string;
    number_of_stations: number;
}

interface DailyCountryData {
    date: string;
    data: FuelData[];
    data_file: string;
}

export class API {
    static API_BASE: string = import.meta.env.VITE_API_BASE;

    static async dateRange(fuelType: string): Promise<DateRange> {
        const url = new URL(`dateRange/${fuelType}`, API.API_BASE);

        return await fetch(url).then(async function (response: Response): Promise<DateRange> {
            const data = await response.json();

            return {
                startDate: new Date(Date.parse(data.start_date)),
                endDate: new Date(Date.parse(data.end_date))
            }
        });
    }

    static async dailyCountryData(startDate: Date | undefined, endDate: Date | undefined): Promise<DailyCountryData[]> {
        const url = new URL('data/daily/country', API.API_BASE);
        if (startDate) {
            url.searchParams.append('start_date', API.toISODateString(startDate));
        }
        if (endDate) {
            url.searchParams.append('end_date', API.toISODateString(endDate));
        }

        return await fetch(url).then((response: Response): Promise<any> => response.json());
    }

    static toISODateString(date: Date): string {
        return date.toISOString().split('T')[0] || '';
    }
}
