'use client';

import { IntlProvider } from 'react-intl';
import messages from '@/app/i18n';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <IntlProvider messages={messages['pl']} locale="pl" defaultLocale="pl">
            {children}
        </IntlProvider>
    );
} 