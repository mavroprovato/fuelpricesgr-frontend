/**
 * The date range response data
 */
export interface DateRange {
    start_date: string | null;
    end_date: string | null;
}

/**
 * The daily country response data.
 */
export interface DailyCountryData {
    date: string;
    data_file: string;
    data: Array<CountryData>;
}

/**
 * The country data.
 */
export interface CountryData {
    fuel_type: string;
    price: number;
    number_of_stations: number | null;
}

/**
 * The daily prefecture response data.
 */
export interface DailyPrefectureData {
    date: string;
    data_file: string;
    data: Array<PrefectureData>;
}

/**
 * The prefecture data.
 */
export interface PrefectureData {
    prefecture: string;
    fuel_type: string;
    price: number;
}

/**
 * Query parameters for the API.
 */
interface QueryParams {
    [name: string]: string
}

/**
 * Error thrown when communication with the API is not available.
 */
class APIError extends Error {
    /** The HTTP response status */
    public responseStatus: number | null;

    /**
     * Create the API error.
     *
     * @param message The error message.
     * @param responseStatus The HTTP response status.
     */
    constructor(message: string, responseStatus: number | null = null) {
        super(message);
        this.responseStatus = responseStatus;
    }
}

/**
 * Gets data from the API endpoints.
 */
export class API {
    /** The API base URL */
    static API_BASE: string = import.meta.env.VITE_API_BASE;

    /**
     * Get the date range for a fuel type.
     *
     * @param fuelType The fuel type.
     * @return The date range.
     */
    static async dateRange(fuelType: string): Promise<DateRange> {
        return await API.#fetchUrl(`dateRange/${fuelType}`).then(
            async function (data: any): Promise<DateRange> {
                return data;
            }
        );
    }

    /**
     * Get the daily country data.
     *
     * @param startDate The start date for the data to retrieve.
     * @param endDate The end date for the data to retrieve.
     * @return The daily country data.
     */
    static async dailyCountryData(
        startDate: Date | null = null, endDate: Date | null = null
    ): Promise<Array<DailyCountryData>> {
        const params: QueryParams = {}
        if (startDate) {
            params.start_date = API.#toISODateString(startDate);
        }
        if (endDate) {
            params.end_date = API.#toISODateString(endDate);
        }

        return await API.#fetchUrl('data/daily/country', params).then(
            async function (data: any): Promise<Array<DailyCountryData>> {
                return data;
            }
        );
    }

    /**
     * Get the daily prefecture data.
     *
     * @param prefecture The prefecture to get the data for.
     * @param startDate The start date for the data to retrieve.
     * @param endDate The end date for the data to retrieve.
     * @return The daily country data.
     */
    static async dailyPrefectureData(
        prefecture: string | null = null, startDate: Date | null = null, endDate: Date | null = null
    ): Promise<Array<DailyPrefectureData>> {
        const params: QueryParams = {}
        if (prefecture) {
            params.prefecture = prefecture;
        }
        if (startDate) {
            params.start_date = API.#toISODateString(startDate);
        }
        if (endDate) {
            params.end_date = API.#toISODateString(endDate);
        }

        return await API.#fetchUrl('data/daily/prefecture', params).then(
            async function (data: any): Promise<Array<DailyPrefectureData>> {
                return data;
            }
        );
    }

    /**
     * Fetch the data from an API URL.
     *
     * @param path The API path.
     * @param params The endpoint params.
     * @return The JSON content of the response.
     * @throws APIError If any error occurs.
     * @private
     */
    static async #fetchUrl(path: string, params: QueryParams | null = null): Promise<any> {
        // Construct the URL
        const url = new URL(path, API.API_BASE);
        if (params) {
            for (const [name, value] of Object.entries(params)) {
                url.searchParams.append(name, value);
            }
        }
        // Get the response
        let response;
        try {
            response = await fetch(url);
        } catch (error) {
            throw new APIError('Network error');
        }
        // Return the data if the response is successful
        if (response?.ok) {
            return response.json();
        }
        throw new APIError('HTTP error', response?.status);
    }

    /**
     * Formats a date to an ISO date string.
     *
     * @param date The date
     * @return The ISO date string
     * @private
     */
    static #toISODateString(date: Date): string {
        return date.toISOString().split('T')[0] || '';
    }
}
