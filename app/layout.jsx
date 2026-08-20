import '../css/main.css';
import './globals.css';
import { Navbar } from './components/organisms/Navbar';
import { Background } from './components/atoms/Background';
import { Footer } from './components/organisms/Footer';
import I18nProvider from './I18nProvider';

export const metadata = {
  title: 'WeekBox | The Re-Imagined FNF Mod Launcher',
  description: 'WeekBox is a desktop launcher for Friday Night Funkin\' mods. Browse GameBanana and Psych Online, install engines, and play your favorite mods in one place.',
  keywords: ['Friday Night Funkin', 'FNF', 'FNF Mods', 'WeekBox', 'Mod Launcher', 'GameBanana', 'Psych Engine', 'V-Slice', 'Friday Night Funkin Mods'],
  authors: [{ name: 'Crew-Awesome' }],
  creator: 'Crew-Awesome',
  publisher: 'Crew-Awesome',
  metadataBase: new URL('https://weekbox.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'WeekBox | The Re-Imagined FNF Mod Launcher',
    description: 'WeekBox brings the entire FNF mod ecosystem into a single app. Discover, install, and manage your favorite Friday Night Funkin\' mods with 1-click.',
    url: 'https://weekbox.site',
    siteName: 'WeekBox',
    images: [
      {
        url: '/assets/images/banner.png', 
        width: 1200,
        height: 630,
        alt: 'WeekBox - FNF Mod Launcher',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WeekBox | FNF Mod Launcher',
    description: '1-Click install FNF mods from GameBanana directly to your desktop. The ultimate hub for Friday Night Funkin\'.',
    images: ['/assets/images/banner.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <Background>
            <Navbar />
            <main className="flex-1 w-full flex flex-col">
              {children}
            </main>
            <Footer />
          </Background>
        </I18nProvider>
      </body>
    </html>
  );
}
