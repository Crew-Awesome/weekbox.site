import './globals.css';

export const metadata = {
  title: 'Weekbox',
  description: 'The ultimate Friday Night Funkin\' launcher.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
