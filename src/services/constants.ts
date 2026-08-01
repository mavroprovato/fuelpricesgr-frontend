interface FuelType {
    name: string;
    description: string;
}

interface Prefecture {
    name: string;
    description: string;
}

export class Constants {
    static FUEL_TYPES: Array<FuelType> = [
        { name: 'UNLEADED_95', description: "Αμόλυβδη 95" },
        { name: 'UNLEADED_100', description: "Αμόλυβδη 100" },
        { name: 'SUPER', description: "Super" },
        { name: 'DIESEL', description: "Diesel" },
        { name: 'DIESEL_HEATING', description: "Diesel Θέρμανσης" },
        { name: 'GAS', description: "Υγραέριο" }
    ];

    static PREFECTURES: Array<Prefecture> = [
        { name: 'ATTICA', description: "ΑΤΤΙΚΗΣ"},
        { name: 'AETOLIA_ACARNANIA', description: "ΑΙΤΩΛΙΑΣ ΚΑΙ ΑΚΑΡΝΑΝΙΑΣ"},
        { name: 'ARGOLIS', description: "ΑΡΓΟΛΙΔΟΣ"},
        { name: 'ARKADIAS', description: "ΑΡΚΑΔΙΑΣ"},
        { name: 'ARTA', description: "ΑΡΤΗΣ"},
        { name: 'ACHAEA', description: "ΑΧΑΪΑΣ"},
        { name: 'BOEOTIA', description: "ΒΟΙΩΤΙΑΣ"},
        { name: 'GREVENA', description: "ΓΡΕΒΕΝΩΝ"},
        { name: 'DRAMA', description: "ΔΡΑΜΑΣ"},
        { name: 'DODECANESE', description: "ΔΩΔΕΚΑΝΗΣΟΥ"},
        { name: 'EVROS', description: "ΕΒΡΟΥ"},
        { name: 'EUBOEA', description: "ΕΥΒΟΙΑΣ"},
        { name: 'EVRYTANIA', description: "ΕΥΡΥΤΑΝΙΑΣ"},
        { name: 'ZAKYNTHOS', description: "ΖΑΚΥΝΘΟΥ"},
        { name: 'ELIS', description: "ΗΛΕΙΑΣ"},
        { name: 'IMATHIA', description: "ΗΜΑΘΙΑΣ"},
        { name: 'HERAKLION', description: "ΗΡΑΚΛΕΙΟΥ"},
        { name: 'THESPROTIA', description: "ΘΕΣΠΡΩΤΙΑΣ"},
        { name: 'THESSALONIKI', description: "ΘΕΣΣΑΛΟΝΙΚΗΣ"},
        { name: 'IOANNINA', description: "ΙΩΑΝΝΙΝΩΝ"},
        { name: 'KAVALA', description: "ΚΑΒΑΛΑΣ"},
        { name: 'KARDITSA', description: "ΚΑΡΔΙΤΣΗΣ"},
        { name: 'KASTORIA', description: "ΚΑΣΤΟΡΙΑΣ"},
        { name: 'KERKYRA', description: "ΚΕΡΚΥΡΑΣ"},
        { name: 'CEPHALONIA', description: "ΚΕΦΑΛΛΗΝΙΑΣ"},
        { name: 'KILKIS', description: "ΚΙΛΚΙΣ"},
        { name: 'KOZANI', description: "ΚΟΖΑΝΗΣ"},
        { name: 'CORINTHIA', description: "ΚΟΡΙΝΘΙΑΣ"},
        { name: 'CYCLADES', description: "ΚΥΚΛΑΔΩΝ"},
        { name: 'LACONIA', description: "ΛΑΚΩΝΙΑΣ"},
        { name: 'LARISSA', description: "ΛΑΡΙΣΗΣ"},
        { name: 'LASITHI', description: "ΛΑΣΙΘΙΟΥ"},
        { name: 'LESBOS', description: "ΛΕΣΒΟΥ"},
        { name: 'LEFKADA', description: "ΛΕΥΚΑΔΟΣ"},
        { name: 'MAGNESIA', description: "ΜΑΓΝΗΣΙΑΣ"},
        { name: 'MESSENIA', description: "ΜΕΣΣΗΝΙΑΣ"},
        { name: 'XANTHI', description: "ΞΑΝΘΗΣ"},
        { name: 'PELLA', description: "ΠΕΛΛΗΣ"},
        { name: 'PIERIA', description: "ΠΙΕΡΙΑΣ"},
        { name: 'PREVEZA', description: "ΠΡΕΒΕΖΗΣ"},
        { name: 'RETHYMNO', description: "ΡΕΘΥΜΝΗΣ"},
        { name: 'RHODOPE', description: "ΡΟΔΟΠΗΣ"},
        { name: 'SAMOS', description: "ΣΑΜΟΥ"},
        { name: 'SERRES', description: "ΣΕΡΡΩΝ"},
        { name: 'TRIKALA', description: "ΤΡΙΚΑΛΩΝ"},
        { name: 'PHTHIOTIS', description: "ΦΘΙΩΤΙΔΟΣ"},
        { name: 'FLORINA', description: "ΦΛΩΡΙΝΗΣ"},
        { name: 'PHOCIS', description: "ΦΩΚΙΔΟΣ"},
        { name: 'CHALKIDIKI', description: "ΧΑΛΚΙΔΙΚΗΣ"},
        { name: 'CHANIA', description: "ΧΑΝΙΩΝ"},
        { name: 'CHIOS', description: "ΧΙΟΥ"}
    ];

    static fuelTypes(): Array<string> {
        return Array.from(Constants.FUEL_TYPES, (fuelType) => fuelType.name);
    }

    static fuelTypeDescription(fuelType?: string) : string {
        if (!fuelType) {
            return '';
        }

        return Constants.FUEL_TYPES.find((e: FuelType) => e.name === fuelType)?.description || '';
    }

    static prefectures(): Array<string> {
        return Array.from(Constants.PREFECTURES, (prefecture) => prefecture.name);
    }

    static prefectureDescription(prefecture?: string) : string {
        if (!prefecture) {
            return '';
        }

        return Constants.PREFECTURES.find((e: Prefecture) => e.name === prefecture)?.description || '';
    }
}
