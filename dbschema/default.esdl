module default {
    type Location {
        required property nazwa -> str; # name of city/village
    }

    type GarbageCollection {
        required property indeks -> int64; # index
        required link lokalizacja -> Location; # location
        required property data_utworzenia -> datetime; # creation date
        required property miesiac -> str; # month (Styczeń, Luty, etc.)
        required property dzien -> str; # day (pon., wt., śr., etc.)
        required property typ -> str; # 'Segregowane' or 'Zmieszane'
    }
}
