export default {
  app: {
    productName: 'Digitální Repozitář',
    description: 'Digitální Repozitář vědeckých publikací a datasetů',
    copyrightNotice: 'Tato služba je součástí e-infrastruktury CESNET',
    copyright: '©  2020 CESNET z.s.p.o.  Zikova 4, 160 00 Praha 6'
  },
  icon: {
    request_approval: 'rule',
    request_changes: 'healing',
    approve: 'verified'
  },
  nav: {
    admin: 'Administrace',
    detail: 'Detail'
  },
  action: {
    approve: 'schválit záznam',
    request_changes: 'vyžádat opravu záznamu',
    request_approval: 'odeslat záznam ke schválení',
    makeTransition: 'Změna stavu',
    attachArticle: 'Připojit článek',
    submitDataset: 'Nahrát dataset',
    retry: 'Zkusit znovu',
    close: 'Zavřít',
    addTitle: 'Přidat název',
    login: 'Přihlásit se',
    altLogin: 'Přejít na alternativní přihlášení',
    logout: 'Odhlásit se',
    openTOS: 'Pravidla využití',
    openPrivacyPolicy: 'Zpracování osobních údajů',
    accept: 'Souhlasím',
    decline: 'Nesouhlasím',
    upload: 'Nahrát',
    uploadDataset: 'Nahrát nový dataset',
    uploadArticle: 'Nahrát nový článek'
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
    actionApprove: 'Odsouhlasení akce',
    addFiles: 'Nahrát přílohy',
    addIdentifier: 'Přidat identifikátor',
    abstract: 'Abstrakt',
    datasetBasicInfo: 'Základní informace',
    createdAt: 'Vytvořeno',
    titles: 'Název záznamu',
    identifiers: 'Identifikátory',
    language: 'Jazyk',
    identifierScheme: 'Schema',
    files: 'Soubory',
    filters: 'Filtry',
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
    role: {
      admin: 'admin',
      curator: 'kurátor'
    }
  },
  section: {
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
    completeSuccess: 'Úspěšně dokončeno',
    doYRlyWnt: 'Opravdu chcete',
    noData: 'Žádná data',
    recordNotValid: 'V záznamu jsou chyby',
    gdprPrompt: 'Kliknutím na "Souhlasím", vyjadřujete souhlas s našimi pravidly využití služeb a podmínkami zpracování osobních údajů.',
    authRequired: 'Tato stránka vyžaduje autentizaci. Kliknutím na tlačítko níže se přihlásíte.'
  },
  value: {
    lang: {
      csCZ: 'Česky',
      enUS: 'Anglicky'
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
