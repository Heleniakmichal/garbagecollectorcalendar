import { createIntl, createIntlCache } from '@formatjs/intl';

const messages = {
    'pl': {
        'garbage.type': 'Typ odpadu',
        'garbage.date': 'Data odbioru',
        'garbage.location': 'Lokalizacja',
        'garbage.add': 'Dodaj odbiór',
        'garbage.edit': 'Edytuj odbiór',
        'garbage.delete': 'Usuń odbiór',
        'garbage.selectLocation': 'Wybierz lokalizację...',
        'garbage.selectType': 'Wybierz typ...',
        'garbage.selectDate': 'Wybierz datę...',
        'garbage.upcoming': 'Nadchodzące odbiory',
        'garbage.noUpcoming': 'Brak nadchodzących odbiorów',
        'garbage.types.mixed': 'Zmieszane',
        'garbage.types.bio': 'Bio',
        'garbage.types.paper': 'Papier',
        'garbage.types.glass': 'Szkło',
        'garbage.types.plastic': 'Plastik',
        'garbage.types.electronic': 'Elektronika',
        'garbage.types.other': 'Inne'
    }
};

const cache = createIntlCache();

export const intl = createIntl(
    {
        locale: 'pl',
        messages: messages['pl']
    },
    cache
);

export default messages; 