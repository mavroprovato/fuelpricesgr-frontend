
interface FuelData {
    fuel_type: string;
    price: string;
    number_of_stations: number;
}

interface DailyCountryDataEntry {
    date: Date;
    data: FuelData[];
    data_file: string;
}

export class API {
    static API_BASE: string = import.meta.env.VITE_API_BASE;

    static async dailyCountryData(): Promise<DailyCountryDataEntry[]> {
        const url = `${API.API_BASE}data/daily/country`;

        return await fetch(url).then((response: Response): Promise<any> => response.json());
    }
}
