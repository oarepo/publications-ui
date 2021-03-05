export default {
  app: {
    productName: 'Repozitář publikací',
    description: 'Repozitář vědeckých publikací a datasetů',
    copyright: '©  2020 CESNET'
  },
  nav: {
    admin: 'Administrace',
    detail: 'Detail'
  },
  action: {
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
    uploadDataset: 'Nahrát dataset'
  },
  error: {
    popupLoginFail: 'Nebylo možno se přihlásit, prosím povolte v prohlížeči vyskakovací okna pro tento web',
    validationFail: 'Prosím opravte chyby a zkuste to znovu',
    validation: {
      required: 'Toto pole je vyžadováno',
      minLength: 'Toto pole musí obsahovat alespoň {min} znaků'
    }
  },
  accessibility: {},
  label: {
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
    size: 'Velikost',
    license: 'Licence',
    searchInput: 'Hledat podle názvu',
    localeSwitcher: 'Jazyk',
    documentType: 'Typ dokumentu',
    datasets: 'Datasety',
    role: {
      admin: 'admin',
      curator: 'kurátor'
    }
  },
  section: {
    datasetList: 'Datasety',
    datasetDetail: 'Detail datasetu',
    datasetUpload: 'Upload datasetu',
    loginRequired: 'Vyžadováno přihlášení',
    error: 'Chyba',
    gdpr: 'Souhlas s podmínkami',
    roles: 'Role',
    articleList: 'Články'
  },
  message: {
    noData: 'Žádná data',
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
      datasetDetail: 'Dataset',
      admin: 'Administrace',
      articleList: 'Články'
    }
  }
}
