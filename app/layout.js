export const metadata = {
  title: "Saiganesh Angadi — Portfolio",
  description: "macOS Taohe 26 inspired portfolio",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-taohe-50 text-slate-800 antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
