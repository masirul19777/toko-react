import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, NavLink, Link, useLocation } from "react-router-dom";

/* ------------------------------- Data ------------------------------- */

const PRODUCTS = [
  { id: "monstera", name: "Monstera Deliciosa", cat: "Tanaman Hias", emoji: "🌿", price: 185000, desc: "Daun lebar ikonik, tumbuh cepat di cahaya tidak langsung." },
  { id: "sansevieria", name: "Sansevieria Mini", cat: "Tanaman Hias", emoji: "🪴", price: 95000, desc: "Penyaring udara andal, cocok untuk meja kerja." },
  { id: "pot-terra", name: "Pot Keramik Terra", cat: "Pot & Planter", emoji: "🏺", price: 120000, desc: "Keramik matte 18 cm dengan lubang drainase." },
  { id: "tanah", name: "Media Tanam Premium", cat: "Perawatan", emoji: "🪨", price: 45000, desc: "Campuran sekam, kompos, dan perlit siap pakai." },
  { id: "calathea", name: "Calathea Ornata", cat: "Tanaman Hias", emoji: "🍃", price: 165000, desc: "Motif daun merah muda, favorit kolektor." },
  { id: "pot-gantung", name: "Pot Gantung Anyam", cat: "Pot & Planter", emoji: "🧺", price: 88000, desc: "Anyaman rotan dengan tali rami, hemat ruang." },
  { id: "zamioculcas", name: "Zamioculcas Zamiifolia", cat: "Tanaman Hias", emoji: "🌱", price: 145000, desc: "Tahan malas siram, cocok untuk pemula." },
  { id: "nutrisi", name: "Nutrisi Cair Daun", cat: "Perawatan", emoji: "💧", price: 38000, desc: "Booster pertumbuhan, 250 ml untuk 3 bulan." },
  { id: "pothos", name: "Golden Pothos", cat: "Tanaman Hias", emoji: "🌾", price: 79000, desc: "Merambat cantik untuk rak tinggi atau gantungan." },
  { id: "sekop", name: "Sekop & Garpu Mini", cat: "Perawatan", emoji: "🧰", price: 62000, desc: "Set alat tanam stainless dengan gagang kayu." },
  { id: "fiddle", name: "Fiddle Leaf Fig", cat: "Tanaman Hias", emoji: "🌳", price: 320000, desc: "Statement plant setinggi 80 cm untuk ruang tamu." },
  { id: "pot-semen", name: "Pot Semen Minimalis", cat: "Pot & Planter", emoji: "⬜", price: 110000, desc: "Beton ringan abu terang, diameter 20 cm." },
];

const CATEGORIES = ["Semua", "Tanaman Hias", "Pot & Planter", "Perawatan"];

const WA_NUMBER = "6281234567890";
const waLink = (text) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const rupiah = (n) =>
  "Rp" + n.toLocaleString("id-ID", { maximumFractionDigits: 0 });

/* ------------------------------ Ikon ------------------------------- */

function IconLeaf() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.44 0 1.44 1.05 2.83 1.2 3.03.15.2 2.07 3.3 5.03 4.5.7.3 1.25.48 1.68.61.7.22 1.34.19 1.85.12.56-.08 1.72-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.8 9.8 0 0 0 4.68 1.19h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 17.9a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.07.8.82-3-.19-.31a8.06 8.06 0 0 1-1.24-4.3c0-4.46 3.64-8.09 8.11-8.09a8.08 8.08 0 0 1 8.1 8.1c0 4.47-3.63 8.1-8.1 8.1Z" />
    </svg>
  );
}

/* ------------------------------ Layout ----------------------------- */

const NAV = [
  { to: "/", label: "Beranda" },
  { to: "/produk", label: "Produk" },
  { to: "/tentang", label: "Tentang" },
];

