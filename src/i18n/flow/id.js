// Indonesian. Translation of en.js — keep the same shape.
// Button names inside the extension stay in English, because the extension itself is in English.
export default {
  meta: {
    title: "Unduh Massal Video & Gambar Google Flow — Veo, Nano Banana, 4K | Flow Bulk Downloader",
    description:
      "Ekstensi Chrome gratis untuk mengunduh massal semua video Veo dan gambar Nano Banana dari Google Flow dalam 4K, 1080p, GIF, atau 2K — ke folder mana pun. Tanpa akun, tidak pernah menimpa, tidak pernah kehilangan file."
  },
  ui: {
    skip: "Langsung ke konten",
    navProducts: "Produk",
    navFlow: "Flow Downloader",
    navContact: "Kontak",
    footerTagline: "Alat online yang menghemat waktu Anda berjam-jam.",
    footerProducts: "Produk",
    footerHelp: "Bantuan",
    footerGuide: "Panduan Flow Downloader",
    footerPrivacy: "Kebijakan privasi",
    footerContact: "Kontak",
    legal: "Google Flow, Veo, dan Nano Banana adalah merek dagang Google LLC. Web Whizz adalah pihak independen dan tidak berafiliasi dengan Google.",
    language: "Bahasa"
  },
  hero: {
    eyebrow: "Ekstensi Chrome untuk Google Flow",
    title: "Pengunduh yang tidak pernah kehilangan file",
    lead: "Unduh massal semua video Veo dan gambar Nano Banana dari proyek Google Flow Anda — dalam 4K, 1080p, GIF, atau 2K — ke folder mana pun yang Anda pilih. Apa pun yang tidak bisa disimpan dilaporkan dengan namanya, tidak pernah dilewati diam-diam.",
    store: "Tambahkan ke Chrome — gratis",
    soon: "Segera hadir di Chrome Web Store",
    guide: "Baca panduan",
    ratingOne: "{n} rating",
    ratingMany: "{n} rating",
    usersOne: "{n} pengguna",
    usersMany: "{n} pengguna",
    trust: "Tanpa akun · Tanpa pelacakan"
  },
  demo: {
    alt: "Demo animasi: dua proyek Flow diunduh satu per satu; setiap ubin menjadi kuning saat diunduh, lalu hijau saat tersimpan.",
    projects: ["Video perjalanan", "Foto produk"],
    queued: "ANTRE",
    status: "Proyek {p} dari {n} · {name}",
    progress: "{done} dari {total} file tersimpan",
    done: "Semua {total} file tersimpan · 0 terlewat",
    legendYellow: "mengunduh",
    legendGreen: "tersimpan"
  },
  compare: {
    title: "Mengapa tidak pernah kehilangan file",
    lead: "Kebanyakan pengunduh Flow mengambil apa yang bisa diambil dan membiarkan Anda mencari yang kurang. Flow Bulk Downloader memberi tahu persis apa yang terjadi pada setiap item.",
    us: "Flow Bulk Downloader",
    them: "Alternatif pada umumnya",
    rows: [
      ["Akun atau login", "Tidak perlu — pasang dan pakai", "Sering diwajibkan"],
      ["File yang sudah ada", "Tidak pernah ditimpa — salinan kedua mendapat (2), (3)…", "File bernama sama bisa bentrok"],
      ["Item gagal atau lambat", "Dicantumkan dengan namanya, “Coba lagi” sekali klik", "Biasanya diam saja, atau hanya angka"],
      ["Tempat file disimpan", "Folder mana pun, satu subfolder per proyek", "Sering hanya folder Unduhan"],
      ["Batas harian", "Tidak ada", "Versi gratis sering dibatasi"],
      ["Data Anda", "Tidak ada yang dikumpulkan — tanpa server", "Sebagian mengumpulkan data pribadi atau login"]
    ],
    note: "“Alternatif pada umumnya” merangkum halaman publik pengunduh Google Flow lain di Chrome Web Store, November 2026."
  },
  features: {
    title: "Unduh massal video Veo dan gambar Nano Banana dalam 4K",
    items: [
      { icon: "video", title: "Video dan gambar", text: "Video GIF, 720p, 1080p, atau 4K dan gambar 1K, 2K, atau 4K — 4K jika paket Anda mengizinkan." },
      { icon: "sliders", title: "Hanya yang ada di paket Anda", text: "Ekstensi membaca menu Download milik Flow terlebih dahulu dan hanya menampilkan kualitas yang benar-benar bisa Anda dapatkan. Jika ada yang memakai kredit, Anda melihat perkiraannya dan menyetujuinya dulu." },
      { icon: "pick", title: "Pilih atau ambil semua", text: "Centang item yang Anda inginkan, jangan centang apa pun untuk mengambil seluruh proyek, atau pilih semua kecuali yang sudah Anda unduh." },
      { icon: "layers", title: "Beberapa proyek sekaligus", text: "Mulai dari halaman utama Flow; setiap proyek masuk ke subfoldernya sendiri." },
      { icon: "folder", title: "Folder mana pun, nama rapi", text: "Simpan di mana saja — bahkan folder baru — sebagai “01 - Judul.mp4”, “02 - …”. Tidak ada yang pernah ditimpa." },
      { icon: "inbox", title: "Unduhan lain tidak disentuh", text: "Hanya file dari proyek Anda yang ditangani. Semua unduhan lain tetap dengan nama dan foldernya sendiri." },
      { icon: "grid", title: "Status di setiap ubin", text: "Kuning = mengunduh, hijau = selesai, merah = dilewati. Progres langsung untuk setiap proyek." },
      { icon: "retry", title: "Tidak ada yang terlewat diam-diam", text: "Apa pun yang dilaporkan error oleh Flow atau terlalu lama dicantumkan di akhir dengan tombol “Coba lagi” sekali klik." }
    ]
  },
  gallery: {
    title: "Lihat cara kerjanya",
    shots: {
      "shot-downloading.png": ["Proyek yang sedang diunduh, dengan ubin hijau, kuning, merah, dan antre", "Setiap ubin menunjukkan statusnya: terunduh, mengunduh, dilewati, atau antre."],
      "shot-several-projects.png": ["Layar kunci yang menunjukkan 2 dari 5 proyek selesai dan daftar per proyek", "Beberapa proyek dalam satu kali jalan, masing-masing ke subfoldernya sendiri."],
      "shot-credits.png": ["Dialog kualitas dengan 4K dipilih, perkiraan kredit, dan kotak persetujuan", "4K memakai kredit: Anda melihat perkiraannya dan menyetujuinya sebelum mulai."],
      "shot-retry.png": ["Dialog yang mencantumkan satu item gagal dan satu item yang kehabisan waktu, dengan tombol Coba lagi", "Apa pun yang gagal atau kehabisan waktu dicantumkan, dengan coba lagi sekali klik."]
    }
  },
  guide: {
    title: "Panduan: unduh massal dari Google Flow",
    toc: "Di halaman ini",
    sections: [
      {
        id: "install",
        title: "Pasang",
        blocks: [
          {
            ol: [
              "Buka [Flow Bulk Downloader di Chrome Web Store]($store) lalu klik **Tambahkan ke Chrome**.",
              "Klik ikon kepingan puzzle di toolbar Chrome dan **sematkan** Flow Bulk Downloader agar selalu tersedia dengan sekali klik."
            ]
          }
        ]
      },
      {
        id: "download-project",
        title: "Unduh sebuah proyek",
        blocks: [
          {
            ol: [
              "Buka proyek Anda di Google Flow dan biarkan tab tersebut tetap di depan.",
              "Klik ikon ekstensi → **Unduh** (atau tekan [[Alt]]+[[Shift]]+[[D]]).",
              "Pilih kualitas untuk video dan gambar. Hanya kualitas yang tersedia di paket Anda yang ditampilkan; yang tidak tersedia disebutkan di bawahnya.",
              "Pilih tempat menyimpan: **Pilih folder…** (folder mana pun, atau klik **Folder baru**), **Folder yang sama seperti terakhir**, atau **Pakai folder Unduhan saja**. Chrome mungkin meminta izin sekali agar halaman bisa mengedit folder itu — klik **Allow / Edit files**.",
              "Duduk santai. Item diunduh satu per satu; setiap peningkatan resolusi bisa memakan waktu beberapa menit."
            ]
          }
        ]
      },
      {
        id: "pick",
        title: "Pilih item tertentu",
        blocks: [
          {
            p: "Centang **Pilih video & gambar** di popup. Kotak centang muncul di setiap ubin yang sudah selesai — centang yang Anda inginkan, lalu tekan Unduh. **Pilih semua** dan **Hapus pilihan** ada di popup. Jika tidak ada yang dicentang, semuanya diunduh. Hasil generate yang gagal tidak pernah mendapat kotak centang. **Pilih semua kecuali yang sudah diunduh** mencentang semua yang belum Anda unduh dari proyek ini, jadi Anda hanya mengambil yang baru."
          }
        ]
      },
      {
        id: "several-projects",
        title: "Beberapa proyek sekaligus",
        blocks: [
          {
            ol: [
              "Buka halaman utama Flow (daftar proyek Anda).",
              "Opsional: centang **Pilih proyek** di popup dan centang proyek yang Anda inginkan (tidak ada yang dicentang = semua proyek).",
              "Tekan Unduh. Ekstensi mengintip proyek-proyek dulu untuk melihat jenis dan kualitas yang ada, lalu menanyakan kualitas dan folder sekali saja.",
              "Ekstensi membuka setiap proyek sendiri dan menyimpannya ke subfolder bernama sesuai proyek, misalnya `Folder saya/Video perjalanan/01 - Taj Mahal saat fajar.mp4`."
            ]
          }
        ]
      },
      {
        id: "quality",
        title: "Pilihan kualitas: 4K, 1080p, GIF, 2K",
        blocks: [
          {
            table: {
              head: ["Jenis", "Kualitas"],
              rows: [
                ["Video (Veo)", "GIF (270p) · 720p (asli) · 1080p (ditingkatkan) · 4K (ditingkatkan)"],
                ["Gambar (Nano Banana)", "1K (asli) · 2K (ditingkatkan) · 4K (ditingkatkan)"]
              ]
            }
          },
          {
            p: "Pilihan terakhir Anda diingat. Jika tidak tersedia di paket Anda, yang paling mendekati akan dipilih dan dialog memberitahukannya. **Lewati** hanya muncul jika satu batch berisi video dan gambar, dan tidak pernah diingat."
          }
        ]
      },
      {
        id: "credits",
        title: "Kredit Flow: tidak ada yang dipakai tanpa bertanya",
        blocks: [
          {
            ul: [
              "Jika kualitas yang Anda pilih memakai kredit Flow (4K memakai sekitar 50 per video menurut harga resmi Google, atau harga yang ditampilkan Flow di menunya), dialog menampilkan perkiraan untuk seluruh batch. Tidak ada yang dimulai sampai Anda mencentang **Saya setuju memakai…**.",
              "Selama proses, saat Flow meminta konfirmasi harga, ekstensi hanya mengonfirmasi yang sudah Anda setujui: jenis yang sama, harga sama atau lebih rendah, dan masih dalam total.",
              "Selain itu, proses dijeda dan Anda ditanya: izinkan untuk sisanya, lewati item ini, atau hentikan.",
              "Tidak pernah mengklik Upgrade atau Beli, dan berhenti saat Flow mengatakan kredit Anda habis."
            ]
          }
        ]
      },
      {
        id: "files",
        title: "Ke mana file disimpan",
        blocks: [
          {
            ul: [
              "**Folder pilihan:** file diberi nama `01 - Judul.mp4`, `02 - Judul.png`… Jika nama sudah dipakai, file baru mendapat `(2)`, `(3)` — file yang sudah ada tidak pernah diganti.",
              "**Folder Unduhan:** file tetap memakai nama dari Flow. Dengan beberapa proyek, masing-masing masuk ke subfoldernya sendiri di dalam Unduhan.",
              "Jika file tidak bisa ditulis ke folder pilihan Anda, file disimpan ke Unduhan, dan pesan terakhir memberi tahu berapa banyak yang begitu."
            ]
          }
        ]
      },
      {
        id: "while-running",
        title: "Saat berjalan",
        blocks: [
          {
            ul: [
              "Setiap ubin menunjukkan statusnya: {y|kuning} mengunduh (dengan pengatur waktu), {g|hijau} terunduh, {r|merah} dilewati, dan label kecil {q|ANTRE} untuk yang menunggu.",
              "Sebuah panel menutupi halaman dengan progres dan tombol **Hentikan unduhan**. Klik dan ketikan di halaman diblokir agar tidak ada yang mengganggu proses.",
              "Judul tab menampilkan progres, dan menutup atau memuat ulang tab akan meminta konfirmasi dulu.",
              "Pindah ke tab lain dan proses berhenti sejenak; kembali dan proses berlanjut. Item yang terputus dicoba lagi, tidak dilewati.",
              "Jika proyek diubah secara manual, proses berhenti dengan rapi alih-alih mengunduh item yang salah.",
              "Setelah selesai, kotak ringkasan menunjukkan apa yang diunduh dan dilewati. **Bersihkan** menghapus bingkai berwarna dan kotak centang."
            ]
          }
        ]
      },
      {
        id: "timeouts",
        title: "Error, batas waktu, dan coba lagi",
        blocks: [
          {
            p: "Jika Flow menampilkan error setelah diklik (misalnya peningkatan gagal), item dicoba sekali lagi beberapa detik kemudian; jika gagal lagi, item langsung dilewati alih-alih menunggu. Jika Flow tidak memulai unduhan sebuah item dalam **waktu tunggu maksimum** (default 10 menit), item itu juga dilewati. Di akhir Anda mendapat daftar semua item yang tidak terunduh — dengan nomor, jenis, proyek, dan judulnya — serta tombol **Coba lagi**. File yang dicoba lagi tetap memakai nomor aslinya, misalnya `02 - …`. Jika Flow tetap menyelesaikan salah satunya belakangan, Chrome menyimpannya di folder Unduhan seperti biasa."
          }
        ]
      },
      {
        id: "same-title",
        title: "Item dengan judul yang sama",
        blocks: [
          {
            p: "Flow sering memberi judul yang sama untuk beberapa hasil dari satu prompt. Dialog memberi tahu Anda saat itu terjadi. Setiap file tetap mendapat nomornya sendiri, jadi tidak ada yang ditimpa. Jika Flow mengubah urutan ubin tersebut saat proses berjalan, pesan terakhir menyebutkan judul yang perlu diperiksa — cari ubin tanpa bingkai hijau."
          }
        ]
      },
      {
        id: "settings",
        title: "Pengaturan dan pintasan",
        blocks: [
          {
            ul: [
              "**Waktu tunggu maks. per item:** berapa lama menunggu Flow memulai unduhan (menit). Peningkatan ke 4K lebih lama — naikkan jika sering kehabisan waktu.",
              "**Jeda antar item:** jeda singkat setelah setiap unduhan (detik).",
              "**Pintasan:** [[Alt]]+[[Shift]]+[[D]] memulai atau menghentikan proses. Ubah di `chrome://extensions/shortcuts`."
            ]
          }
        ]
      },
      {
        id: "troubleshooting",
        title: "Pemecahan masalah",
        blocks: [
          {
            ul: [
              "**“Tidak ada video atau gambar”** — buka proyek Flow yang memiliki item yang sudah selesai (atau halaman utama Flow untuk beberapa proyek).",
              "**Item kehabisan waktu** — biarkan tab Flow tetap di depan, dan naikkan **Waktu tunggu maks. per item** untuk 4K.",
              "**“Download beberapa file?”** — ekstensi mengizinkan unduhan otomatis untuk Flow, jadi ini seharusnya tidak muncul. Jika muncul, klik **Izinkan**.",
              "**Folder pilihan tidak berfungsi** — pilih folder lagi dan klik **Allow / Edit files** saat Chrome bertanya. Beberapa folder sistem tidak bisa dipakai; pilih folder di dalam folder pengguna Anda.",
              "**Masih bermasalah?** Tekan [[F12]] → Console, cari baris yang diawali `[Flow Bulk Downloader]`, lalu [kirim email kepada kami]($email) berisi apa yang Anda lihat."
            ]
          }
        ]
      }
    ]
  },
  faq: {
    title: "Tanya jawab",
    items: [
      ["Apakah gratis?", "Ya. Semuanya gratis, tanpa akun dan tanpa batas harian."],
      [
        "Apakah memakai kredit Flow saya?",
        "Hanya jika Anda menyetujuinya. Jika suatu kualitas memakai kredit (seperti 4K), dialog menampilkan perkiraan sebelum mulai, dan unduhan baru berjalan setelah Anda mencentang “Saya setuju memakai…”. Jika Flow meminta lebih dari yang disetujui, atau menanyakan hal yang tidak terduga, proses dijeda dan Anda ditanya."
      ],
      ["Apakah unduhan saya yang lain disentuh?", "Tidak. Ekstensi hanya menangani file yang dimulai Flow tepat setelah ekstensi mengklik Download pada salah satu item Anda. Semua unduhan lain tetap dengan nama dan foldernya sendiri, bahkan saat batch sedang berjalan."],
      ["Apakah file yang sudah ada akan ditimpa?", "Tidak pernah. Jika nama file sudah dipakai, file baru mendapat (2), (3), dan seterusnya."],
      ["Apakah ekstensi mengklik tombol “Upgrade” Flow?", "Tidak pernah. Kualitas yang tidak termasuk dalam paket Anda memang tidak ditawarkan."],
      ["Apakah bisa dipakai bersama ekstensi Flow lain?", "Ya. Ekstensi mengabaikan unduhan yang dimulai ekstensi lain dan hanya menyesuaikan nama file saat salah satu prosesnya sendiri membutuhkan subfolder."],
      ["Browser apa saja yang didukung?", "Google Chrome di desktop (Windows, Mac, Linux, ChromeOS). Browser Chromium lain mungkin berfungsi tetapi belum diuji."],
      ["Tersedia dalam bahasa apa saja?", "Ekstensi mengikuti bahasa Chrome Anda: Bahasa Indonesia, Inggris, Spanyol, Portugis (Brasil), Vietnam, dan Hindi; bahasa lain memakai bahasa Inggris. Ekstensi berfungsi dengan Flow dalam bahasa apa pun."],
      ["Apakah dibuat oleh Google?", "Tidak. Flow Bulk Downloader adalah alat independen dari Web Whizz dan tidak berafiliasi dengan Google."]
    ]
  },
  changelog: {
    title: "Catatan perubahan",
    entries: {
      "2.6.1": [
        "Bertanya sebelum memakai kredit Flow: menampilkan perkiraan untuk 4K dan kualitas berbayar lainnya, dan dijeda jika Flow meminta lebih.",
        "Tombol baru “Pilih semua kecuali yang sudah diunduh”: ambil hanya yang baru sejak kunjungan terakhir.",
        "Saat Flow mengatakan peningkatan gagal, item dicoba sekali lagi lalu langsung dilewati, tanpa menunggu batas waktu.",
        "Berfungsi dengan Flow dalam bahasa apa pun.",
        "Ekstensi kini tersedia dalam Bahasa Indonesia, Inggris, Spanyol, Portugis (Brasil), Vietnam, dan Hindi.",
        "Tidak lagi mengubah halaman Flow, jadi peringatan “ekstensi yang mengubah halaman” dari Flow tidak muncul lagi.",
        "“Bersihkan” setelah proses kini menghapus semua tanda dan kotak centang."
      ],
      "2.6.0": [
        "Unduhan Anda yang lain tidak pernah disentuh — hanya file dari proyek Flow Anda yang ditangani.",
        "Item yang kehabisan waktu dicantumkan dengan namanya di akhir, dengan “Coba lagi” sekali klik.",
        "Tidak pernah menimpa file: salinan kedua mendapat (2), (3)…",
        "Memberi tahu Anda saat beberapa item memiliki judul yang sama.",
        "Nama file yang aman di Windows.",
        "Status ubin lebih cepat pada proyek besar.",
        "Diperbaiki: memulai proses dua kali, dan dialog multi-proyek yang macet."
      ]
    }
  },
  privacy: {
    title: "Privasi",
    text: "Flow Bulk Downloader tidak mengumpulkan apa pun: tanpa server, tanpa akun, tanpa analitik, tanpa pelacakan. Pengaturan Anda dan daftar item yang sudah diunduh tetap di Chrome di komputer Anda, dan file Anda langsung dari Google Flow ke komputer Anda. [Baca kebijakan privasi lengkap]($privacy) (dalam bahasa Inggris)."
  },
  waitlist: {
    title: "Flow Bulk Downloader Pro segera hadir",
    text: "Tinggalkan email Anda dan kami akan memberi tahu saat Pro diluncurkan.",
    label: "Alamat email",
    placeholder: "anda@contoh.com",
    button: "Gabung daftar tunggu",
    sending: "Mengirim…",
    ok: "Anda sudah masuk daftar. Kami akan mengirim email saat Pro diluncurkan.",
    error: "Gagal. Silakan coba lagi, atau kirim email kepada kami.",
    fine: "Satu email saat Pro diluncurkan. Tanpa spam, tidak pernah dibagikan.",
    contact: "Pertanyaan, bug, atau ide?",
    email: "Kirim email"
  }
};
