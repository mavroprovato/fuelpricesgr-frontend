export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface FuelData {
    price: number;
    numberOfStations: number;
}

interface DailyCountryData {
    dates: Date[];
    dataFiles: string[];
    data: Map<string, (FuelData | null)[]>;
}

export class API {
    static API_BASE: string = import.meta.env.VITE_API_BASE;
    static FUEL_TYPES: string[] = ['UNLEADED_95', 'UNLEADED_100', 'SUPER', 'DIESEL', 'DIESEL_HEATING', 'GAS'];

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

    static async dailyCountryData(startDate: Date | undefined, endDate: Date | undefined): Promise<DailyCountryData> {
        const url = new URL('data/daily/country', API.API_BASE);
        if (startDate) {
            url.searchParams.append('start_date', API.toISODateString(startDate));
        }
        if (endDate) {
            url.searchParams.append('end_date', API.toISODateString(endDate));
        }

        return await fetch(url).then(async function (response: Response): Promise<DailyCountryData> {
            const data = await response.json();

            const dates: Date[] = [];
            const dataFiles: string[] = [];
            const dataPerFuelType: Map<string, (FuelData | null)[]> = new Map();
            for (const fuelData of data) {
                dates.unshift(fuelData.date);
                dataFiles.unshift(fuelData.data_file);
                for (const fuelType of API.FUEL_TYPES) {
                    const fuelTypeData = fuelData.data.find((e: any) => e.fuel_type === fuelType);
                    const perFuelTypeData = dataPerFuelType.get(fuelType) || [];
                    if (fuelTypeData) {
                        perFuelTypeData.unshift({
                            price: fuelTypeData.price, numberOfStations: fuelTypeData.number_of_stations
                        });
                    } else {
                        perFuelTypeData.unshift(null);
                    }
                    dataPerFuelType.set(fuelType, perFuelTypeData);
                }
            }

            return {dates: dates, dataFiles: dataFiles, data: dataPerFuelType};
        });
    }

    static toISODateString(date: Date): string {
        return date.toISOString().split('T')[0] || '';
    }
}
