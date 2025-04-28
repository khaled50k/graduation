import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { AuthProvider } from './Contexts/AuthContext';
import { ThemeProvider } from './Contexts/ThemeContext';
import { ToastProvider } from './Contexts/ToastContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <AuthProvider user={props.initialPage.props.auth?.user}>
                <ThemeProvider>
                    <ToastProvider>
                        <App {...props} />
                    </ToastProvider>
                </ThemeProvider>
            </AuthProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
