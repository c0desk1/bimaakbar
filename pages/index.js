// pages/index.js
import React, { useEffect, useState } from 'react';
import Head from 'next/head';     // Untuk meta tag dan judul halaman
import Link from 'next/link';     // Untuk navigasi antar halaman di Next.js
import Script from 'next/script'; // Untuk menyisipkan skrip eksternal seperti Google Analytics

// Import konfigurasi Firebase yang sudah kita buat
import firebase from '../firebaseConfig'; 

// Dapatkan instance Realtime Database
const database = firebase.database();

// Fungsi helper untuk memformat timestamp menjadi tanggal yang mudah dibaca
const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'; // Jika timestamp kosong, kembalikan 'N/A'
    const date = new Date(timestamp);
    // Format tanggal ke lokal Indonesia, contoh: "13 Juni 2025"
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',  // Tampilkan tahun (contoh: 2025)
        month: 'long',    // Tampilkan nama bulan lengkap (contoh: Juni)
        day: 'numeric'    // Tampilkan tanggal (contoh: 13)
    });
};

const HomePage = () => {
    // State untuk menyimpan daftar postingan
    const [latestPosts, setLatestPosts] = useState([]);
    // State untuk menunjukkan apakah data sedang dimuat
    const [loading, setLoading] = useState(true);
    // State untuk menyimpan pesan error jika terjadi
    const [error, setError] = useState(null);

    // useEffect akan berjalan setelah komponen di-render pertama kali
    useEffect(() => {
        const fetchLatestPosts = () => {
            // Referensi ke path 'BimaAkbar/posts' di Firebase Realtime Database
            // orderByChild('timestamp'): Mengurutkan postingan berdasarkan timestamp
            // limitToLast(5): Hanya mengambil 5 postingan terbaru
            const postsRef = database.ref('BimaAkbar/posts')
                                      .orderByChild('timestamp')
                                      .limitToLast(5);

            // 'on' event listener: akan mendengarkan perubahan data secara real-time
            postsRef.on('value', (snapshot) => {
                const posts = [];
                // Iterasi setiap child (postingan) di snapshot data
                snapshot.forEach((childSnapshot) => {
                    const post = {
                        id: childSnapshot.key, // ID unik dari Firebase
                        ...childSnapshot.val() // Semua data postingan
                    };
                    // Hanya tambahkan postingan jika statusnya 'published'
                    if (post.status === 'published') {
                        posts.push(post);
                    }
                });
                // Urutkan postingan dari yang terbaru ke terlama (jika limitToLast belum cukup mengurutkan)
                posts.sort((a, b) => b.timestamp - a.timestamp);
                setLatestPosts(posts); // Update state dengan postingan yang ditemukan
                setLoading(false);     // Set loading menjadi false
            }, (err) => {
                // Tangani error jika gagal mengambil data
                console.error("Error fetching posts:", err);
                setError("Gagal memuat postingan. Silakan coba lagi nanti.");
                setLoading(false);
            });
        };

        fetchLatestPosts(); // Panggil fungsi pengambilan data saat komponen dimuat

        // Cleanup function: akan berjalan saat komponen di-unmount (dihapus dari DOM)
        // Ini penting untuk mencegah memory leak dengan menghentikan listener Firebase
        return () => {
            database.ref('BimaAkbar/posts').off('value');
        };
    }, []); // Array dependensi kosong: useEffect hanya berjalan sekali saat mount

    return (
        <> {/* Menggunakan Fragment <> </> karena komponen ini akan dibungkus oleh Layout */}
            <Head>
                {/* Judul halaman untuk tab browser dan SEO */}
                <title>Beranda | Nama Blog Anda</title>
                {/* Deskripsi halaman untuk SEO */}
                <meta name="description" content="Selamat datang di blog saya. Temukan postingan terbaru dan informatif." />
                {/* Anda bisa menambahkan meta tag lain di sini */}
            </Head>

            {/* Google Analytics Script */}
            {/* Skrip pertama untuk gtag.js (asinkron) */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-ZHKJ22MFVE"
                strategy="afterInteractive" // Memuat setelah halaman interaktif
            />
            {/* Skrip kedua untuk konfigurasi gtag */}
            <Script
                id="google-analytics-config" // ID unik untuk skrip ini
                strategy="afterInteractive"
            >
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-ZHKJ22MFVE');
                `}
            </Script>

            {/* Hero Section */}
            <section className="hero-section">
                <h1>Selamat Datang di Blog Saya!</h1>
                <p>Temukan artikel menarik seputar teknologi, tutorial, dan banyak lagi.</p>
                <Link href="#latest-posts">
                    <a className="btn-primary">Lihat Postingan Terbaru</a>
                </Link>
            </section>

            {/* Latest Posts Section */}
            <section id="latest-posts" className="latest-posts-section">
                <h2>Postingan Terbaru</h2>
                {loading && <p>Memuat postingan...</p>} {/* Tampilkan pesan loading */}
                {error && <p className="error-message">{error}</p>} {/* Tampilkan pesan error */}
                {/* Jika tidak loading dan tidak ada postingan, tampilkan pesan */}
                {!loading && latestPosts.length === 0 && <p>Belum ada postingan yang diterbitkan.</p>}

                <div className="posts-grid">
                    {/* Map (iterasi) setiap postingan untuk ditampilkan sebagai card */}
                    {latestPosts.map(post => (
                        <div className="post-card" key={post.id}>
                            {/* Tampilkan gambar cover jika ada */}
                            {post.cover && (
                                <div className="post-cover-wrapper">
                                    <img src={post.cover} alt={post.title} className="post-cover" />
                                </div>
                            )}
                            <div className="post-info">
                                {/* Tampilkan kategori */}
                                <span className="post-category">{post.category}</span>
                                {/* Link ke halaman detail postingan menggunakan slug */}
                                <Link href={`/post/${post.slug}`}>
                                    <a>
                                        <h3 className="post-title">{post.title}</h3>
                                    </a>
                                </Link>
                                {/* Tampilkan excerpt (ringkasan) postingan */}
                                <p className="post-excerpt">{post.excerpt}</p>
                                <div className="post-meta">
                                    {/* Tampilkan tanggal postingan */}
                                    <span>{formatDate(post.timestamp)}</span>
                                </div>
                                {/* Tombol "Baca Selengkapnya" */}
                                <Link href={`/post/${post.slug}`}>
                                    <a className="read-more-btn">Baca Selengkapnya &rarr;</a>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CSS untuk Hero dan Postingan - Bisa dipisah ke file CSS atau module */}
            <style jsx>{`
                /* Hero Section */
                .hero-section {
                    text-align: center;
                    padding: 80px 20px;
                    background-color: var(--background-card); /* Menggunakan variabel CSS dari Layout */
                    border-radius: 12px;
                    margin-bottom: 40px;
                }
                .hero-section h1 {
                    font-size: 2.8em;
                    margin-bottom: 20px;
                    color: var(--text-color);
                }
                .hero-section p {
                    font-size: 1.2em;
                    margin-bottom: 30px;
                    color: var(--text-secondary-color);
                }
                .hero-section .btn-primary {
                    background-color: var(--primary-color);
                    color: white;
                    padding: 12px 25px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .hero-section .btn-primary:hover {
                    background-color: #0066CC;
                    text-decoration: none;
                }

                /* Latest Posts Section */
                .latest-posts-section h2 {
                    font-size: 2em;
                    margin-bottom: 30px;
                    text-align: center;
                    color: var(--text-color);
                }
                .posts-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsif grid */
                    gap: 30px;
                }
                .post-card {
                    background-color: var(--background-card);
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    display: flex;
                    flex-direction: column;
                }
                .post-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
                }
                .post-cover-wrapper {
                    width: 100%;
                    height: 200px;
                    overflow: hidden;
                }
                .post-cover {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }
                .post-card:hover .post-cover {
                    transform: scale(1.05);
                }
                .post-info {
                    padding: 20px;
                    flex-grow: 1; /* Agar info mengisi sisa ruang */
                    display: flex;
                    flex-direction: column;
                }
                .post-category {
                    background-color: var(--primary-color);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 0.8em;
                    font-weight: bold;
                    align-self: flex-start; /* Agar badge kategori tidak selebar container */
                    margin-bottom: 10px;
                }
                .post-title {
                    font-size: 1.5em;
                    margin-top: 0;
                    margin-bottom: 10px;
                    color: var(--text-color);
                    line-height: 1.3;
                }
                .post-title a {
                        color: inherit; /* Pastikan warna link sama dengan teks */
                }
                .post-title a:hover {
                    text-decoration: underline;
                }
                .post-excerpt {
                    font-size: 0.95em;
                    color: var(--text-secondary-color);
                    margin-bottom: 15px;
                    flex-grow: 1; /* Agar excerpt mengisi sisa ruang */
                }
                .post-meta {
                    font-size: 0.85em;
                    color: var(--text-secondary-color);
                    margin-top: 10px;
                    margin-bottom: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .read-more-btn {
                    color: var(--primary-color);
                    font-weight: bold;
                    align-self: flex-start;
                }
                .read-more-btn:hover {
                    text-decoration: underline;
                }
                .error-message {
                    color: var(--error-color);
                    text-align: center;
                    font-weight: bold;
                    margin-top: 20px;
                }
                /* Media Queries for Responsiveness */
                @media (max-width: 768px) {
                    .hero-section {
                        padding: 60px 15px;
                    }
                    .hero-section h1 {
                        font-size: 2em;
                    }
                    .hero-section p {
                        font-size: 1em;
                    }

                    .posts-grid {
                        grid-template-columns: 1fr; /* Satu kolom di layar kecil */
                    }
                }
            `}</style>
        </>
    );
};

export default HomePage;
