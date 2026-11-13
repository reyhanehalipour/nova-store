import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="fa">
      <body style={{ fontFamily: "sans-serif", padding: "3rem", textAlign: "center" }}>
        <h1>Page not found</h1>
        <p>
          <Link href="/fa">Go to NOVA Store</Link>
        </p>
      </body>
    </html>
  );
}