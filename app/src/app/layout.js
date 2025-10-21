import "./globals.css";

import AuthGuard from '@/components/AuthGuard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: "My Blog",
  description: "A blog about web development and programming.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthGuard>
          <div className="layout">
            <Navbar />
            {children}
            <Footer />
          </div>
        </AuthGuard>
      </body>
    </html>
  );
}
