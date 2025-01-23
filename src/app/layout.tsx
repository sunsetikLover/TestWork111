import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.scss';
import '../styles/globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
