import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import LayoutContent from '@/layout/LayoutContent'

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider attribute="class">
            <LayoutContent>
                <Component {...pageProps} />
            </LayoutContent>
        </ThemeProvider>
    )
}
