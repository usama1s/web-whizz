// Portuguese (Brazil). Translation of en.js — keep the same shape.
// Button names inside the extension stay in English, because the extension itself is in English.
export default {
  meta: {
    title: "Baixe em massa vídeos e imagens do Google Flow — Veo, Nano Banana, 4K | Flow Bulk Downloader",
    description:
      "Extensão gratuita para Chrome que baixa em massa todos os vídeos Veo e imagens Nano Banana do Google Flow em 4K, 1080p, GIF ou 2K — em qualquer pasta. Sem conta, nunca sobrescreve, nunca perde um arquivo."
  },
  ui: {
    skip: "Pular para o conteúdo",
    navProducts: "Produtos",
    navFlow: "Flow Downloader",
    navContact: "Contato",
    footerTagline: "Ferramentas online que economizam horas.",
    footerProducts: "Produtos",
    footerHelp: "Ajuda",
    footerGuide: "Guia do Flow Downloader",
    footerPrivacy: "Política de privacidade",
    footerContact: "Contato",
    legal: "Google Flow, Veo e Nano Banana são marcas registradas da Google LLC. A Web Whizz é independente e não tem afiliação com o Google.",
    language: "Idioma"
  },
  hero: {
    eyebrow: "Extensão do Chrome para o Google Flow",
    title: "Baixe em massa vídeos e imagens do Google Flow — sem perder nenhum arquivo",
    lead: "Baixe em massa todos os vídeos Veo e imagens Nano Banana dos seus projetos do Google Flow — em 4K, 1080p, GIF ou 2K — na pasta que você escolher. Tudo o que não puder ser salvo é informado pelo nome, nunca ignorado em silêncio.",
    store: "Usar no Chrome — é grátis",
    soon: "Em breve na Chrome Web Store",
    guide: "Ler o guia",
    ratingOne: "{n} avaliação",
    ratingMany: "{n} avaliações",
    usersOne: "{n} usuário",
    usersMany: "{n} usuários",
    trust: "Sem conta · Sem rastreamento"
  },
  demo: {
    alt: "Demonstração animada: dois projetos do Flow são baixados um após o outro; cada bloco fica amarelo enquanto baixa e verde quando é salvo.",
    projects: ["Vídeo de viagem", "Fotos de produto"],
    queued: "NA FILA",
    status: "Projeto {p} de {n} · {name}",
    progress: "{done} de {total} arquivos salvos",
    done: "Todos os {total} arquivos salvos · 0 perdidos",
    legendYellow: "baixando",
    legendGreen: "salvo"
  },
  compare: {
    title: "Por que ele nunca perde um arquivo",
    lead: "A maioria dos downloaders do Flow pega o que consegue e deixa você descobrir o que faltou. O Flow Bulk Downloader diz exatamente o que aconteceu com cada item.",
    us: "Flow Bulk Downloader",
    them: "Alternativas comuns",
    rows: [
      ["Conta ou login", "Nenhum — instale e use", "Muitas vezes obrigatório"],
      ["Arquivos existentes", "Nunca sobrescritos — uma segunda cópia ganha (2), (3)…", "Arquivos com o mesmo nome podem se sobrepor"],
      ["Itens com falha ou lentos", "Listados pelo nome, com “Tentar de novo” em um clique", "Geralmente em silêncio, ou só um número"],
      ["Onde os arquivos vão", "Qualquer pasta, uma subpasta por projeto", "Muitas vezes só a pasta Downloads"],
      ["Limites diários", "Nenhum", "Versões grátis costumam ter limite"],
      ["Seus dados", "Nada é coletado — sem servidores", "Algumas coletam dados pessoais ou de login"]
    ],
    note: "“Alternativas comuns” resume as páginas públicas de outros downloaders do Google Flow na Chrome Web Store, novembro de 2026."
  },
  features: {
    title: "Baixe em massa vídeos Veo e imagens Nano Banana em 4K",
    items: [
      { icon: "video", title: "Vídeos e imagens", text: "Vídeos em GIF, 720p, 1080p ou 4K e imagens em 1K, 2K ou 4K — 4K quando o seu plano permite." },
      { icon: "sliders", title: "Só o que o seu plano oferece", text: "Ele lê primeiro o próprio menu Download do Flow e lista só as qualidades que você realmente pode obter. Se uma custar créditos, você vê a estimativa e aprova antes." },
      { icon: "pick", title: "Escolha ou leve tudo", text: "Marque exatamente os itens que quiser, não marque nada para levar o projeto inteiro, ou selecione tudo exceto o que você já baixou." },
      { icon: "layers", title: "Vários projetos de uma vez", text: "Comece pela página inicial do Flow; cada projeto vai para a sua própria subpasta." },
      { icon: "folder", title: "Qualquer pasta, nomes limpos", text: "Salve em qualquer lugar — até numa pasta nova — como “01 - Título.mp4”, “02 - …”. Nada é sobrescrito." },
      { icon: "inbox", title: "Não mexe nos outros downloads", text: "Só os arquivos do seu projeto são tratados. Todo o resto que você baixa mantém o próprio nome e pasta." },
      { icon: "grid", title: "Status em cada bloco", text: "Amarelo = baixando, verde = pronto, vermelho = pulado. Progresso ao vivo de cada projeto." },
      { icon: "retry", title: "Nada se perde em silêncio", text: "Tudo o que o Flow marcou com erro ou que demorou demais é listado no fim, com “Tentar de novo” em um clique." }
    ]
  },
  gallery: {
    title: "Veja em ação",
    shots: {
      "shot-downloading.png": ["Um projeto sendo baixado, com blocos verdes, amarelos, vermelhos e na fila", "Cada bloco mostra onde está: baixado, baixando, pulado ou na fila."],
      "shot-several-projects.png": ["Tela de bloqueio mostrando 2 de 5 projetos concluídos e uma lista por projeto", "Vários projetos numa só execução, cada um na sua subpasta."],
      "shot-credits.png": ["Janela de qualidade com 4K escolhido, a estimativa de créditos e uma caixa de aprovação", "4K custa créditos: você vê a estimativa e aprova antes de começar."],
      "shot-retry.png": ["Janela listando um item com falha e outro que expirou, com o botão Tentar de novo", "Tudo o que falhou ou expirou é listado, com nova tentativa em um clique."]
    }
  },
  guide: {
    title: "Guia: como baixar em massa do Google Flow",
    toc: "Nesta página",
    sections: [
      {
        id: "install",
        title: "Instalar",
        blocks: [
          {
            ol: [
              "Abra o [Flow Bulk Downloader na Chrome Web Store]($store) e clique em **Usar no Chrome**.",
              "Clique no ícone de peça de quebra-cabeça na barra do Chrome e **fixe** o Flow Bulk Downloader, para deixá-lo a um clique."
            ]
          }
        ]
      },
      {
        id: "download-project",
        title: "Baixar um projeto",
        blocks: [
          {
            ol: [
              "Abra o seu projeto no Google Flow e mantenha essa aba em primeiro plano.",
              "Clique no ícone da extensão → **Baixar** (ou pressione [[Alt]]+[[Shift]]+[[D]]).",
              "Escolha a qualidade dos vídeos e das imagens. Só aparecem as qualidades do seu plano; as indisponíveis são indicadas abaixo.",
              "Escolha onde salvar: **Escolher pasta…** (qualquer pasta, ou clique em **Nova pasta**), **Mesma pasta da última vez** ou **Usar a pasta Downloads**. O Chrome pode pedir uma vez para a página editar essa pasta — clique em **Allow / Edit files**.",
              "Relaxe. Os itens são baixados um de cada vez; cada ampliação pode levar alguns minutos."
            ]
          }
        ]
      },
      {
        id: "pick",
        title: "Escolher itens específicos",
        blocks: [
          {
            p: "Marque **Escolher vídeos e imagens** no pop-up. Uma caixa de seleção aparece em cada bloco concluído — marque os que quiser e pressione Baixar. **Selecionar tudo** e **Limpar** ficam no pop-up. Sem nada marcado, tudo é baixado. Gerações com falha nunca recebem caixa de seleção. **Selecionar tudo exceto os baixados** marca tudo o que você ainda não baixou deste projeto, para você levar só o que é novo."
          }
        ]
      },
      {
        id: "several-projects",
        title: "Vários projetos de uma vez",
        blocks: [
          {
            ol: [
              "Vá para a página inicial do Flow (a sua lista de projetos).",
              "Opcional: marque **Escolher projetos** no pop-up e marque os projetos que quiser (nenhum marcado = todos os projetos).",
              "Pressione Baixar. Ele dá uma olhada nos projetos para ver quais tipos e qualidades existem e depois pergunta qualidade e pasta uma única vez.",
              "Ele abre cada projeto sozinho e salva numa subpasta com o nome do projeto, por exemplo `Minha pasta/Vídeo de viagem/01 - Taj Mahal ao amanhecer.mp4`."
            ]
          }
        ]
      },
      {
        id: "quality",
        title: "Opções de qualidade: 4K, 1080p, GIF, 2K",
        blocks: [
          {
            table: {
              head: ["Tipo", "Qualidades"],
              rows: [
                ["Vídeos (Veo)", "GIF (270p) · 720p (original) · 1080p (ampliado) · 4K (ampliado)"],
                ["Imagens (Nano Banana)", "1K (original) · 2K (ampliado) · 4K (ampliado)"]
              ]
            }
          },
          {
            p: "A sua última escolha fica salva. Se ela não estiver disponível no seu plano, a mais próxima é escolhida e a janela avisa. **Ignorar** só aparece quando um lote tem vídeos e imagens, e nunca fica salvo."
          }
        ]
      },
      {
        id: "credits",
        title: "Créditos do Flow: nada é gasto sem perguntar",
        blocks: [
          {
            ul: [
              "Se uma qualidade escolhida custa créditos do Flow (4K usa cerca de 50 por vídeo pelo preço publicado pelo Google, ou o que o Flow mostrar no menu), a janela mostra uma estimativa para o lote inteiro. Nada começa até você marcar **Aprovo usar…**.",
              "Durante a execução, quando o Flow pede para confirmar um preço, a extensão confirma só o que você aprovou: mesmo tipo, preço igual ou menor e dentro do total.",
              "Qualquer outra coisa pausa a execução e pergunta a você: permitir no resto, ignorar este item ou parar.",
              "Nunca clica em Fazer upgrade nem em Comprar, e para quando o Flow diz que seus créditos acabaram."
            ]
          }
        ]
      },
      {
        id: "files",
        title: "Para onde vão os arquivos",
        blocks: [
          {
            ul: [
              "**Pasta escolhida:** os arquivos se chamam `01 - Título.mp4`, `02 - Título.png`… Se um nome já existir, o novo arquivo ganha `(2)`, `(3)` — um arquivo existente nunca é substituído.",
              "**Pasta Downloads:** os arquivos mantêm os nomes que o Flow dá. Com vários projetos, cada um vai para a sua subpasta dentro de Downloads.",
              "Se um arquivo não puder ser gravado na pasta escolhida, ele vai para Downloads, e a mensagem final diz quantos foram parar lá."
            ]
          }
        ]
      },
      {
        id: "while-running",
        title: "Durante a execução",
        blocks: [
          {
            ul: [
              "Cada bloco mostra o seu status: {y|amarelo} baixando (com um cronômetro), {g|verde} baixado, {r|vermelho} pulado e uma pequena etiqueta {q|NA FILA} para os que estão esperando.",
              "Um painel cobre a página com o progresso e um botão **Parar download**. Cliques e digitação na página ficam bloqueados para nada interromper a execução.",
              "O título da aba mostra o progresso, e fechar ou recarregar a aba pede confirmação.",
              "Mude para outra aba e ele pausa; volte e ele continua. Um item interrompido é tentado de novo, não pulado.",
              "Se o projeto for alterado manualmente, ele para de forma limpa em vez de baixar os itens errados.",
              "Ao terminar, uma caixa de resumo mostra o que foi baixado e o que foi pulado. **Limpar** remove as molduras coloridas e as caixas de seleção."
            ]
          }
        ]
      },
      {
        id: "timeouts",
        title: "Erros, tempo esgotado e nova tentativa",
        blocks: [
          {
            p: "Se o Flow mostrar um erro depois do clique (por exemplo, que a ampliação falhou), o item é tentado mais uma vez alguns segundos depois; se falhar de novo, é pulado na hora em vez de esperar. Se o Flow não começar o download de um item dentro da **espera máxima** (10 minutos por padrão), ele também é pulado. No fim você recebe uma lista de todos os itens que não foram baixados — com número, tipo, projeto e título — e um botão **Tentar de novo**. Um arquivo tentado de novo mantém o número original, por exemplo `02 - …`. Se o Flow terminar algum deles depois, o Chrome o salva na pasta Downloads, como de costume."
          }
        ]
      },
      {
        id: "same-title",
        title: "Itens com o mesmo título",
        blocks: [
          {
            p: "O Flow costuma dar o mesmo título a vários resultados de um mesmo prompt. A janela avisa quando isso acontece. Cada arquivo continua com o seu próprio número, então nada é sobrescrito. Se o Flow reordenar esses blocos durante a execução, a mensagem final indica o título a verificar — procure blocos sem moldura verde."
          }
        ]
      },
      {
        id: "settings",
        title: "Configurações e atalho",
        blocks: [
          {
            ul: [
              "**Espera máxima por item:** quanto tempo esperar o Flow iniciar um download (minutos). Ampliações em 4K demoram mais — aumente se estiverem expirando.",
              "**Pausa entre itens:** uma pequena pausa após cada download (segundos).",
              "**Atalho:** [[Alt]]+[[Shift]]+[[D]] inicia ou para uma execução. Altere em `chrome://extensions/shortcuts`."
            ]
          }
        ]
      },
      {
        id: "troubleshooting",
        title: "Solução de problemas",
        blocks: [
          {
            ul: [
              "**“Nenhum vídeo ou imagem encontrado”** — abra um projeto do Flow que tenha itens concluídos (ou a página inicial do Flow para vários projetos).",
              "**Itens expiram** — mantenha a aba do Flow em primeiro plano e aumente **Espera máxima por item** para 4K.",
              "**“Fazer download de vários arquivos?”** — a extensão permite downloads automáticos no Flow, então isso não deveria aparecer. Se aparecer, clique em **Permitir**.",
              "**A pasta escolhida não funciona** — escolha a pasta de novo e clique em **Allow / Edit files** quando o Chrome pedir. Algumas pastas do sistema não podem ser usadas; escolha uma dentro da sua pasta de usuário.",
              "**Ainda com problemas?** Pressione [[F12]] → Console, procure linhas que começam com `[Flow Bulk Downloader]` e [mande para nós por e-mail]($email) o que você vê."
            ]
          }
        ]
      }
    ]
  },
  faq: {
    title: "Perguntas frequentes",
    items: [
      ["É grátis?", "Sim. Tudo funciona de graça, sem conta e sem limite diário."],
      [
        "Ele usa os meus créditos do Flow?",
        "Só se você aprovar. Se uma qualidade custa créditos (como 4K), a janela mostra uma estimativa antes de começar, e o download só começa quando você marca “Aprovo usar…”. Se o Flow pedir mais do que o aprovado, ou perguntar algo inesperado, a execução pausa e pergunta a você."
      ],
      ["Ele mexe nos meus outros downloads?", "Não. Ele só trata o arquivo que o Flow inicia logo depois de clicar em Download num dos seus itens. Todo o resto que você baixa mantém o próprio nome e pasta, mesmo durante um lote."],
      ["Ele sobrescreve arquivos que eu já tenho?", "Nunca. Se um nome de arquivo já existir, o novo arquivo ganha (2), (3) e assim por diante."],
      ["Ele clica no botão “Upgrade” do Flow?", "Nunca. Qualidades que o seu plano não inclui simplesmente não são oferecidas."],
      ["Funciona junto com outras extensões do Flow?", "Sim. Ele ignora downloads iniciados por outras extensões e só ajusta nomes de arquivo quando uma execução dele precisa de subpastas."],
      ["Quais navegadores são compatíveis?", "Google Chrome no computador (Windows, Mac, Linux, ChromeOS). Outros navegadores Chromium podem funcionar, mas não foram testados."],
      ["Em quais idiomas ele está?", "A extensão segue o idioma do seu Chrome: português (Brasil), inglês, espanhol, vietnamita, indonésio e hindi; em qualquer outro idioma, inglês. Funciona com o Flow em qualquer idioma."],
      ["É feito pelo Google?", "Não. O Flow Bulk Downloader é uma ferramenta independente da Web Whizz e não tem afiliação com o Google."]
    ]
  },
  changelog: {
    title: "Histórico de versões",
    entries: {
      "2.6.1": [
        "Pergunta antes de gastar créditos do Flow: mostra uma estimativa para 4K e outras qualidades pagas, e pausa se o Flow pedir mais.",
        "Novo botão “Selecionar tudo exceto os baixados”: leve só o que é novo desde a última visita.",
        "Quando o Flow diz que uma ampliação falhou, o item é tentado mais uma vez e depois pulado na hora, sem esperar o tempo máximo.",
        "Funciona com o Flow em qualquer idioma.",
        "A extensão agora está em português (Brasil), inglês, espanhol, vietnamita, indonésio e hindi.",
        "Não altera mais a página do Flow, então o aviso de “extensões que modificam a página” não aparece mais.",
        "“Limpar” depois de uma execução remove todas as marcas e caixas."
      ],
      "2.6.0": [
        "Seus outros downloads nunca são tocados — só os arquivos do seu projeto do Flow são tratados.",
        "Itens que expiram são listados pelo nome no fim, com “Tentar de novo” em um clique.",
        "Nunca sobrescreve um arquivo: uma segunda cópia ganha (2), (3)…",
        "Avisa quando vários itens têm o mesmo título.",
        "Nomes de arquivo seguros no Windows.",
        "Status dos blocos mais rápido em projetos grandes.",
        "Corrigido: iniciar uma execução duas vezes e a janela de vários projetos travando."
      ]
    }
  },
  privacy: {
    title: "Privacidade",
    text: "O Flow Bulk Downloader não coleta nada: sem servidores, sem contas, sem análises, sem rastreamento. Suas configurações e a lista do que você já baixou ficam no Chrome, no seu computador, e seus arquivos vão direto do Google Flow para o seu computador. [Leia a política de privacidade completa]($privacy) (em inglês)."
  },
  waitlist: {
    title: "O Flow Bulk Downloader Pro está chegando",
    text: "Deixe o seu e-mail e avisaremos quando o Pro for lançado.",
    label: "Endereço de e-mail",
    placeholder: "voce@exemplo.com",
    button: "Entrar na lista de espera",
    sending: "Enviando…",
    ok: "Você está na lista. Vamos mandar um e-mail quando o Pro for lançado.",
    error: "Não deu certo. Tente de novo ou mande um e-mail para nós.",
    fine: "Um único e-mail quando o Pro for lançado. Sem spam, nunca compartilhado.",
    contact: "Dúvidas, bugs ou ideias?",
    email: "Mande um e-mail"
  }
};