function Header() {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="logo" aria-label="Rimbun, ke beranda">
          <span className="logo__mark"><IconLeaf /></span>
          <span className="logo__name">Rim<span>bun</span></span>
        </Link>

        <nav className="nav" aria-label="Navigasi utama">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                "nav__link" + (isActive ? " is-active" : "")
              }
              aria-current={pathname === item.to ? "page" : undefined}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a className="btn btn--green header__cta" href={waLink("Halo Rimbun, saya ingin bertanya soal produk.")} target="_blank" rel="noopener noreferrer">
          Pesan Sekarang
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="logo">
            <span className="logo__mark"><IconLeaf /></span>
            <span className="logo__name">Rimbun</span>
          </div>
          <p>
            Toko tanaman hias &amp; pot estetik sejak 2019. Kami merawat setiap
            tanaman sampai siap dipindahkan ke rumah Anda.
          </p>
        </div>

        <div>
          <h4>Jelajahi</h4>
          <ul>
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Hubungi</h4>
          <ul>
            <li><a href={waLink("Halo Rimbun!")} target="_blank" rel="noopener noreferrer">WhatsApp 0812-3456-7890</a></li>
            <li><a href="mailto:halo@rimbun.id">halo@rimbun.id</a></li>
            <li>Jl. Melati No. 12, Bandung</li>
            <li>Senin–Sabtu, 09.00–18.00</li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Rimbun. Semua hak dilindungi.</span>
        <span>Dibuat dengan React + React Router</span>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      className="wa"
      href={waLink("Halo Rimbun, saya mau tanya-tanya dulu ya.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Rimbun"
    >
      <IconWhatsApp />
      <span className="wa__label">Chat WhatsApp</span>
    </a>
  );
}

/* --------------------------- Komponen UI --------------------------- */

