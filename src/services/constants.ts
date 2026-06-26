
interface FuelTypesMap {
    [index: string]: string;
}

export class Constants {
    static FUEL_TYPES: FuelTypesMap = {
        'UNLEADED_95': "Αμόλυβδη 95", 'UNLEADED_100': "Αμόλυβδη 100", 'SUPER': "Super", 'DIESEL': "Diesel",
        'DIESEL_HEATING': "Diesel Θέρμανσης", 'GAS': "Υγραέριο"
    };
}
