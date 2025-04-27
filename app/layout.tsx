import './globals.css';
import Navbar from './components/NavBar'; // ← works
// or
// import Navbar from '@/components/Navbar'; ← if alias is set

export const metadata = {
  title: 'My Portfolio',
  description: 'Minimal Portfolio by [Your Name]',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}