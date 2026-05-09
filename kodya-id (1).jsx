import { useState, useEffect, useRef } from "react";

const O = "#F97316";
const NAV = ["Beranda","Politik","Budaya","Urban","Lingkungan","Ekonomi","Teknologi","Opini","Investigasi"];
const BREAKING = [
  "KPK Tetapkan Tersangka Baru dalam Skandal Korupsi Pertambangan di Kalimantan Timur",
  "PBB: Indonesia Harus Percepat Transisi Energi Terbarukan sebelum 2030 atau Hadapi Sanksi Perdagangan",
  "Inflasi Pangan Naik 8,3% — Warga Kota Menengah Paling Terdampak, BPS Akui Data Tak Sempurna",
  "Riset: 67% Generasi Z Indonesia Tak Percaya pada Partai Politik Manapun",
  "Sidang MK Soal UU Cipta Kerja Berlanjut — Ribuan Buruh Turun ke Jalan di Depan Gedung DPR",
  "Hutan Hujan Sumatera Terancam Habis dalam 12 Tahun Menurut Laporan KLHK yang Bocor",
];

const CAT_COLOR = {
  Investigasi:"#dc2626", Politik:"#1d4ed8", Ekonomi:"#0f766e",
  Lingkungan:"#15803d", Teknologi:"#7c3aed", Urban:"#b45309",
  Budaya:"#be185d", Opini:O, Esai:O, Kolom:O,
  "Global South":"#0e7490", Internasional:"#0e7490",
};
const cc = (c) => CAT_COLOR[c] || O;

const FEATURED = {
  cat:"Investigasi",
  title:"Di Balik Tambang: Siapa yang Benar-Benar Menguasai Nikel Indonesia?",
  excerpt:"Ribuan hektare tanah adat beralih tangan dalam satu dekade. Jejak modal asing dan konglomerat dalam negeri yang jarang disebut nama.",
  author:"Reza Mahardika", date:"9 Mei 2025", rt:"18 mnt",
  img:"https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1400&q=80",
};