function ProductCard({ p }) {
  return (
    <article className="card">
      <div className="card__thumb" role="img" aria-label={p.name}>{p.emoji}</div>
      <div className="card__body">
        <span className="card__cat">{p.cat}</span>
        <h3 className="card__name">{p.name}</h3>
        <p className="card__desc">{p.desc}</p>
        <div className="card__foot">
          <span className="price">{rupiah(p.price)}</span>
          <a
            className="card__link"
            href={waLink(`Halo, saya mau pesan ${p.name} (${rupiah(p.price)}).`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pesan →
          </a>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------ Pages ------------------------------ */

function Beranda() {
  const unggulan = PRODUCTS.slice(0, 4);
  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <span className="eyebrow">🌱 Nursery lokal Bandung</span>
            <h1>Rumah lebih hidup dengan tanaman pilihan.</h1>
            <p className="lead">
              Tanaman hias sehat, pot keramik estetik, dan panduan perawatan
              yang mudah — dikirim aman ke seluruh Indonesia.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/produk">Lihat Katalog</Link>
              <Link className="btn btn--ghost" to="/tentang">Kenali Kami</Link>
            </div>
            <div className="hero__stats">
              <div className="stat"><b>4.9/5</b><span>1.200+ ulasan</span></div>
              <div className="stat"><b>120+</b><span>spesies tanaman</span></div>
              <div className="stat"><b>24 jam</b><span>kirim area lokal</span></div>
            </div>
          </div>

          <div className="hero__card">
            <span className="hero__badge">✦ Garansi 7 hari hidup</span>
            <div className="hero__plant" role="img" aria-label="Ilustrasi tanaman hias">🪴</div>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Produk unggulan</span>
            <h2>Paling sering dibawa pulang</h2>
            <p>Dipilih dari stok terbaik minggu ini oleh tim gardener kami.</p>
          </div>
          <div className="grid">
            {unggulan.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
          <div style={{ marginTop: 22 }}>
            <Link className="btn btn--primary" to="/produk">Semua produk</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Kenapa belanja di Rimbun?</h2>
          </div>
          <div className="features">
            <div className="feature">
              <div className="feature__icon">🚚</div>
              <h3>Pengiriman aman</h3>
              <p>Kemasan khusus anti-guncang, akar terlindungi selama perjalanan.</p>
            </div>
            <div className="feature">
              <div className="feature__icon">💬</div>
              <h3>Konsultasi gratis</h3>
              <p>Tanya perawatan lewat WhatsApp, dijawab gardener berpengalaman.</p>
            </div>
            <div className="feature">
              <div className="feature__icon">🛡️</div>
              <h3>Garansi tanaman</h3>
              <p>Tanaman rusak saat kirim? Kami ganti tanpa ribet dalam 7 hari.</p>
            </div>
            <div className="feature">
              <div className="feature__icon">♻️</div>
              <h3>Ramah lingkungan</h3>
              <p>Media tanam organik dan kemasan kertas daur ulang.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta">
            <h2>Siap menghijaukan ruangan?</h2>
            <p>Chat kami dan dapatkan rekomendasi tanaman sesuai cahaya ruangan Anda.</p>
            <a className="btn" href={waLink("Halo Rimbun, tolong rekomendasi tanaman untuk ruangan saya.")} target="_blank" rel="noopener noreferrer">
              Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Produk() {
  const [aktif, setAktif] = useState("Semua");
  const list = aktif === "Semua" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === aktif);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Katalog</span>
          <h1 style={{ fontSize: "clamp(1.7rem, 6vw, 2.6rem)" }}>Semua Produk</h1>
          <p>{PRODUCTS.length} produk tersedia. Harga sudah termasuk pot dasar.</p>
        </div>

        <div className="chips" role="tablist" aria-label="Filter kategori">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={aktif === c}
              className={"chip" + (aktif === c ? " is-on" : "")}
              onClick={() => setAktif(c)}
              type="button"
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>

        {list.length === 0 && <p>Belum ada produk di kategori ini.</p>}
      </div>
    </section>
  );
}

function Tentang() {
  return (
    <>
      <section className="section">
        <div className="container prose">
          <span className="eyebrow">Tentang kami</span>
          <h1 style={{ fontSize: "clamp(1.7rem, 6vw, 2.6rem)" }}>Dari halaman kecil ke 120 spesies.</h1>
          <p>
            Rimbun dimulai tahun 2019 dari halaman 3×4 meter di Bandung. Awalnya
            hanya iseng membagi stek monstera ke teman kantor. Kini kami merawat
            lebih dari 120 spesies tanaman dan mengirim ke hampir seluruh
            Indonesia.
          </p>
          <p>
            Prinsip kami sederhana: tanaman harus sehat saat keluar dari nursery,
            dan pembeli harus tahu cara merawatnya. Karena itu setiap pesanan
            disertai kartu panduan singkat dan akses konsultasi gratis.
          </p>

          <div className="about-grid" style={{ marginTop: 22 }}>
            <div className="about-tile"><b>2019</b><span>Tahun berdiri</span></div>
            <div className="about-tile"><b>120+</b><span>Spesies dirawat</span></div>
            <div className="about-tile"><b>12rb</b><span>Pesanan terkirim</span></div>
            <div className="about-tile"><b>4.9</b><span>Rating pembeli</span></div>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <h2>Perjalanan Rimbun</h2>
          </div>
          <ul className="timeline">
            <li><b>2019</b> — Mulai menjual stek tanaman dari halaman rumah.</li>
            <li><b>2021</b> — Membuka greenhouse pertama dan menjual pot keramik lokal.</li>
            <li><b>2023</b> — Melayani pengiriman ke luar Jawa dengan kemasan khusus.</li>
            <li><b>2025</b> — Program garansi tanaman 7 hari dan konsultasi gratis.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta">
            <h2>Mau mampir ke nursery?</h2>
            <p>Jl. Melati No. 12, Bandung. Senin–Sabtu, 09.00–18.00. Kabari dulu ya.</p>
            <a className="btn" href={waLink("Halo Rimbun, saya ingin berkunjung ke nursery.")} target="_blank" rel="noopener noreferrer">
              Atur kunjungan
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function NotFound() {
  return (
    <section className="section">
      <div className="container prose" style={{ textAlign: "center" }}>
        <h1>404</h1>
        <p>Halaman yang Anda cari tidak ada.</p>
        <Link className="btn btn--primary" to="/">Kembali ke beranda</Link>
      </div>
    </section>
  );
}

/* ------------------------------ App -------------------------------- */

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </HashRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
