export default {
  app: {
    productName: 'Digitální Repozitář',
    description: 'Digitální Repozitář vědeckých publikací a datasetů',
    copyrightNotice: 'Tato služba je součástí e-infrastruktury CESNET',
    copyright: '©  2021 CESNET z.s.p.o.  Zikova 4, 160 00 Praha 6'
  },
  icon: {
    delete_draft: 'delete_forever',
    revert_approval: 'assignment_return',
    make_public: 'public',
    make_private: 'public_off',
    request_approval: 'rule',
    request_changes: 'healing',
    approve: 'verified'
  },
  nav: {
    intro: '',
    admin: 'Administrace',
    detail: 'Detail'
  },
  hint: {
    localeSwitcher: 'Zadejte kód jazyka ve formátu ISO 639-2'
  },
  action: {
    addItem: 'Přidat položku',
    rmItem: 'Odebrat položku',
    addLang: "Přidat jazykovou variantu",
    rmLang: "Odebrat jazykovou variantu",
    choose: 'Vybrat',
    filterByCommunity: 'Procházet záznamy ve vybrané komunitě',
    sort: 'Seřadit výsledky',
    delete_draft: 'smazat rozpracovaný záznam',
    make_private: 'skrýt záznam',
    make_public: 'zveřejnit záznam',
    approve: 'schválit záznam',
    request_changes: 'vyžádat opravu záznamu',
    revert_approval: 'vrátit ke schválení',
    request_approval: 'odeslat záznam ke schválení',
    makeTransition: 'Změna stavu',
    attachArticle: 'Připojit článek',
    submitDataset: 'Nahrát dataset',
    retry: 'Zkusit znovu',
    close: 'Zavřít',
    addTitle: 'Přidat název',
    addAuthor: 'Přidat autora',
    removeAuthor: 'Odebrat autora',
    login: 'Přihlásit se',
    altLogin: 'Přejít na alternativní přihlášení',
    logout: 'Odhlásit se',
    openTOS: 'Pravidla využití',
    openPrivacyPolicy: 'Zpracování osobních údajů',
    accept: 'Souhlasím',
    decline: 'Nesouhlasím',
    upload: 'Nahrát',
    uploadDataset: 'Nahrát nový dataset',
    uploadArticle: 'Nahrát nový článek',
    scrollToTop: 'Zpět nahoru'
  },
  error: {
    stateChangeFail: 'Chyba při změně stavu',
    stateChangeMessage: 'Při změně stavu došlo k následující neočekávané chybě',
    popupLoginFail: 'Nebylo možno se přihlásit, prosím povolte v prohlížeči vyskakovací okna pro tento web',
    validationFail: 'Prosím opravte chyby a zkuste to znovu',
    validation: {
      required: 'Toto pole je vyžadováno',
      minLength: 'Toto pole musí obsahovat alespoň {min} znaků'
    }
  },
  accessibility: {},
  label: {
    forms: {
      basicInfo: 'Základní informace',
      identifiers: 'Identifikátory',
      identifiersCaption: 'Zadejte existující identifikátory spojené s tímto datasetem',
      authors: 'Autoři',
      uploadData: 'Upload dat',
      keywords: 'Klíčová slova',
      additionalTitles: 'Další názvy'
    },
    identifier: 'Identifikátor',
    chooseLocale: 'Vyberte prosím jazyk',
    scheme: 'Schema',
    pageSize: 'Počet na stránku',
    recordsFound: 'Nalezen {count} výsledek | Nalezeno {count} výsledků',
    goHome: 'Zpět na úvodní stránku',
    back: 'Zpět',
    continue: 'Dále',
    authors: 'Autoři',
    isPublic: 'Záznam je veřejný',
    isPendingApproval: 'Záznam čeká na schválení kurátorem',
    isEdited: 'Záznam je rozpracovaný',
    actionApprove: 'Odsouhlasení akce',
    addFiles: 'Nahrát přílohy',
    addIdentifier: 'Přidat identifikátor',
    abstract: 'Abstrakt',
    datasetBasicInfo: 'Základní informace',
    createdAt: 'Vytvořeno',
    createArticle: 'Vytvořit článek',
    titles: 'Název záznamu',
    identifiers: 'Identifikátory',
    language: 'Jazyk',
    skipDOI: 'Přeskočit import',
    importFromDOI: 'Importovat z DOI',
    articleMetadata: 'Metadata článku',
    enterArticleDOI: 'Zadejte DOI článku',
    identifierScheme: 'Schema',
    files: 'Soubory',
    filters: 'Filtry',
    noCommunitySelected: 'Nevybrána žádná komunita',
    community: 'Komunita',
    size: 'Velikost',
    license: 'Licence',
    searchInput: 'Hledat podle názvu',
    localeSwitcher: 'Jazyk',
    documentType: 'Typ dokumentu',
    datasets: 'Datasety',
    contact: 'Kontaktujte nás',
    privacy: 'Ochrana osobních údajů',
    docs: 'Uživatelská dokumentace',
    sort: {
      alphabetical: 'Abecedně'
    },
    role: {
      'system administrator': 'Administrátor',
      admin: 'admin',
      curator: 'kurátor',
      member: 'člen',
      publisher: 'editor'
    }
  },
  section: {
    articleExistsError: 'Nalezen existující článek',
    articleList: 'Články',
    datasetList: 'Datasety',
    datasetDetail: 'Detail datasetu',
    datasetUpload: 'Upload datasetu',
    loginRequired: 'Vyžadováno přihlášení',
    error: 'Chyba',
    gdpr: 'Souhlas s podmínkami',
    roles: 'Role'
  },
  message: {
    notFound: 'Stránka nenalezena',
    articleExistsError: 'Článek se zadaným DOI je již v repozitáři. Přejete si provázat dataset s tímto článkem?',
    creatingArticle: 'Vytvářím článek',
    errorCreatingArticle: 'Nepodařilo se vytvořit článek',
    loadingMetadata: 'Načítám metadata',
    copiedToClip: 'Zkopírováno do schránky',
    resolveDOIError: 'K zadanému DOI se nepodařilo získat metadata článku',
    noArticles: 'Žádné články nenalezeny',
    noDatasets: 'Žádné datasety nenalezeny',
    draftDeleted: 'Záznam byl smazán',
    completeSuccess: 'Úspěšně dokončeno',
    doYRlyWnt: 'Opravdu chcete',
    noData: 'Žádná data',
    loading: 'Načítám',
    loggedOut: 'Byli jste odhlášeni',
    recordNotValid: 'V záznamu jsou chyby',
    gdprPrompt: 'Kliknutím na "Souhlasím", vyjadřujete souhlas s našimi pravidly využití služeb a podmínkami zpracování osobních údajů.',
    authRequired: 'Tato stránka vyžaduje autentizaci. Kliknutím na tlačítko níže se přihlásíte.'
  },
  value: {
    lang: {
      'cs': 'Česky',
      'cs-cz': 'Česky',
      'en-us': 'Anglicky'
    }
  },
  route: {
    title: {
      datasetList: 'Datasety',
      datasetEdit: 'Editace datasetu',
      datasetUpload: 'Nový dataset',
      articleUpload: 'Nový článek',
      datasetDetail: 'Dataset',
      admin: 'Administrace',
      articleList: 'Články'
    }
  }
}
