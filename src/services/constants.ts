interface FuelType {
    name: string;
    description: string;
}

export class Constants {
    static FUEL_TYPES: Array<FuelType> = [
        {
            name: 'UNLEADED_95',
            description: "Αμόλυβδη 95"
        },
        {
            name: 'UNLEADED_100',
            description: "Αμόλυβδη 100"
        },
        {
            name: 'SUPER',
            description: "Super"
        },
        {
            name: 'DIESEL',
            description: "Diesel"
        },
        {
            name: 'DIESEL_HEATING',
            description: "Diesel Θέρμανσης"
        },
        {
            name: 'GAS',
            description: "Υγραέριο"
        }
    ];

    static fuelTypes(): Array<string> {
        return Array.from(Constants.FUEL_TYPES, (fuelType) => fuelType.name);
    }

    static fuelTypeDescription(fuelType: string) : string | undefined {
        return Constants.FUEL_TYPES.find((e: FuelType) => e.name === fuelType)?.description
    }
}
