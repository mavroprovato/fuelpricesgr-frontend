
export class API {
    static API_BASE: string = import.meta.env.VITE_API_BASE;

    static async dailyCountryData() {
        const dailyCountryUrl = `${API.API_BASE}data/daily/country`;

        return await fetch(dailyCountryUrl).then((response: Response) => response.json());
    }
}
