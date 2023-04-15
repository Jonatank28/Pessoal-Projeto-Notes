import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import LayoutContent from '@/layout/LayoutContent'
import { NotesProvider } from '@/contexts/notesContext'

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider attribute="class">
            <LayoutContent>
                <NotesProvider>
                    <Component {...pageProps} />
                </NotesProvider>
            </LayoutContent>
        </ThemeProvider>
    )
}
