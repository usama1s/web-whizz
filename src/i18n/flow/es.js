// Spanish. Translation of en.js — keep the same shape.
// Button names inside the extension stay in English, because the extension itself is in English.
export default {
  meta: {
    title: "Descarga masiva de vídeos e imágenes de Google Flow — Veo, Nano Banana, 4K | Flow Bulk Downloader",
    description:
      "Extensión gratuita para Chrome que descarga de forma masiva todos los vídeos de Veo e imágenes de Nano Banana de Google Flow en 4K, 1080p, GIF o 2K, en cualquier carpeta. Sin cuenta, nunca sobrescribe, nunca pierde un archivo."
  },
  ui: {
    skip: "Ir al contenido",
    navProducts: "Productos",
    navFlow: "Flow Downloader",
    navContact: "Contacto",
    footerTagline: "Herramientas online que te ahorran horas.",
    footerProducts: "Productos",
    footerHelp: "Ayuda",
    footerGuide: "Guía de Flow Downloader",
    footerPrivacy: "Política de privacidad",
    footerContact: "Contacto",
    legal: "Google Flow, Veo y Nano Banana son marcas comerciales de Google LLC. Web Whizz es independiente y no está afiliada a Google.",
    language: "Idioma"
  },
  hero: {
    eyebrow: "Extensión de Chrome para Google Flow",
    title: "El descargador que nunca pierde un archivo",
    lead: "Descarga de forma masiva todos los vídeos de Veo y las imágenes de Nano Banana de tus proyectos de Google Flow, en 4K, 1080p, GIF o 2K, en la carpeta que elijas. Todo lo que no pueda guardar te lo indica por su nombre; nunca se omite en silencio.",
    store: "Añadir a Chrome — es gratis",
    soon: "Muy pronto en Chrome Web Store",
    guide: "Leer la guía",
    ratingOne: "{n} valoración",
    ratingMany: "{n} valoraciones",
    usersOne: "{n} usuario",
    usersMany: "{n} usuarios",
    trust: "Sin cuenta · Sin rastreo"
  },
  demo: {
    alt: "Demostración animada: dos proyectos de Flow se descargan uno tras otro; cada mosaico se vuelve amarillo mientras se descarga y verde cuando se guarda.",
    projects: ["Vídeo de viaje", "Fotos de producto"],
    queued: "EN COLA",
    status: "Proyecto {p} de {n} · {name}",
    progress: "{done} de {total} archivos guardados",
    done: "Los {total} archivos guardados · 0 perdidos",
    legendYellow: "descargando",
    legendGreen: "guardado"
  },
  compare: {
    title: "Por qué nunca pierde un archivo",
    lead: "La mayoría de los descargadores de Flow se llevan lo que pueden y te dejan a ti encontrar lo que falta. Flow Bulk Downloader te dice exactamente qué pasó con cada elemento.",
    us: "Flow Bulk Downloader",
    them: "Alternativas habituales",
    rows: [
      ["Cuenta o inicio de sesión", "Ninguno: instalar y listo", "A menudo obligatorio"],
      ["Archivos existentes", "Nunca se sobrescriben: una segunda copia recibe (2), (3)…", "Los archivos con el mismo nombre pueden chocar"],
      ["Elementos fallidos o lentos", "Se listan por nombre, con “Reintentar” en un clic", "Normalmente en silencio, o solo un número"],
      ["Dónde van los archivos", "Cualquier carpeta, una subcarpeta por proyecto", "A menudo solo la carpeta Descargas"],
      ["Límites diarios", "Ninguno", "Las versiones gratuitas suelen tener límite"],
      ["Tus datos", "No se recoge nada: sin servidores", "Algunas recogen datos personales o de inicio de sesión"]
    ],
    note: "“Alternativas habituales” resume las fichas públicas de otros descargadores de Google Flow en Chrome Web Store, noviembre de 2026."
  },
  features: {
    title: "Descarga masiva de vídeos de Veo e imágenes de Nano Banana en 4K",
    items: [
      { icon: "video", title: "Vídeos e imágenes", text: "Vídeos en GIF, 720p, 1080p o 4K e imágenes en 1K, 2K o 4K; 4K si tu plan lo permite." },
      { icon: "sliders", title: "Solo lo que ofrece tu plan", text: "Primero lee el propio menú de descarga de Flow y solo muestra las calidades que realmente puedes obtener." },
      { icon: "pick", title: "Elige o llévatelo todo", text: "Marca exactamente los elementos que quieras, o no marques nada para descargar el proyecto entero." },
      { icon: "layers", title: "Varios proyectos a la vez", text: "Empieza desde la página principal de Flow; cada proyecto va a su propia subcarpeta." },
      { icon: "folder", title: "Cualquier carpeta, nombres limpios", text: "Guarda donde quieras, incluso en una carpeta nueva, como “01 - Título.mp4”, “02 - …”. Nunca se sobrescribe nada." },
      { icon: "inbox", title: "No toca tus otras descargas", text: "Solo se gestionan los archivos de tu proyecto. Todo lo demás que descargues conserva su nombre y su carpeta." },
      { icon: "grid", title: "Estado en cada mosaico", text: "Amarillo = descargando, verde = listo, rojo = omitido. Progreso en directo de cada proyecto." },
      { icon: "retry", title: "Nada se pierde en silencio", text: "Todo lo que tardó demasiado aparece al final con un “Reintentar” de un clic." }
    ]
  },
  gallery: {
    title: "Míralo en acción",
    shots: {
      "shot-downloading.png": ["Un proyecto descargándose, con mosaicos verdes, amarillos, rojos y en cola", "Cada mosaico muestra en qué punto está: descargado, descargando, omitido o en cola."],
      "shot-several-projects.png": ["Pantalla de bloqueo con 2 de 5 proyectos terminados y una lista por proyecto", "Varios proyectos en una sola ejecución, cada uno en su subcarpeta."],
      "shot-quality-folder.png": ["Diálogo de calidad y carpeta", "Solo las calidades de tu plan; elige cualquier carpeta."],
      "shot-retry.png": ["Diálogo con un elemento que agotó el tiempo y el botón Reintentar", "Todo lo que agotó el tiempo aparece en la lista, con reintento en un clic."]
    }
  },
  guide: {
    title: "Guía: descarga masiva desde Google Flow",
    toc: "En esta página",
    sections: [
      {
        id: "install",
        title: "Instalar",
        blocks: [
          {
            ol: [
              "Abre [Flow Bulk Downloader en Chrome Web Store]($store) y haz clic en **Añadir a Chrome**.",
              "Haz clic en el icono de la pieza de puzle de la barra de Chrome y **fija** Flow Bulk Downloader para tenerlo a un clic."
            ]
          }
        ]
      },
      {
        id: "download-project",
        title: "Descargar un proyecto",
        blocks: [
          {
            ol: [
              "Abre tu proyecto en Google Flow y mantén esa pestaña delante.",
              "Haz clic en el icono de la extensión → **Download** (o pulsa [[Alt]]+[[Shift]]+[[D]]).",
              "Elige la calidad de los vídeos y de las imágenes. Solo aparecen las calidades que ofrece tu plan; las no disponibles se indican debajo.",
              "Elige dónde guardar: **Choose folder…** (cualquier carpeta, o haz clic en **New folder**), **Same folder as last time** o **Just use your Downloads folder**. Chrome puede pedir una vez permiso para que la página edite esa carpeta: haz clic en **Allow / Edit files**.",
              "Relájate. Los elementos se descargan de uno en uno; cada escalado puede tardar unos minutos."
            ]
          }
        ]
      },
      {
        id: "pick",
        title: "Elegir elementos concretos",
        blocks: [
          {
            p: "Marca **Pick videos & images** en la ventana emergente. Aparece una casilla en cada mosaico terminado: marca los que quieras y pulsa Download. **Select all** y **Clear** están en la ventana emergente. Si no marcas nada, se descarga todo. Las generaciones fallidas nunca tienen casilla."
          }
        ]
      },
      {
        id: "several-projects",
        title: "Varios proyectos a la vez",
        blocks: [
          {
            ol: [
              "Ve a la página principal de Flow (tu lista de proyectos).",
              "Opcional: marca **Pick projects** en la ventana emergente y marca los proyectos que quieras (ninguno marcado = todos los proyectos).",
              "Pulsa Download. Primero echa un vistazo a los proyectos para ver qué tipos y calidades hay y luego pregunta la calidad y la carpeta una sola vez.",
              "Abre cada proyecto por sí mismo y lo guarda en su propia subcarpeta con el nombre del proyecto, por ejemplo `Mi carpeta/Vídeo de viaje/01 - Taj Mahal al amanecer.mp4`."
            ]
          }
        ]
      },
      {
        id: "quality",
        title: "Opciones de calidad: 4K, 1080p, GIF, 2K",
        blocks: [
          {
            table: {
              head: ["Tipo", "Calidades"],
              rows: [
                ["Vídeos (Veo)", "GIF (270p) · 720p (original) · 1080p (escalado) · 4K (escalado)"],
                ["Imágenes (Nano Banana)", "1K (original) · 2K (escalado) · 4K (escalado)"]
              ]
            }
          },
          {
            p: "Se recuerda tu última elección. Si no está disponible en tu plan, se elige la más cercana y el diálogo lo indica. **Skip** solo aparece cuando un lote tiene vídeos e imágenes, y nunca se recuerda."
          }
        ]
      },
      {
        id: "files",
        title: "Dónde van los archivos",
        blocks: [
          {
            ul: [
              "**Carpeta elegida:** los archivos se llaman `01 - Título.mp4`, `02 - Título.png`… Si un nombre ya existe, el nuevo archivo recibe `(2)`, `(3)`; nunca se reemplaza un archivo existente.",
              "**Carpeta Descargas:** los archivos conservan el nombre que les da Flow. Con varios proyectos, cada uno va a su propia subcarpeta dentro de Descargas.",
              "Si un archivo no se puede escribir en la carpeta elegida, se guarda en Descargas y el mensaje final indica cuántos acabaron allí."
            ]
          }
        ]
      },
      {
        id: "while-running",
        title: "Mientras funciona",
        blocks: [
          {
            ul: [
              "Cada mosaico muestra su estado: {y|amarillo} descargando (con un temporizador), {g|verde} descargado, {r|rojo} omitido y una pequeña etiqueta {q|QUEUED} para los que esperan.",
              "Un panel cubre la página con el progreso y un botón **Stop downloading**. Los clics y la escritura en la página se bloquean para que nada interrumpa la ejecución.",
              "El título de la pestaña muestra el progreso, y cerrar o recargar la pestaña pide confirmación.",
              "Si cambias a otra pestaña, se pausa; al volver, continúa. Un elemento interrumpido se reintenta, no se omite.",
              "Si el proyecto se cambia a mano, se detiene limpiamente en lugar de descargar los elementos equivocados.",
              "Al terminar, un cuadro de resumen muestra lo descargado y lo omitido. **Clear marks** quita los marcos de color."
            ]
          }
        ]
      },
      {
        id: "timeouts",
        title: "Tiempos de espera y reintento",
        blocks: [
          {
            p: "Si Flow no inicia la descarga de un elemento dentro de la **espera máxima** (10 minutos por defecto), el elemento se omite y la ejecución continúa. Al final recibes una lista de todos los elementos que agotaron el tiempo, con su número, tipo, proyecto y título, y un botón **Try again**. Un archivo reintentado conserva su número original, por ejemplo `02 - …`. Si Flow termina alguno más tarde, Chrome lo guarda en la carpeta Descargas como siempre."
          }
        ]
      },
      {
        id: "same-title",
        title: "Elementos con el mismo título",
        blocks: [
          {
            p: "Flow suele dar el mismo título a varios resultados de un mismo prompt. El diálogo te avisa cuando ocurre. Cada archivo sigue teniendo su propio número, así que nada se sobrescribe. Si Flow reordena esos mosaicos durante la ejecución, el mensaje final indica el título que debes revisar: busca mosaicos sin marco verde."
          }
        ]
      },
      {
        id: "settings",
        title: "Ajustes y atajo",
        blocks: [
          {
            ul: [
              "**Max wait per item:** cuánto esperar a que Flow inicie una descarga (minutos). Los escalados a 4K tardan más: súbelo si agotan el tiempo.",
              "**Pause between items:** una breve pausa después de cada descarga (segundos).",
              "**Atajo:** [[Alt]]+[[Shift]]+[[D]] inicia o detiene una ejecución. Cámbialo en `chrome://extensions/shortcuts`."
            ]
          }
        ]
      },
      {
        id: "troubleshooting",
        title: "Solución de problemas",
        blocks: [
          {
            ul: [
              "**“No videos or images found”**: abre un proyecto de Flow con elementos terminados (o la página principal de Flow para varios proyectos).",
              "**Los elementos agotan el tiempo**: mantén la pestaña de Flow delante y sube **Max wait per item** para 4K.",
              "**“¿Descargar varios archivos?”**: la extensión permite las descargas automáticas en Flow, así que no debería aparecer. Si aparece, haz clic en **Permitir**.",
              "**La carpeta elegida no funciona**: vuelve a elegir la carpeta y haz clic en **Allow / Edit files** cuando Chrome lo pida. Algunas carpetas del sistema no se pueden usar; elige una dentro de tu carpeta de usuario.",
              "**¿Sigues atascado?** Pulsa [[F12]] → Console, busca las líneas que empiezan por `[Flow Bulk Downloader]` y [envíanos por correo]($email) lo que veas."
            ]
          }
        ]
      }
    ]
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      ["¿Es gratis?", "Sí. Todo funciona gratis, sin cuenta y sin límite diario."],
      [
        "¿Usa mis créditos de Flow?",
        "La extensión pulsa por ti las propias opciones de descarga de Flow, igual que harías a mano. Si una calidad (por ejemplo, un escalado a 1080p o 4K) cuesta créditos lo deciden Flow y tu plan, así que compruébalo en Flow antes de descargar un lote grande."
      ],
      ["¿Toca mis otras descargas?", "No. Solo gestiona el archivo que Flow inicia justo después de pulsar Descargar en uno de tus elementos. Todo lo demás que descargues conserva su nombre y su carpeta, incluso durante un lote."],
      ["¿Sobrescribe archivos que ya tengo?", "Nunca. Si un nombre de archivo ya existe, el nuevo archivo recibe (2), (3), etc."],
      ["¿Pulsa el botón “Mejorar plan” de Flow?", "Nunca. Las calidades que tu plan no incluye simplemente no se ofrecen."],
      ["¿Funciona junto con otras extensiones de Flow?", "Sí. Ignora las descargas iniciadas por otras extensiones y solo ajusta los nombres de archivo cuando una de sus propias ejecuciones necesita subcarpetas."],
      ["¿Qué navegadores son compatibles?", "Google Chrome en ordenador (Windows, Mac, Linux, ChromeOS). Otros navegadores Chromium pueden funcionar, pero no se han probado."],
      ["¿Lo ha hecho Google?", "No. Flow Bulk Downloader es una herramienta independiente de Web Whizz y no está afiliada a Google."]
    ]
  },
  changelog: {
    title: "Registro de cambios",
    entries: {
      "2.6.0": [
        "Tus otras descargas nunca se tocan: solo se gestionan los archivos de tu proyecto de Flow.",
        "Los elementos que agotan el tiempo se listan por nombre al final, con “Reintentar” en un clic.",
        "Nunca sobrescribe un archivo: una segunda copia recibe (2), (3)…",
        "Te avisa cuando varios elementos tienen el mismo título.",
        "Nombres de archivo seguros en Windows.",
        "Estado de los mosaicos más rápido en proyectos grandes.",
        "Corregido: iniciar una ejecución dos veces y que el diálogo de varios proyectos se quedara bloqueado."
      ]
    }
  },
  privacy: {
    title: "Privacidad",
    text: "Flow Bulk Downloader no recoge nada: sin servidores, sin cuentas, sin analítica, sin rastreo. Tus ajustes se quedan en Chrome y tus archivos van directamente de Google Flow a tu ordenador. [Lee la política de privacidad completa]($privacy) (en inglés)."
  },
  waitlist: {
    title: "Flow Bulk Downloader Pro está en camino",
    text: "Déjanos tu correo y te avisaremos cuando se lance Pro.",
    label: "Correo electrónico",
    placeholder: "tu@ejemplo.com",
    button: "Unirme a la lista de espera",
    sending: "Enviando…",
    ok: "Ya estás en la lista. Te escribiremos cuando se lance Pro.",
    error: "No ha funcionado. Inténtalo de nuevo o escríbenos.",
    fine: "Un solo correo cuando se lance Pro. Sin spam, nunca compartido.",
    contact: "¿Preguntas, errores o ideas?",
    email: "Escríbenos"
  }
};