const SEC = [
  { cat:"Politik", title:"Pemilu 2029: Peta Kekuatan Koalisi yang Belum Terbentuk", date:"9 Mei 2025", img:"https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80" },
  { cat:"Ekonomi", title:"Rupiah dan Krisis Diam-Diam yang Tak Pernah Diakui Pemerintah", date:"8 Mei 2025", img:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80" },
  { cat:"Urban", title:"Jakarta Pasca-Ibu Kota: Kota yang Mencari Dirinya Sendiri", date:"8 Mei 2025", img:"https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=600&q=80" },
];

const MAIN = [
  { cat:"Lingkungan", title:"Ekspansi Sawit vs. Orangutan: Konflik yang Tak Kunjung Selesai", excerpt:"Kebijakan moratorium yang lemah dan pengawasan longgar membuat konsesi baru terus diterbitkan di jantung hutan Kalimantan.", author:"Sari Dewi", date:"9 Mei 2025", rt:"9 mnt", img:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80" },
  { cat:"Teknologi", title:"Algoritma yang Memilih Presiden: Survei Digital dan Manipulasi Opini Publik", excerpt:"Di balik angka survei yang dikutip media setiap hari, ada industri data yang menentukan narasi politik nasional.", author:"Ahmad Fauzi", date:"8 Mei 2025", rt:"11 mnt", img:"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" },
  { cat:"Politik", title:"Oposisi yang Dimakan Sistem: Partai Kecil di Parlemen Tanpa Suara", excerpt:"Ambang batas parlemen yang tinggi membungkam representasi. Suara jutaan pemilih menguap di tengah permainan koalisi.", author:"Maya Putri", date:"7 Mei 2025", rt:"13 mnt", img:"https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80" },
  { cat:"Ekonomi", title:"Kelas Menengah Bawah: Mereka yang Jatuh dan Tak Pernah Dihitung", excerpt:"Data BPS tak menangkap seluruh cerita. Ini adalah wajah dari mereka yang 'hampir miskin' dalam statistik tetapi benar-benar miskin dalam hidup.", author:"Rini Setiawan", date:"7 Mei 2025", rt:"10 mnt", img:"https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80" },
];

const OPINI_BIG = { cat:"Opini", title:"Urbanisme Tanpa Rasa: Kenapa Kota-Kota Indonesia Kehilangan Jiwa?", author:"Dr. Hendra Kusuma", authorTitle:"Sosiolog Urban, Universitas Indonesia", date:"9 Mei 2025", rt:"14 mnt", excerpt:"Pembangunan masif tanpa visi kultural melahirkan kota-kota yang identik satu sama lain — penuh mal, minus ruang publik, dan tanpa ingatan kolektif.", img:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80" };

const OPINI_LIST = [
  { cat:"Esai", title:"Mengapa Bahasa Indonesia Butuh Reformasi di Era Digital", author:"Prof. Wulandari Santoso", date:"8 Mei 2025", rt:"7 mnt" },
  { cat:"Opini", title:"Ekofeminisme dan Gerakan Perempuan Desa Melawan Tambang", author:"Laras Ningsih", date:"8 Mei 2025", rt:"9 mnt" },
  { cat:"Kolom", title:"Liberalisme Ekonomi Sudah Mati. Apa yang Akan Menggantikannya?", author:"Budi Santoso, Ph.D", date:"7 Mei 2025", rt:"12 mnt" },
  { cat:"Esai", title:"Warung Kopi sebagai Institusi Demokrasi: Sebuah Pembelaan", author:"Andika Ramadhan", date:"6 Mei 2025", rt:"6 mnt" },
];

const INV = [
  { cat:"Investigasi", title:"Proyek Kereta Cepat: Dana Hilang, Tanah Rakyat, dan Konsorsium Bayangan", excerpt:"Dokumen yang diperoleh Kodya.id mengungkap aliran dana misterius ke perusahaan cangkang terkait proyek senilai ratusan triliun rupiah.", author:"Tim Investigasi Kodya.id", date:"5 Mei 2025", rt:"25 mnt", img:"https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80" },
  { cat:"Investigasi", title:"Mafia Tanah di Pesisir: Bagaimana Nelayan Kehilangan Pantainya", excerpt:"Selama lima tahun, tim kami menelusuri alih fungsi lahan pesisir yang menghancurkan kehidupan ribuan keluarga nelayan Jawa Barat.", author:"Dewi Rahayu", date:"1 Mei 2025", rt:"20 mnt", img:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80" },
];

const BUDAYA = [
  { cat:"Budaya", title:"Seni Graffiti Bandung: Perlawanan Diam yang Mengisi Tembok Kota", date:"9 Mei 2025", img:"https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&q=80", tall:true },
  { cat:"Urban", title:"Warung Makan vs. Food Court: Pertarungan Ruang dan Kelas Sosial", date:"8 Mei 2025", img:"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", tall:false },
  { cat:"Budaya", title:"Sastra Kelas Pekerja: Suara yang Tidak Pernah Masuk Daftar Best Seller", date:"7 Mei 2025", img:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80", tall:true },
  { cat:"Urban", title:"Terminal Bus sebagai Monumen Modernisme yang Gagal", date:"6 Mei 2025", img:"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80", tall:false },
  { cat:"Budaya", title:"K-Pop di Kampung: Globalisasi Budaya yang Meresap hingga Pelosok Desa", date:"5 Mei 2025", img:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80", tall:false },
];

const GS = [
  { cat:"Internasional", title:"Gaza, Kongo, dan Sudan: Tentang Dunia yang Hanya Peduli Secara Selektif", author:"Amira Siddiqui", date:"9 Mei 2025", rt:"15 mnt", img:"https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=600&q=80" },
  { cat:"Global South", title:"BRICS atau Barat: Negara-Negara Selatan Memilih Jalannya Sendiri", author:"Carlos Mendes", date:"8 Mei 2025", rt:"12 mnt", img:"https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&q=80" },
  { cat:"Internasional", title:"Utang Tersembunyi: Bagaimana IMF Masih Mengontrol Nasib Afrika", author:"Ngozi Adeyemi", date:"7 Mei 2025", rt:"14 mnt", img:"https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80" },
];

const MOSTREAD = [
  { n:1, cat:"Investigasi", title:"Di Balik Tambang: Siapa yang Benar-Benar Menguasai Nikel Indonesia?", rt:"18 mnt" },
  { n:2, cat:"Politik", title:"Pemilu 2029: Peta Kekuatan Koalisi yang Belum Terbentuk", rt:"8 mnt" },
  { n:3, cat:"Ekonomi", title:"Kelas Menengah Bawah: Mereka yang Jatuh dan Tak Pernah Dihitung", rt:"10 mnt" },
  { n:4, cat:"Opini", title:"Urbanisme Tanpa Rasa: Kenapa Kota-Kota Indonesia Kehilangan Jiwa?", rt:"14 mnt" },
  { n:5, cat:"Teknologi", title:"Algoritma yang Memilih Presiden", rt:"11 mnt" },
];

const EDITORS = [
  { cat:"Lingkungan", title:"Ekspansi Sawit vs. Orangutan: Konflik yang Tak Kunjung Selesai", author:"Sari Dewi", img:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80" },
  { cat:"Investigasi", title:"Mafia Tanah di Pesisir: Bagaimana Nelayan Kehilangan Pantainya", author:"Dewi Rahayu", img:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80" },
  { cat:"Global South", title:"BRICS atau Barat: Negara-Negara Selatan Memilih Jalannya Sendiri", author:"Carlos Mendes", img:"https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80" },
];

function Badge({ cat, sm }) {
  return (
    <span style={{ background:cc(cat), color:"#fff", fontSize:sm?"10px":"11px", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", padding:"2px 8px", borderRadius:"2px", display:"inline-block", fontFamily:"'Source Sans 3',sans-serif" }}>
      {cat}
    </span>
  );
}

function SectionHeader({ label, dark }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"32px" }}>
      <div style={{ width:"4px", height:"22px", background:O, borderRadius:"2px", flexShrink:0 }} />
      <h2 style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color: dark?"#f0f0f0":"#111", fontFamily:"'Source Sans 3',sans-serif" }}>{label}</h2>
      <div style={{ flex:1, height:"1px", background: dark?"#2a2a2a":"#e8e8e8" }} />
    </div>
  );
}

function ReadTime({ rt, muted }) {
  return <span style={{ fontSize:"12px", color:muted, fontFamily:"'Source Sans 3',sans-serif" }}>{rt}</span>;
}

export default function KodyaId() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [bm, setBm] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeNav, setActiveNav] = useState("Beranda");

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(h > 0 ? Math.round((window.scrollY / h) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const d = dark;
  const bg = d ? "#0c0c0c" : "#ffffff";
  const tx = d ? "#f0f0f0" : "#111111";
  const mu = d ? "#888888" : "#6b7280";
  const surf = d ? "#161616" : "#f8f7f5";
  const card = d ? "#1a1a1a" : "#ffffff";
  const bord = d ? "#272727" : "#e8e8e8";
  const navBg = d
    ? (scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.95)")
    : (scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.97)");
  const serif = "'Playfair Display', Georgia, serif";
  const sans = "'Source Sans 3', system-ui, sans-serif";

  const toggleBm = (id) => setBm(p => ({ ...p, [id]: !p[id] }));

  const tickerText = BREAKING.join("  ·  ") + "  ·  " + BREAKING.join("  ·  ");

  return (
    <div style={{ background:bg, color:tx, fontFamily:sans, minHeight:"100vh", overflowX:"hidden" }}>

      {/* Reading progress bar */}
      <div style={{ position:"fixed", top:0, left:0, height:"2px", width:`${scrollPct}%`, background:O, zIndex:9999, transition:"width 0.1s linear" }} />

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        a{text-decoration:none;color:inherit;cursor:pointer;}
        img{display:block;width:100%;object-fit:cover;}
        button{cursor:pointer;font-family:'Source Sans 3',sans-serif;}
        input{font-family:'Source Sans 3',sans-serif;}
        @keyframes tickerMove{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        .ticker-track{display:inline-flex;animation:tickerMove 55s linear infinite;white-space:nowrap;}
        .ticker-track:hover{animation-play-state:paused;}
        .img-zoom{overflow:hidden;} .img-zoom img{transition:transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94);}
        .img-zoom:hover img{transform:scale(1.05);}
        .headline-hover{transition:color 0.2s;}
        .card-lift{transition:transform 0.2s ease,box-shadow 0.25s ease;}
        .card-lift:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,0.12);}
        .nav-link::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:2px;background:${O};transition:width 0.22s ease;}
        .nav-link:hover::after,.nav-link.active::after{width:100%;}
        .nav-link:hover,.nav-link.active{color:${O};}
        .subscribe-btn{background:${O};color:#fff;border:none;padding:8px 18px;font-size:13px;font-weight:700;letter-spacing:0.04em;transition:all 0.2s;border-radius:2px;}
        .subscribe-btn:hover{background:#ea6c0a;transform:translateY(-1px);}
        .icon-btn{background:none;border:none;padding:6px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:background 0.15s;}
        .icon-btn:hover{background:rgba(128,128,128,0.12);}
        .fade-up{animation:fadeUp 0.65s ease forwards;}
        .fade-up-2{animation:fadeUp 0.65s ease 0.12s both;}
        .fade-up-3{animation:fadeUp 0.65s ease 0.24s both;}
        .fade-up-4{animation:fadeUp 0.65s ease 0.36s both;}
        .blink{animation:blink 1.2s ease-in-out infinite;}
        .opini-item{border-top:1px solid ${bord};padding:18px 0;transition:background 0.15s;}
        .opini-item:hover .headline-hover{color:${O};}
        .mr-item{display:flex;align-items:flex-start;gap:16px;padding:16px 0;border-bottom:1px solid ${bord};}
        .mr-item:last-child{border-bottom:none;}
        .search-overlay{position:fixed;inset:0;background:${d?"rgba(5,5,5,0.97)":"rgba(255,255,255,0.98)"};z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;}
        .inp-search{border:none;border-bottom:2px solid ${O};background:transparent;outline:none;font-size:28px;width:100%;max-width:640px;color:${tx};padding:12px 0;font-family:'Playfair Display',Georgia,serif;}
        .inp-search::placeholder{color:${mu};}
        .mobile-menu-panel{position:fixed;top:0;right:0;bottom:0;width:min(320px,100vw);background:${d?"#0e0e0e":"#fff"};z-index:9998;padding:80px 32px 32px;border-left:1px solid ${bord};overflow-y:auto;}
        .newsletter-input{border:none;border-bottom:1px solid rgba(255,255,255,0.3);background:transparent;outline:none;color:#fff;font-size:15px;padding:10px 0;width:100%;}
        .newsletter-input::placeholder{color:rgba(255,255,255,0.5);}
        @media(max-width:900px){
          .nav-links{display:none!important;}
          .hero-layout{flex-direction:column!important;}
          .hero-right{display:none!important;}
          .main-grid-4{grid-template-columns:1fr!important;}
          .opini-layout{grid-template-columns:1fr!important;}
          .inv-grid{grid-template-columns:1fr!important;}
          .masonry-grid{columns:1!important;}
          .gs-grid{grid-template-columns:1fr!important;}
          .sidebar-layout{grid-template-columns:1fr!important;}
          .footer-cols{grid-template-columns:1fr 1fr!important;}
          .hide-mobile{display:none!important;}
          .menu-btn{display:flex!important;}
        }
        @media(min-width:901px){.menu-btn{display:none!important;}}
        @media(max-width:640px){.footer-cols{grid-template-columns:1fr!important;}}
      `}</style>

      {/* ═══ NAVBAR ═══ */}
      <nav style={{ position:"sticky", top:0, zIndex:5000, background:navBg, borderBottom:`1px solid ${scrolled?bord:"transparent"}`, backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", transition:"all 0.3s" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", height:60, gap:24 }}>
          {/* Logo */}
          <a href="#" style={{ flexShrink:0, display:"flex", alignItems:"baseline", gap:1 }}>
            <span style={{ fontFamily:serif, fontSize:22, fontWeight:900, color:tx, letterSpacing:"-0.02em" }}>Kodya</span>
            <span style={{ fontFamily:serif, fontSize:22, fontWeight:900, color:O }}>.</span>
            <span style={{ fontFamily:serif, fontSize:22, fontWeight:900, color:tx }}>id</span>
          </a>

          {/* Desktop nav */}
          <div className="nav-links" style={{ display:"flex", alignItems:"center", gap:4, flex:1, justifyContent:"center", flexWrap:"nowrap", overflow:"hidden" }}>
            {NAV.map(n => (
              <button key={n} className={`nav-link ${activeNav===n?"active":""}`} onClick={() => setActiveNav(n)}
                style={{ background:"none", border:"none", fontSize:13, fontWeight:activeNav===n?600:500, color:activeNav===n?O:mu, padding:"4px 10px", position:"relative", whiteSpace:"nowrap", letterSpacing:"0.01em" }}>
                {n}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0, marginLeft:"auto" }}>
            <button className="icon-btn" onClick={() => setSearchOpen(true)} title="Cari" style={{ color:tx }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
            <button className="icon-btn" onClick={() => setDark(!d)} title="Dark mode" style={{ color:tx }}>
              {d
                ? <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                : <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>
            <button className="subscribe-btn hide-mobile" style={{ fontFamily:sans }}>Subscribe</button>
            {/* Hamburger */}
            <button className="icon-btn menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ color:tx }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu-panel" onClick={e => e.stopPropagation()}>
          <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
            {NAV.map(n => (
              <button key={n} onClick={() => { setActiveNav(n); setMenuOpen(false); }}
                style={{ background:"none", border:"none", textAlign:"left", fontSize:18, fontWeight:activeNav===n?700:400, color:activeNav===n?O:tx, padding:"12px 0", fontFamily:sans, borderBottom:`1px solid ${bord}` }}>
                {n}
              </button>
            ))}
            <button className="subscribe-btn" style={{ marginTop:24, padding:"12px 24px", fontSize:14, fontFamily:sans }}>Subscribe — Gratis</button>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div style={{ width:"100%", maxWidth:640 }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize:12, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:O, marginBottom:16 }}>Cari Artikel</div>
            <input className="inp-search" autoFocus placeholder="Ketik kata kunci..." value={searchQ} onChange={e => setSearchQ(e.target.value)} />
            <div style={{ marginTop:24, fontSize:13, color:mu }}>Tekan <kbd style={{ background:bord, padding:"2px 6px", borderRadius:3, fontFamily:"monospace" }}>Esc</kbd> untuk menutup</div>
          </div>
          <button onClick={() => setSearchOpen(false)} style={{ position:"absolute", top:24, right:24, background:"none", border:`1px solid ${bord}`, color:tx, padding:"6px 14px", fontSize:13, borderRadius:2 }}>✕ Tutup</button>
        </div>
      )}

      {/* ═══ BREAKING NEWS TICKER ═══ */}
      <div style={{ background:d?"#111":"#0f0f0f", borderBottom:`2px solid ${O}`, overflow:"hidden", height:38, display:"flex", alignItems:"center" }}>
        <div style={{ flexShrink:0, padding:"0 16px 0 20px", display:"flex", alignItems:"center", gap:8, borderRight:`1px solid #2a2a2a`, height:"100%" }}>
          <span className="blink" style={{ width:7, height:7, background:O, borderRadius:"50%", display:"inline-block" }} />
          <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", color:O, whiteSpace:"nowrap" }}>Breaking</span>
        </div>
        <div className="ticker-wrap" style={{ overflow:"hidden", flex:1, height:"100%", display:"flex", alignItems:"center" }}>
          <div className="ticker-track">
            {[...BREAKING, ...BREAKING].map((item, i) => (
              <span key={i} style={{ fontSize:12.5, color:"#e5e5e5", marginRight:64, fontWeight:400, letterSpacing:"0.01em" }}>
                <span style={{ color:O, marginRight:12, fontWeight:600 }}>›</span>{item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section style={{ maxWidth:1280, margin:"0 auto", padding:"32px 24px 0" }}>
        <div className="hero-layout" style={{ display:"flex", gap:2, height:520 }}>

          {/* Featured */}
          <a href="#" className="img-zoom fade-up" style={{ flex:"0 0 65%", position:"relative", display:"block", borderRadius:"2px", overflow:"hidden" }}>
            <img src={FEATURED.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)" }} />
            <div style={{ position:"absolute", inset:0, padding:"32px 36px", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
              <div style={{ marginBottom:12 }}>
                <Badge cat={FEATURED.cat} />
              </div>
              <h1 className="headline-hover" style={{ fontFamily:serif, fontSize:"clamp(22px, 3.5vw, 36px)", fontWeight:900, color:"#fff", lineHeight:1.15, marginBottom:14, maxWidth:580, letterSpacing:"-0.02em" }}>
                {FEATURED.title}
              </h1>
              <p style={{ fontSize:15, color:"rgba(255,255,255,0.78)", lineHeight:1.6, marginBottom:20, maxWidth:500 }}>{FEATURED.excerpt}</p>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <span style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>{FEATURED.author}</span>
                <span style={{ width:1, height:12, background:"rgba(255,255,255,0.3)" }} />
                <span style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>{FEATURED.date}</span>
                <span style={{ fontSize:13, color:O, fontWeight:600 }}>⏱ {FEATURED.rt}</span>
              </div>
            </div>
          </a>

          {/* Secondary headlines */}
          <div className="hero-right" style={{ flex:1, display:"flex", flexDirection:"column", gap:2 }}>
            {SEC.map((s, i) => (
              <a key={i} href="#" className="img-zoom fade-up-2" style={{ flex:1, position:"relative", display:"block", overflow:"hidden", borderRadius:"2px" }}>
                <img src={s.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%)" }} />
                <div style={{ position:"absolute", inset:0, padding:"14px 16px", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
                  <Badge cat={s.cat} sm />
                  <h3 className="headline-hover" style={{ fontFamily:serif, fontSize:16, fontWeight:700, color:"#fff", lineHeight:1.25, marginTop:8 }}>{s.title}</h3>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.55)", marginTop:6 }}>{s.date}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BERITA UTAMA ═══ */}
      <section style={{ maxWidth:1280, margin:"0 auto", padding:"64px 24px 0" }} className="fade-up-3">
        <SectionHeader label="Berita Utama" dark={d} />
        <div className="main-grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:28 }}>
          {MAIN.map((a, i) => (
            <a key={i} href="#" className="card-lift" style={{ background:card, border:`1px solid ${bord}`, borderRadius:"2px", overflow:"hidden", display:"block" }}>
              <div className="img-zoom" style={{ height:200 }}>
                <img src={a.img} alt="" style={{ height:"100%", objectFit:"cover" }} />
              </div>
              <div style={{ padding:"18px 18px 20px" }}>
                <Badge cat={a.cat} sm />
                <h3 className="headline-hover" style={{ fontFamily:serif, fontSize:17, fontWeight:700, lineHeight:1.3, margin:"10px 0 10px", letterSpacing:"-0.01em" }}>{a.title}</h3>
                <p style={{ fontSize:13.5, color:mu, lineHeight:1.65, marginBottom:14 }}>{a.excerpt}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <span style={{ fontSize:12, color:mu }}>{a.author}</span>
                    <span style={{ fontSize:12, color:mu, display:"block" }}>{a.date} · {a.rt}</span>
                  </div>
                  <button onClick={(e) => { e.preventDefault(); toggleBm(i); }} style={{ background:"none", border:"none", color:bm[i]?O:mu, transition:"color 0.2s", padding:4 }}>
                    <svg width="16" height="16" fill={bm[i]?"currentColor":"none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ OPINI & ESAI ═══ */}
      <section style={{ maxWidth:1280, margin:"0 auto", padding:"64px 24px 0" }}>
        <SectionHeader label="Opini & Esai" dark={d} />
        <div className="opini-layout" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48 }}>
          {/* Big opini */}
          <a href="#" className="card-lift" style={{ display:"block", position:"relative", overflow:"hidden", borderRadius:"2px" }}>
            <div className="img-zoom" style={{ height:320 }}>
              <img src={OPINI_BIG.img} alt="" style={{ height:"100%", objectFit:"cover" }} />
            </div>
            <div style={{ padding:"28px 0 0" }}>
              <Badge cat={OPINI_BIG.cat} />
              <h2 className="headline-hover" style={{ fontFamily:serif, fontSize:"clamp(20px, 2.5vw, 28px)", fontWeight:900, lineHeight:1.2, margin:"14px 0 14px", letterSpacing:"-0.02em" }}>
                {OPINI_BIG.title}
              </h2>
              <div style={{ borderLeft:`3px solid ${O}`, paddingLeft:16, marginBottom:18 }}>
                <p style={{ fontSize:15, color:mu, lineHeight:1.7, fontStyle:"italic" }}>{OPINI_BIG.excerpt}</p>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:O, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", flexShrink:0 }}>
                  {OPINI_BIG.author.split(" ").map(w=>w[0]).join("").slice(0,2)}
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:600 }}>{OPINI_BIG.author}</div>
                  <div style={{ fontSize:12, color:mu }}>{OPINI_BIG.authorTitle} · {OPINI_BIG.rt}</div>
                </div>
              </div>
            </div>
          </a>

          {/* Opini list */}
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:mu, marginBottom:20 }}>Terbaru</div>
            {OPINI_LIST.map((o, i) => (
              <a key={i} href="#" className="opini-item" style={{ display:"block" }}>
                <Badge cat={o.cat} sm />
                <h3 className="headline-hover" style={{ fontFamily:serif, fontSize:18, fontWeight:700, lineHeight:1.3, margin:"10px 0 10px", letterSpacing:"-0.01em" }}>{o.title}</h3>
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <span style={{ fontSize:13, color:mu }}>{o.author}</span>
                  <span style={{ fontSize:12, color:mu }}>· {o.date}</span>
                  <span style={{ marginLeft:"auto", fontSize:12, color:mu }}>{o.rt}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INVESTIGASI ═══ */}
      <section style={{ background:d?"#111111":"#0f0f0f", marginTop:64 }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"64px 24px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:40 }}>
            <div style={{ width:4, height:22, background:"#dc2626", borderRadius:2, flexShrink:0 }} />
            <h2 style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#dc2626", fontFamily:sans }}>Investigasi</h2>
            <div style={{ flex:1, height:"1px", background:"#2a2a2a" }} />
            <span style={{ fontSize:12, color:"#666", fontWeight:500, whiteSpace:"nowrap" }}>Jurnalisme Mendalam</span>
          </div>
          <div className="inv-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:3 }}>
            {INV.map((a, i) => (
              <a key={i} href="#" className="img-zoom" style={{ position:"relative", display:"block", height:360, overflow:"hidden" }}>
                <img src={a.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(0,0,0,0.85) 100%)" }} />
                <div style={{ position:"absolute", inset:0, padding:32, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
                  <Badge cat={a.cat} />
                  <h2 className="headline-hover" style={{ fontFamily:serif, fontSize:"clamp(18px, 2.2vw, 24px)", fontWeight:900, color:"#fff", lineHeight:1.2, margin:"14px 0 12px", letterSpacing:"-0.02em" }}>{a.title}</h2>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,0.7)", lineHeight:1.6, marginBottom:20 }}>{a.excerpt}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                    <span style={{ fontSize:12, color:"rgba(255,255,255,0.55)" }}>{a.author}</span>
                    <span style={{ fontSize:12, color:"rgba(255,255,255,0.55)" }}>{a.date}</span>
                    <span style={{ marginLeft:"auto", fontSize:13, color:"#dc2626", fontWeight:700 }}>⏱ {a.rt}</span>
                  </div>
                  <div style={{ marginTop:20, display:"inline-flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:12, fontWeight:600, color:"#dc2626", letterSpacing:"0.08em", textTransform:"uppercase", borderBottom:"1px solid #dc2626", paddingBottom:1 }}>Baca Laporan Lengkap</span>
                    <svg width="14" height="14" fill="none" stroke="#dc2626" strokeWidth="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BUDAYA & KOTA ═══ */}
      <section style={{ maxWidth:1280, margin:"0 auto", padding:"64px 24px 0" }}>
        <SectionHeader label="Budaya & Kota" dark={d} />
        <div className="masonry-grid" style={{ columns:3, gap:16, columnGap:16 }}>
          {BUDAYA.map((b, i) => (
            <a key={i} href="#" className="card-lift" style={{ display:"block", marginBottom:16, breakInside:"avoid", overflow:"hidden", borderRadius:"2px", position:"relative" }}>
              <div className="img-zoom" style={{ height: b.tall ? 340 : 210 }}>
                <img src={b.img} alt="" style={{ height:"100%", objectFit:"cover" }} />
              </div>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 18px" }}>
                <Badge cat={b.cat} sm />
                <h3 className="headline-hover" style={{ fontFamily:serif, fontSize:16, fontWeight:700, color:"#fff", lineHeight:1.25, marginTop:8 }}>{b.title}</h3>
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginTop:6, display:"block" }}>{b.date}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ GLOBAL SOUTH ═══ */}
      <section style={{ background:surf, marginTop:64 }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"64px 24px" }}>
          <SectionHeader label="Perspektif Global South" dark={d} />
          <div className="gs-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:32 }}>
            {GS.map((g, i) => (
              <a key={i} href="#" className="card-lift" style={{ display:"block", background:card, border:`1px solid ${bord}`, borderRadius:"2px", overflow:"hidden" }}>
                <div className="img-zoom" style={{ height:180 }}>
                  <img src={g.img} alt="" style={{ height:"100%", objectFit:"cover" }} />
                </div>
                <div style={{ padding:"20px 20px 22px" }}>
                  <Badge cat={g.cat} sm />
                  <h3 className="headline-hover" style={{ fontFamily:serif, fontSize:18, fontWeight:700, lineHeight:1.3, margin:"10px 0 14px", letterSpacing:"-0.01em" }}>{g.title}</h3>
                  <div style={{ borderTop:`1px solid ${bord}`, paddingTop:14, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600 }}>{g.author}</div>
                      <div style={{ fontSize:12, color:mu }}>{g.date}</div>
                    </div>
                    <span style={{ fontSize:12, color:mu }}>{g.rt}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MOST READ + EDITOR'S PICK ═══ */}
      <section style={{ maxWidth:1280, margin:"0 auto", padding:"64px 24px 0" }}>
        <div className="sidebar-layout" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64 }}>
          {/* Most Read */}
          <div>
            <SectionHeader label="Paling Banyak Dibaca" dark={d} />
            {MOSTREAD.map((m, i) => (
              <a key={i} href="#" className="mr-item" style={{ display:"flex", alignItems:"flex-start", gap:20, padding:"18px 0", borderBottom:`1px solid ${bord}` }}>
                <span style={{ fontSize:36, fontWeight:900, color:i===0?O:bord, lineHeight:1, fontFamily:serif, minWidth:40 }}>0{m.n}</span>
                <div style={{ flex:1 }}>
                  <Badge cat={m.cat} sm />
                  <h4 className="headline-hover" style={{ fontFamily:serif, fontSize:16, fontWeight:700, lineHeight:1.3, margin:"8px 0 6px" }}>{m.title}</h4>
                  <span style={{ fontSize:12, color:mu }}>{m.rt}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Editor's Pick */}
          <div>
            <SectionHeader label="Pilihan Redaksi" dark={d} />
            {EDITORS.map((e, i) => (
              <a key={i} href="#" style={{ display:"flex", gap:16, padding:"16px 0", borderBottom:`1px solid ${bord}`, alignItems:"flex-start" }}>
                <div className="img-zoom" style={{ width:88, height:68, borderRadius:"2px", flexShrink:0, overflow:"hidden" }}>
                  <img src={e.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
                <div style={{ flex:1 }}>
                  <Badge cat={e.cat} sm />
                  <h4 className="headline-hover" style={{ fontFamily:serif, fontSize:15, fontWeight:700, lineHeight:1.3, margin:"8px 0 6px" }}>{e.title}</h4>
                  <span style={{ fontSize:12, color:mu }}>{e.author}</span>
                </div>
              </a>
            ))}
            {/* Trending Tags */}
            <div style={{ marginTop:36 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:mu, marginBottom:16 }}>Trending Topik</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {["#Nikel","#Pemilu2029","#KotaMati","#GlobalSouth","#KPK","#EnergiHijau","#Rupiah","#BuruhMigran","#DataPolitik"].map(t => (
                  <a key={t} href="#" style={{ fontSize:12, fontWeight:600, color:d?"#bbb":"#444", background:d?"#222":"#f0efec", padding:"5px 12px", borderRadius:2, border:`1px solid ${bord}`, transition:"all 0.15s" }}
                    onMouseEnter={e => { e.target.style.background=O; e.target.style.color="#fff"; e.target.style.borderColor=O; }}
                    onMouseLeave={e => { e.target.style.background=d?"#222":"#f0efec"; e.target.style.color=d?"#bbb":"#444"; e.target.style.borderColor=bord; }}>
                    {t}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section style={{ maxWidth:1280, margin:"64px auto 0", padding:"0 24px" }}>
        <div style={{ background:`linear-gradient(135deg, #0f0f0f 0%, #1a0a00 50%, #0f0f0f 100%)`, borderRadius:"4px", padding:"64px 56px", position:"relative", overflow:"hidden" }}>
          {/* Decorative element */}
          <div style={{ position:"absolute", top:-40, right:-40, width:280, height:280, borderRadius:"50%", border:`1px solid rgba(249,115,22,0.15)`, pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:10, right:10, width:160, height:160, borderRadius:"50%", border:`1px solid rgba(249,115,22,0.1)`, pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-60, left:200, width:200, height:200, borderRadius:"50%", border:`1px solid rgba(249,115,22,0.08)`, pointerEvents:"none" }} />

          <div style={{ maxWidth:520, position:"relative" }}>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:O }}>Newsletter Mingguan</span>
            <h2 style={{ fontFamily:serif, fontSize:"clamp(24px, 4vw, 36px)", fontWeight:900, color:"#fff", lineHeight:1.15, margin:"14px 0 16px", letterSpacing:"-0.02em" }}>
              Jurnalisme yang Tidak Anda Temukan di Tempat Lain.
            </h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.6)", lineHeight:1.7, marginBottom:32 }}>
              Setiap Minggu, pilihan editorial terbaik, analisis mendalam, dan bacaan panjang yang sepadan dengan waktu Anda.
            </p>
            {subbed ? (
              <div style={{ display:"flex", alignItems:"center", gap:12, color:"#4ade80" }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>
                <span style={{ fontSize:15, fontWeight:600 }}>Terima kasih! Cek inbox Anda.</span>
              </div>
            ) : (
              <div style={{ display:"flex", gap:0, maxWidth:440 }}>
                <input className="newsletter-input" type="email" placeholder="Alamat email Anda..." value={email} onChange={e => setEmail(e.target.value)}
                  style={{ flex:1, borderBottom:`1px solid rgba(249,115,22,0.4)`, background:"rgba(255,255,255,0.05)", padding:"12px 16px", fontSize:14, color:"#fff", border:"1px solid rgba(249,115,22,0.3)", borderRight:"none", outline:"none" }} />
                <button onClick={() => email && setSubbed(true)} className="subscribe-btn" style={{ padding:"12px 24px", fontSize:14, borderRadius:"0 2px 2px 0", fontFamily:sans }}>
                  Daftarkan Saya
                </button>
              </div>
            )}
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.35)", marginTop:14 }}>Gratis. Bisa berhenti kapan saja. Tanpa spam.</p>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background:d?"#0a0a0a":"#0f0f0f", marginTop:80, borderTop:`1px solid #1f1f1f` }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"64px 24px 40px" }}>
          {/* Logo + tagline */}
          <div style={{ borderBottom:"1px solid #1f1f1f", paddingBottom:48, marginBottom:48 }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:1, marginBottom:12 }}>
              <span style={{ fontFamily:serif, fontSize:28, fontWeight:900, color:"#fff" }}>Kodya</span>
              <span style={{ fontFamily:serif, fontSize:28, fontWeight:900, color:O }}>.</span>
              <span style={{ fontFamily:serif, fontSize:28, fontWeight:900, color:"#fff" }}>id</span>
            </div>
            <p style={{ fontSize:14, color:"#555", maxWidth:400, lineHeight:1.7 }}>
              Media jurnalisme mendalam untuk Indonesia urban. Kritis, independen, berpihak pada kebenaran.
            </p>
          </div>

          <div className="footer-cols" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:56 }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#555", marginBottom:20 }}>Rubrik</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px 24px" }}>
                {NAV.map(n => <a key={n} href="#" style={{ fontSize:13.5, color:"#888", transition:"color 0.15s" }}
                  onMouseEnter={e => e.target.style.color=O} onMouseLeave={e => e.target.style.color="#888"}>{n}</a>)}
              </div>
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#555", marginBottom:20 }}>Redaksi</div>
              {["Tentang Kami","Tim Redaksi","Pedoman Media Siber","Kode Etik","Kontak"].map(l => (
                <a key={l} href="#" style={{ display:"block", fontSize:13.5, color:"#888", marginBottom:10, transition:"color 0.15s" }}
                  onMouseEnter={e => e.target.style.color="#ddd"} onMouseLeave={e => e.target.style.color="#888"}>{l}</a>
              ))}
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#555", marginBottom:20 }}>Perusahaan</div>
              {["Karir","Iklan & Partnership","Investor","Press Room","Privacy Policy","Terms of Use"].map(l => (
                <a key={l} href="#" style={{ display:"block", fontSize:13.5, color:"#888", marginBottom:10, transition:"color 0.15s" }}
                  onMouseEnter={e => e.target.style.color="#ddd"} onMouseLeave={e => e.target.style.color="#888"}>{l}</a>
              ))}
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#555", marginBottom:20 }}>Ikuti Kami</div>
              {[["Instagram","@kodya.id"],["Twitter / X","@kodyaid"],["YouTube","Kodya TV"],["Telegram","t.me/kodyaid"],["LinkedIn","Kodya Media"]].map(([p,h]) => (
                <a key={p} href="#" style={{ display:"block", marginBottom:12 }}>
                  <div style={{ fontSize:11, color:"#444", marginBottom:2 }}>{p}</div>
                  <div style={{ fontSize:13, color:"#888", transition:"color 0.15s" }}
                    onMouseEnter={e => e.target.style.color=O} onMouseLeave={e => e.target.style.color="#888"}>{h}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop:"1px solid #1f1f1f", paddingTop:28, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
            <p style={{ fontSize:12, color:"#444" }}>© 2025 Kodya.id — PT Kodya Media Nusantara. Seluruh hak cipta dilindungi undang-undang.</p>
            <div style={{ display:"flex", gap:24 }}>
              {["Beranda","Privacy","Terms","Pedoman Media"].map(l => (
                <a key={l} href="#" style={{ fontSize:12, color:"#444", transition:"color 0.15s" }}
                  onMouseEnter={e => e.target.style.color="#aaa"} onMouseLeave={e => e.target.style.color="#444"}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
