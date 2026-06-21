interface DateRange {
    start_date: string;
    end_date: string;
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
        const url = `${API.API_BASE}dateRange/${fuelType}`;

        return await fetch(url).then((response: Response): Promise<any> => response.json());
    }

    static async dailyCountryData(): Promise<DailyCountryData[]> {
        const url = `${API.API_BASE}data/daily/country`;

        return await fetch(url).then((response: Response): Promise<any> => response.json());
    }
}
