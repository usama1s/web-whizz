// Turkish. Translation of en.js — keep the same shape.
export default {
  meta: {
    title: "Google Flow Videolarını ve Görsellerini Toplu İndir — Veo, Nano Banana, 4K | Flow Bulk Downloader",
    description:
      "Google Flow'daki tüm Veo videolarını ve Nano Banana görsellerini 4K, 1080p, GIF veya 2K olarak istediğiniz klasöre toplu indiren ücretsiz Chrome eklentisi. Hesap yok, dosyaların üzerine yazmaz, hiçbir dosyayı kaybetmez."
  },
  ui: {
    skip: "İçeriğe geç",
    navProducts: "Ürünler",
    navFlow: "Flow Downloader",
    navContact: "İletişim",
    footerTagline: "Size saatler kazandıran çevrimiçi araçlar.",
    footerProducts: "Ürünler",
    footerHelp: "Yardım",
    footerGuide: "Flow Downloader kılavuzu",
    footerPrivacy: "Gizlilik politikası",
    footerContact: "İletişim",
    legal: "Google Flow, Veo ve Nano Banana, Google LLC'nin ticari markalarıdır. Web Whizz bağımsızdır ve Google ile bağlantılı değildir.",
    language: "Dil"
  },
  hero: {
    eyebrow: "Google Flow için Chrome eklentisi",
    title: "Hiçbir dosyayı kaybetmeyen indirici",
    lead: "Google Flow projelerinizdeki tüm Veo videolarını ve Nano Banana görsellerini 4K, 1080p, GIF veya 2K olarak, seçtiğiniz klasöre toplu indirin. Kaydedemediği her öğeyi adıyla bildirir; hiçbir şeyi sessizce atlamaz.",
    store: "Chrome'a ekle — ücretsiz",
    soon: "Yakında Chrome Web Mağazası'nda",
    guide: "Kılavuzu oku",
    ratingOne: "{n} değerlendirme",
    ratingMany: "{n} değerlendirme",
    usersOne: "{n} kullanıcı",
    usersMany: "{n} kullanıcı",
    trust: "Hesap yok · İzleme yok"
  },
  demo: {
    alt: "Animasyonlu demo: iki Flow projesi art arda indirilir; her kutucuk indirilirken sarıya, kaydedilince yeşile döner.",
    projects: ["Seyahat videosu", "Ürün çekimleri"],
    queued: "SIRADA",
    status: "Proje {p} / {n} · {name}",
    progress: "{total} dosyadan {done} tanesi kaydedildi",
    done: "{total} dosyanın tümü kaydedildi · 0 eksik",
    legendYellow: "indiriliyor",
    legendGreen: "kaydedildi"
  },
  compare: {
    title: "Neden hiçbir dosyayı kaybetmez",
    lead: "Çoğu Flow indiricisi alabildiğini alır ve eksikleri bulmayı size bırakır. Flow Bulk Downloader her öğeye tam olarak ne olduğunu söyler.",
    us: "Flow Bulk Downloader",
    them: "Tipik alternatifler",
    rows: [
      ["Hesap veya giriş", "Yok — kur ve kullan", "Çoğu zaman gerekli"],
      ["Mevcut dosyalar", "Asla üzerine yazılmaz — ikinci kopya (2), (3)… alır", "Aynı adlı dosyalar çakışabilir"],
      ["Başarısız veya yavaş öğeler", "Adıyla listelenir, tek tıkla “Tekrar dene”", "Genellikle sessiz ya da yalnızca bir sayı"],
      ["Dosyaların gittiği yer", "Herhangi bir klasör, her proje için ayrı alt klasör", "Çoğu zaman yalnızca İndirilenler klasörü"],
      ["Günlük sınır", "Yok", "Ücretsiz sürümler çoğu zaman sınırlı"],
      ["Verileriniz", "Hiçbir şey toplanmaz — sunucu yok", "Bazıları kişisel veya giriş verisi toplar"]
    ],
    note: "“Tipik alternatifler”, diğer Google Flow indiricilerinin Chrome Web Mağazası'ndaki herkese açık sayfalarının özetidir (Kasım 2026)."
  },
  features: {
    title: "Veo videolarını ve Nano Banana görsellerini 4K olarak toplu indirin",
    items: [
      { icon: "video", title: "Videolar ve görseller", text: "GIF, 720p, 1080p veya 4K videolar ve 1K, 2K veya 4K görseller — planınız izin veriyorsa 4K." },
      { icon: "sliders", title: "Yalnızca planınızdakiler", text: "Önce Flow'un kendi İndir menüsünü okur ve yalnızca gerçekten alabileceğiniz kaliteleri listeler." },
      { icon: "pick", title: "Seçin ya da hepsini alın", text: "Tam olarak istediğiniz öğeleri işaretleyin ya da hiçbirini işaretlemeyip tüm projeyi indirin." },
      { icon: "layers", title: "Aynı anda birden çok proje", text: "Flow'un ana sayfasından başlayın; her proje kendi alt klasörüne kaydedilir." },
      { icon: "folder", title: "Her klasör, temiz adlar", text: "İstediğiniz yere — yeni bir klasöre bile — “01 - Başlık.mp4”, “02 - …” olarak kaydedin. Hiçbir şeyin üzerine yazılmaz." },
      { icon: "inbox", title: "Diğer indirmelere dokunmaz", text: "Yalnızca projenizin dosyaları işlenir. İndirdiğiniz diğer her şey kendi adını ve klasörünü korur." },
      { icon: "grid", title: "Her kutucukta durum", text: "Sarı = indiriliyor, yeşil = tamam, kırmızı = atlandı. Her proje için canlı ilerleme." },
      { icon: "retry", title: "Hiçbir şey sessizce kaçmaz", text: "Çok uzun süren her öğe sonunda listelenir ve tek tıkla “Tekrar dene” sunulur." }
    ]
  },
  gallery: {
    title: "Nasıl çalıştığını görün",
    shots: {
      "shot-downloading.png": ["Yeşil, sarı, kırmızı ve sıradaki kutucuklarla indirilen bir proje", "Her kutucuk durumunu gösterir: indirildi, indiriliyor, atlandı veya sırada."],
      "shot-several-projects.png": ["5 projeden 2'sinin bittiğini ve proje listesini gösteren kilit ekranı", "Tek seferde birden çok proje, her biri kendi alt klasörüne."],
      "shot-quality-folder.png": ["Kalite ve klasör penceresi", "Yalnızca planınızdaki kaliteler; istediğiniz klasörü seçin."],
      "shot-retry.png": ["Zaman aşımına uğrayan bir öğeyi ve Tekrar dene düğmesini gösteren pencere", "Zaman aşımına uğrayan her şey listelenir, tek tıkla yeniden denenir."]
    }
  },
  guide: {
    title: "Kılavuz: Google Flow'dan toplu indirme",
    toc: "Bu sayfada",
    sections: [
      {
        id: "install",
        title: "Kurulum",
        blocks: [
          {
            ol: [
              "[Chrome Web Mağazası'nda Flow Bulk Downloader]($store) sayfasını açın ve **Chrome'a ekle**'ye tıklayın.",
              "Chrome araç çubuğundaki yapboz parçası simgesine tıklayın ve Flow Bulk Downloader'ı **sabitleyin**; böylece tek tıkla erişebilirsiniz."
            ]
          }
        ]
      },
      {
        id: "download-project",
        title: "Bir projeyi indirin",
        blocks: [
          {
            ol: [
              "Projenizi Google Flow'da açın ve o sekmeyi önde tutun.",
              "Eklenti simgesine tıklayın → **Download** (ya da [[Alt]]+[[Shift]]+[[D]] tuşlarına basın).",
              "Videolar ve görseller için kaliteyi seçin. Yalnızca planınızın sunduğu kaliteler listelenir; kullanılamayanlar altta adlarıyla belirtilir.",
              "Kaydedilecek yeri seçin: **Choose folder…** (herhangi bir klasör ya da **New folder**), **Same folder as last time** veya **Just use your Downloads folder**. Chrome bir kez sayfanın o klasörü düzenlemesine izin isteyebilir — **Allow / Edit files**'a tıklayın.",
              "Arkanıza yaslanın. Öğeler tek tek indirilir; büyütmeler her biri birkaç dakika sürebilir."
            ]
          }
        ]
      },
      {
        id: "pick",
        title: "Belirli öğeleri seçin",
        blocks: [
          {
            p: "Açılır pencerede **Pick videos & images** seçeneğini işaretleyin. Tamamlanmış her kutucukta bir onay kutusu belirir — istediklerinizi işaretleyin ve Download'a basın. **Select all** ve **Clear** açılır penceredededir. Hiçbir şey işaretli değilse her şey indirilir. Başarısız üretimlerde onay kutusu olmaz."
          }
        ]
      },
      {
        id: "several-projects",
        title: "Aynı anda birden çok proje",
        blocks: [
          {
            ol: [
              "Flow'un ana sayfasına (proje listenize) gidin.",
              "İsteğe bağlı: açılır pencerede **Pick projects** seçeneğini işaretleyin ve istediğiniz projeleri seçin (hiçbiri seçili değilse = tüm projeler).",
              "Download'a basın. Önce hangi türlerin ve kalitelerin olduğunu görmek için projelere göz atar, ardından kaliteyi ve klasörü bir kez sorar.",
              "Her projeyi kendisi açar ve proje adını taşıyan kendi alt klasörüne kaydeder, örneğin `Klasörüm/Seyahat videosu/01 - Şafakta Tac Mahal.mp4`."
            ]
          }
        ]
      },
      {
        id: "quality",
        title: "Kalite seçenekleri: 4K, 1080p, GIF, 2K",
        blocks: [
          {
            table: {
              head: ["Tür", "Kaliteler"],
              rows: [
                ["Videolar (Veo)", "GIF (270p) · 720p (orijinal) · 1080p (büyütülmüş) · 4K (büyütülmüş)"],
                ["Görseller (Nano Banana)", "1K (orijinal) · 2K (büyütülmüş) · 4K (büyütülmüş)"]
              ]
            }
          },
          {
            p: "Son seçiminiz hatırlanır. Planınızda yoksa en yakını seçilir ve pencere bunu belirtir. **Skip** yalnızca bir toplu indirmede hem video hem görsel olduğunda görünür ve asla hatırlanmaz."
          }
        ]
      },
      {
        id: "files",
        title: "Dosyalar nereye gider",
        blocks: [
          {
            ul: [
              "**Seçilen klasör:** dosyalar `01 - Başlık.mp4`, `02 - Başlık.png`… olarak adlandırılır. Bir ad alınmışsa yeni dosya `(2)`, `(3)` alır — mevcut bir dosya asla değiştirilmez.",
              "**İndirilenler klasörü:** dosyalar Flow'un verdiği adları korur. Birden çok projede her biri İndirilenler içinde kendi alt klasörüne gider.",
              "Bir dosya seçtiğiniz klasöre yazılamazsa İndirilenler'e kaydedilir ve son mesaj kaç tanesinin böyle olduğunu söyler."
            ]
          }
        ]
      },
      {
        id: "while-running",
        title: "Çalışırken",
        blocks: [
          {
            ul: [
              "Her kutucuk durumunu gösterir: {y|sarı} indiriliyor (sayaçla), {g|yeşil} indirildi, {r|kırmızı} atlandı ve bekleyenler için küçük bir {q|SIRADA} etiketi.",
              "Sayfayı ilerleme bilgisi ve **Stop downloading** düğmesi olan bir panel kaplar. Hiçbir şey işlemi bölmesin diye sayfadaki tıklamalar ve yazma engellenir.",
              "Sekme başlığı ilerlemeyi gösterir; sekmeyi kapatmak veya yenilemek önce onay ister.",
              "Başka bir sekmeye geçerseniz duraklar; geri döndüğünüzde devam eder. Yarıda kalan öğe atlanmaz, yeniden denenir.",
              "Proje elle değiştirilirse yanlış öğeleri indirmek yerine düzgünce durur.",
              "Bittiğinde bir özet kutusu neyin indirildiğini ve atlandığını gösterir. **Clear marks** renkli çerçeveleri kaldırır."
            ]
          }
        ]
      },
      {
        id: "timeouts",
        title: "Zaman aşımı ve yeniden deneme",
        blocks: [
          {
            p: "Flow bir öğenin indirmesini **maksimum bekleme** süresi (varsayılan 10 dakika) içinde başlatmazsa öğe atlanır ve işlem devam eder. Sonunda zaman aşımına uğrayan her öğenin — numarası, türü, projesi ve başlığıyla — bir listesini ve **Try again** düğmesini alırsınız. Yeniden denenen dosya orijinal numarasını korur, örneğin `02 - …`. Flow bunlardan birini sonradan yine de bitirirse Chrome onu her zamanki gibi İndirilenler klasörüne kaydeder."
          }
        ]
      },
      {
        id: "same-title",
        title: "Aynı başlığa sahip öğeler",
        blocks: [
          {
            p: "Flow çoğu zaman bir istemin birden çok çıktısına aynı başlığı verir. Bu olduğunda pencere size söyler. Her dosya yine de kendi numarasını alır, yani hiçbir şeyin üzerine yazılmaz. Flow çalışma sırasında bu kutucukların yerini değiştirirse son mesaj kontrol edilecek başlığı belirtir — yeşil çerçevesi olmayan kutucuklara bakın."
          }
        ]
      },
      {
        id: "settings",
        title: "Ayarlar ve kısayol",
        blocks: [
          {
            ul: [
              "**Max wait per item:** Flow'un bir indirmeyi başlatması için ne kadar bekleneceği (dakika). 4K büyütmeler daha uzun sürer — zaman aşımına uğrarlarsa artırın.",
              "**Pause between items:** her indirmeden sonra kısa bir ara (saniye).",
              "**Kısayol:** [[Alt]]+[[Shift]]+[[D]] bir işlemi başlatır veya durdurur. `chrome://extensions/shortcuts` adresinden değiştirebilirsiniz."
            ]
          }
        ]
      },
      {
        id: "troubleshooting",
        title: "Sorun giderme",
        blocks: [
          {
            ul: [
              "**“No videos or images found”** — tamamlanmış öğeleri olan bir Flow projesi açın (birden çok proje için Flow'un ana sayfasını).",
              "**Öğeler zaman aşımına uğruyor** — Flow sekmesini önde tutun ve 4K için **Max wait per item** değerini artırın.",
              "**“Birden fazla dosya indirilsin mi?”** — eklenti Flow için otomatik indirmelere izin verir, bu yüzden bu görünmemelidir. Görünürse **İzin ver**'e tıklayın.",
              "**Seçilen klasör çalışmıyor** — klasörü yeniden seçin ve Chrome sorduğunda **Allow / Edit files**'a tıklayın. Bazı sistem klasörleri kullanılamaz; kullanıcı klasörünüzün içinden bir klasör seçin.",
              "**Hâlâ takıldınız mı?** [[F12]] → Console'a basın, `[Flow Bulk Downloader]` ile başlayan satırları bulun ve gördüklerinizi [bize e-postayla gönderin]($email)."
            ]
          }
        ]
      }
    ]
  },
  faq: {
    title: "SSS",
    items: [
      ["Ücretsiz mi?", "Evet. Her şey ücretsiz çalışır; hesap ve günlük sınır yoktur."],
      [
        "Flow kredilerimi kullanır mı?",
        "Eklenti, Flow'un kendi İndir seçeneklerine sizin yerinize, tıpkı elle yapacağınız gibi tıklar. Bir kalitenin (örneğin 1080p veya 4K büyütme) kredi harcayıp harcamadığına Flow ve planınız karar verir; büyük bir toplu indirmeden önce bunu Flow'da kontrol edin."
      ],
      ["Diğer indirmelerime dokunur mu?", "Hayır. Yalnızca öğelerinizden birinde İndir'e tıkladıktan hemen sonra Flow'un başlattığı dosyayı işler. İndirdiğiniz diğer her şey, toplu indirme sürerken bile kendi adını ve klasörünü korur."],
      ["Mevcut dosyalarımın üzerine yazar mı?", "Asla. Bir dosya adı alınmışsa yeni dosya (2), (3) vb. alır."],
      ["Flow'un “Yükselt” düğmesine tıklar mı?", "Asla. Planınızda olmayan kaliteler hiç sunulmaz."],
      ["Diğer Flow eklentileriyle birlikte çalışır mı?", "Evet. Diğer eklentilerin başlattığı indirmeleri yok sayar ve dosya adlarını yalnızca kendi işlemlerinden biri alt klasöre ihtiyaç duyduğunda düzenler."],
      ["Hangi tarayıcılar destekleniyor?", "Masaüstünde Google Chrome (Windows, Mac, Linux, ChromeOS). Diğer Chromium tarayıcılarında çalışabilir ancak test edilmemiştir."],
      ["Google tarafından mı yapıldı?", "Hayır. Flow Bulk Downloader, Web Whizz'in bağımsız bir aracıdır ve Google ile bağlantılı değildir."]
    ]
  },
  changelog: {
    title: "Değişiklik günlüğü",
    entries: {
      "2.6.0": [
        "Diğer indirmelerinize asla dokunulmaz — yalnızca Flow projenizin dosyaları işlenir.",
        "Zaman aşımına uğrayan öğeler sonunda adlarıyla listelenir ve tek tıkla “Tekrar dene” sunulur.",
        "Hiçbir dosyanın üzerine yazmaz: ikinci kopya (2), (3)… alır.",
        "Birden çok öğe aynı başlığı taşıdığında sizi uyarır.",
        "Windows'ta güvenli dosya adları.",
        "Büyük projelerde daha hızlı kutucuk durumu.",
        "Düzeltildi: bir işlemin iki kez başlatılması ve çoklu proje penceresinin takılması."
      ]
    }
  },
  privacy: {
    title: "Gizlilik",
    text: "Flow Bulk Downloader hiçbir şey toplamaz: sunucu yok, hesap yok, analiz yok, izleme yok. Ayarlarınız Chrome'da kalır ve dosyalarınız doğrudan Google Flow'dan bilgisayarınıza gider. [Gizlilik politikasının tamamını okuyun]($privacy) (İngilizce)."
  },
  waitlist: {
    title: "Flow Bulk Downloader Pro geliyor",
    text: "İndirici ücretsiz kalacak. Pro, indirme geçmişi ve düzenleyiciye aktarma gibi ek özellikler getirecek. E-postanızı bırakın, çıktığında size haber verelim.",
    label: "E-posta adresi",
    placeholder: "siz@ornek.com",
    button: "Bekleme listesine katıl",
    sending: "Gönderiliyor…",
    ok: "Listedesiniz. Pro çıktığında size e-posta göndereceğiz.",
    error: "Olmadı. Lütfen tekrar deneyin ya da bize e-posta gönderin.",
    fine: "Pro çıktığında tek bir e-posta. Spam yok, asla paylaşılmaz.",
    contact: "Sorular, hatalar veya fikirler?",
    email: "Bize e-posta gönderin"
  }
};
