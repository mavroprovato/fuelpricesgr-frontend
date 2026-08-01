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
        { name: 'ATTICA', description: "Αττικής"},
        { name: 'AETOLIA_ACARNANIA', description: "Αιτωλίας και Ακαρνανίας"},
        { name: 'ARGOLIS', description: "Αργολίδος"},
        { name: 'ARKADIAS', description: "Αρκαδίας"},
        { name: 'ARTA', description: "Άρτης"},
        { name: 'ACHAEA', description: "Αχαΐας"},
        { name: 'BOEOTIA', description: "Βοιωτίας"},
        { name: 'GREVENA', description: "Γρεβενών"},
        { name: 'DRAMA', description: "Δράμας"},
        { name: 'DODECANESE', description: "Δώδεκανήσου"},
        { name: 'EVROS', description: "Έβρου"},
        { name: 'EUBOEA', description: "Εύβοιας"},
        { name: 'EVRYTANIA', description: "Ευρυτανίας"},
        { name: 'ZAKYNTHOS', description: "Ζακύνθου"},
        { name: 'ELIS', description: "Ηλείας"},
        { name: 'IMATHIA', description: "Ημαθίας"},
        { name: 'HERAKLION', description: "Ηρακλείου"},
        { name: 'THESPROTIA', description: "Θεσπρωτίας"},
        { name: 'THESSALONIKI', description: "Θεσσαλλονίκης"},
        { name: 'IOANNINA', description: "Ιωαννίνων"},
        { name: 'KAVALA', description: "Καβάλας"},
        { name: 'KARDITSA', description: "Καρδίτης"},
        { name: 'KASTORIA', description: "Καστοριάς"},
        { name: 'KERKYRA', description: "Κέρκυρας"},
        { name: 'CEPHALONIA', description: "Κεφαλληνίας"},
        { name: 'KILKIS', description: "Κιλκίς"},
        { name: 'KOZANI', description: "Κοζάνης"},
        { name: 'CORINTHIA', description: "Κορινθίας"},
        { name: 'CYCLADES', description: "Κυκλάδων"},
        { name: 'LACONIA', description: "Λακωνίας"},
        { name: 'LARISSA', description: "Λαρίσης"},
        { name: 'LASITHI', description: "Λασιθίου"},
        { name: 'LESBOS', description: "Λέσβου"},
        { name: 'LEFKADA', description: "Λευκάδος"},
        { name: 'MAGNESIA', description: "Μαγνησίας"},
        { name: 'MESSENIA', description: "Μεσσηνίας"},
        { name: 'XANTHI', description: "Ξάνθης"},
        { name: 'PELLA', description: "Πέλλης"},
        { name: 'PIERIA', description: "Πιερίας"},
        { name: 'PREVEZA', description: "Πρεβέζηε"},
        { name: 'RETHYMNO', description: "Ρεθύμνης"},
        { name: 'RHODOPE', description: "Ροδόπης"},
        { name: 'SAMOS', description: "Σάμου"},
        { name: 'SERRES', description: "Σερρών"},
        { name: 'TRIKALA', description: "Τρικάλων"},
        { name: 'PHTHIOTIS', description: "Φθιώτιδος"},
        { name: 'FLORINA', description: "Φλωρίνης"},
        { name: 'PHOCIS', description: "Φωκίδος"},
        { name: 'CHALKIDIKI', description: "Χαλκιδικής"},
        { name: 'CHANIA', description: "Χανίων"},
        { name: 'CHIOS', description: "Χίου"}
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
