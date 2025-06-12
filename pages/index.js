import Link from "next/link";

export default function Home() {
  // Dummy data untuk list produk/layanan affiliate
  const affiliates = [
    {
      name: "Crypto Wallet Pro",
      desc: "Dompet crypto dengan keamanan tinggi dan fee rendah.",
      link: "#",
    },
    {
      name: "NFT Marketplace X",
      desc: "Tempat jual beli NFT termudah dan terpercaya.",
      link: "#",
    },
    {
      name: "DeFi Staking Platform",
      desc: "Staking token favoritmu dan dapatkan APY 15%/tahun.",
      link: "#",
    },
  ];

  // Dummy statistik
  const stats = {
    totalUsers: 1234,
    totalCommissions: "2.5 ETH",
    activeAffiliates: 10,
  };

  return (
    <main style={{fontFamily: "sans-serif", maxWidth: 800, margin: "0 auto", padding: 24}}>
      <h1 style={{textAlign: "center"}}>Web3 Affiliate Demo</h1>

      <section style={{margin: "40px 0", background: "#eee", padding: 24, borderRadius: 12}}>
        <h2>Statistik Affiliate (Dummy)</h2>
        <ul>
          <li>Total Pengguna: <b>{stats.totalUsers}</b></li>
          <li>Total Komisi Dibayar: <b>{stats.totalCommissions}</b></li>
          <li>Affiliate Aktif: <b>{stats.activeAffiliates}</b></li>
        </ul>
      </section>

      <section>
        <h2>Daftar Program Affiliate</h2>
        <ul style={{listStyle: "none", padding: 0}}>
          {affiliates.map((item, idx) => (
            <li key={idx} style={{
              border: "1px solid #ccc", borderRadius: 12, marginBottom: 16, padding: 16, background: "#fafafa"
            }}>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <a href={item.link} style={{color: "#0070f3"}} target="_blank" rel="noopener noreferrer">
                Daftar / Info
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section style={{marginTop: 40}}>
        <h2>Menu Lainnya</h2>
        <ul>
          <li><Link href="/about">Tentang Kami</Link></li>
          <li><Link href="/affiliate">Halaman Affiliate</Link></li>
          <li><Link href="/post/hello-world">Baca Postingan</Link></li>
        </ul>
      </section>
    </main>
  );
}