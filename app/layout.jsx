import './globals.css';

export const metadata = {
  title: 'Weekbox',
  description: 'A Re-Imagined Original FNF Mod Launcher',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
