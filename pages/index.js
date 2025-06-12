import Head from "next/head";
import Card from "../components/Cards";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-pink-200 flex flex-col items-center justify-center">
      <Head>
        <title>Affiliate Web3 Demo</title>
      </Head>
	<Card title="Gabung Affiliate" desc="Dapatkan komisi dari setiap referral." />
      <main className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Affiliate Web3 Demo</h1>
        <p className="mb-6 text-gray-700">
          Selamat datang! Ini adalah demo project affiliate dengan Next.js dan Tailwind CSS.
        </p>
        <a
          href="#"
          className="inline-block px-6 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-700 transition"
        >
          Lihat Tutorial
        </a>
      </main>
      <footer className="mt-8 text-gray-500 text-sm">
        &copy; 2025 Bideon Project
      </footer>
    </div>
  );
}