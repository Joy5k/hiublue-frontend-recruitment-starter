'use client'

// app/layout.tsx
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import ThemeProvider from "@/theme/index";
import { AuthProvider } from '../utils/authProvider'; // Import your AuthProvider

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <InitColorSchemeScript attribute="class" />
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <ThemeProvider>
                        <AuthProvider> {/* Wrap with AuthProvider */}
                            <CssBaseline />
                            {props.children}
                        </AuthProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}