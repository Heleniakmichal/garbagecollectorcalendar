module default {
    type Location {
        required property id -> uuid {
            default := uuid_generate_v4();
        }
        required property nazwa -> str;
        link garbage_collections -> GarbageCollection;
    }

    type GarbageCollection {
        required property id -> uuid {
            default := uuid_generate_v4();
        }
        required property date -> datetime;
        required property type -> str;
        required link location -> Location;
    }
} 