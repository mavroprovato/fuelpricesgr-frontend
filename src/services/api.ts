export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

export interface DailyCountryData {
    date: Date;
    data_file: string;
    data: Array<CountryData>;
}

export interface CountryData {
    fuel_type: string;
    price: number;
    number_of_stations: number | null;
}

export interface DailyPrefectureData {
    date: Date;
    data_file: string;
    data: Array<PrefectureData>;
}

export interface PrefectureData {
    prefecture: string;
    fuel_type: string;
    price: number;
}

export class API {
    static API_BASE: string = import.meta.env.VITE_API_BASE;

    static async dateRange(fuelType: string): Promise<DateRange> {
        const url = new URL(`dateRange/${fuelType}`, API.API_BASE);

        return await fetch(url).then(async function (response: Response): Promise<DateRange> {
            const data = await response.json();

            return {
                startDate: data.start_date ? new Date(Date.parse(data.start_date)) : null,
                endDate: data.end_date ? new Date(Date.parse(data.end_date)) : null
            }
        });
    }

    static async dailyCountryData(
        startDate: Date | undefined, endDate: Date | undefined
    ): Promise<Array<DailyCountryData>> {
        const url = new URL('data/daily/country', API.API_BASE);
        if (startDate) {
            url.searchParams.append('start_date', API.toISODateString(startDate));
        }
        if (endDate) {
            url.searchParams.append('end_date', API.toISODateString(endDate));
        }

        return await fetch(url).then(async function (response: Response): Promise<Array<DailyCountryData>> {
            return await response.json();
        });
    }

    static async dailyPrefectureData(
        prefecture: string | undefined, startDate: Date | undefined, endDate: Date | undefined
    ): Promise<Array<DailyPrefectureData>> {
        const url = new URL('data/daily/prefecture', API.API_BASE);
        if (prefecture) {
            url.searchParams.append('prefecture', prefecture);
        }
        if (startDate) {
            url.searchParams.append('start_date', API.toISODateString(startDate));
        }
        if (endDate) {
            url.searchParams.append('end_date', API.toISODateString(endDate));
        }

        return await fetch(url).then(async function (response: Response) {
            return await response.json();
        });
    }

    static toISODateString(date: Date): string {
        return date.toISOString().split('T')[0] || '';
    }
}
