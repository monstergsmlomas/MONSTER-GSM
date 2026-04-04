import type { Metadata } from 'next';
import './globals.css';
import Cursor from '@/components/Cursor';

export const metadata: Metadata = {
  title: 'Monster GSM | Servicio Técnico Eléctrico en Dispositivos Móviles',
  description:
    'Especialistas en reparación eléctrica de dispositivos móviles. Reparación de pantallas, plaquetas y más. Lomas de Zamora.',
  keywords: ['reparacion celulares', 'servicio tecnico', 'lomas de zamora', 'monster gsm', 'reparacion pantallas', 'plaqueta'],
  openGraph: {
    title: 'Monster GSM',
    description: 'Servicio Técnico Especializado en Eléctrica de Dispositivos Móviles',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark text-white antialiased">
        <div className="scan-line" aria-hidden="true" />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
