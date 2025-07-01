export const metadata = {
  title: 'Metro Station Locator',
  description: 'Find the nearest metro station to any place in India',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* You can add custom <meta> or <link> tags here if needed */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
