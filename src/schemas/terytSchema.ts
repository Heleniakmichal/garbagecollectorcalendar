interface FormState {
    values: {
        wojewodztwo?: string;
        powiat?: string;
        gmina?: string;
        miejscowosc?: string;
    };
}

export interface Schema {
    type: string;
    properties: {
        [key: string]: {
            type: string;
            title: string;
            enum?: string[];
            'ui:order'?: number;
            'ui:relevant'?: (formState: FormState) => boolean;
        };
    };
}

export const terytSchema: Schema = {
    type: 'object',
    properties: {
        wojewodztwo: {
            type: 'string',
            title: 'Województwo',
            enum: [
                'dolnośląskie',
                'kujawsko-pomorskie',
                'lubelskie',
                'lubuskie',
                'łódzkie',
                'małopolskie',
                'mazowieckie',
                'opolskie',
                'podkarpackie',
                'podlaskie',
                'pomorskie',
                'śląskie',
                'świętokrzyskie',
                'warmińsko-mazurskie',
                'wielkopolskie',
                'zachodniopomorskie'
            ],
            'ui:order': 1
        },
        powiat: {
            type: 'string',
            title: 'Powiat',
            enum: [],
            'ui:order': 2,
            'ui:relevant': (formState: FormState) => !!formState.values.wojewodztwo
        },
        gmina: {
            type: 'string',
            title: 'Gmina',
            enum: [],
            'ui:order': 3,
            'ui:relevant': (formState: FormState) => !!formState.values.powiat
        },
        miejscowosc: {
            type: 'string',
            title: 'Miejscowość',
            enum: [],
            'ui:order': 4,
            'ui:relevant': (formState: FormState) => !!formState.values.gmina
        }
    }
}; 