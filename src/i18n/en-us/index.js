import {productName} from '@/../package.json'

export default {
    app: {
        productName: productName,
        description: productName,
        copyrightNotice: 'This service is a part of CESNET e-infrastructure',
        copyright: '©  2021 CESNET a. l. e., Zikova 4, 160 00 Praha 6, Czech Republic'
    },
    icon: {
        delete_draft: 'delete_forever',
        revert_approval: 'assignment_return',
        make_public: 'public',
        make_private: 'public_off',
        request_approval: 'rule',
        approve: 'verified',
        request_changes: 'healing'
    },
    nav: {
        intro: '',
        admin: 'Administration',
        detail: 'Detail'
    },
    error: {
        submissionFail: 'Failed to submit the record',
        completeSuccess: 'Completed successfully',
        stateChangeFail: 'State change failed',
        stateChangeMessage: 'There was a following error when trying to change the record state',
        popupLoginFail: 'We were unable to log you in, please allow pop-ups for this website.',
        validationFail: 'Please correct the errors and try again',
        validation: {
            required: 'This field is required',
            minLength: 'Must be at least {min} characters long'
        }
    },
    hint: {
        primaryCommunity: 'Choose a primary community / group to which the record will belong to',
        localeSwitcher: 'Language code in ISO 639-2 format',
        publicationDate: 'In case your upload was already published elsewhere, please use the date of the first publication. Format: YYYY-MM-DD, YYYY-MM, or YYYY. For intervals use DATE/DATE, e.g. 1939/1945.'
    },
    action: {
        addItem: 'Add Item',
        rmItem: 'Remove Item',
        addLang: "Add language variant",
        rmLang: "Remove language variant",
        choose: 'Choose',
        filterByCommunity: 'Browse community records',
        sort: 'Order',
        delete_draft: 'delete draft record',
        make_private: 'unpublish record',
        make_public: 'publish record',
        approve: 'approve record',
        request_approval: 'request record approval',
        revert_approval: 'revert record approval',
        request_changes: 'request changes',
        makeTransition: 'Change state',
        attachArticle: 'Attach Article',
        submitDataset: 'Submit dataset record',
        addIdentifier: 'Přidat identifikátor',
        addAuthor: 'Add author',
        removeAuthor: 'Remove author',
        retry: 'Retry',
        close: 'Close',
        login: 'Log In',
        altLogin: 'Try alternative Log In',
        logout: 'Log Out',
        openTOS: 'Terms of service',
        openPrivacyPolicy: 'Privacy policy',
        accept: 'Accept',
        decline: 'Decline',
        upload: 'Upload',
        uploadDataset: 'Upload new dataset',
        uploadArticle: 'Upload new article',
        scrollToTop: 'Scroll to top'
    },
    accessibility: {},
    label: {
        forms: {
            basicInfo: 'Basic Info',
            identifiers: 'Identifiers',
            keywords: 'Keywords',
            additionalTitles: 'Additional titles',
            identifiersCaption: 'Are there any existing identifiers associated with the dataset',
            authors: 'Authors',
            uploadData: 'Data Upload',
            authorsContributors: 'Authors and Contributors',
            submission: 'DRAFT Record Submission',
        },
        retry: 'Retry',
        primaryCommunity: 'Primary Community',
        submit: 'Submit',
        contributors: 'Contributors',
        contributor: 'Contributor',
        languages: 'Languages',
        publisher: 'Publisher',
        publicationDate: 'Publication Date',
        roles: 'Roles',
        affiliations: 'Affiliations',
        name: 'Name',
        givenName: 'Given Name',
        familyName: 'Family Name',
        authorType: 'Author Type',
        author: 'Author',
        identifier: 'Identifier',
        scheme: 'Schema',
        pageSize: 'Page size',
        recordsFound: 'Found {count} record | Found {count} records',
        goHome: 'Back to Homepage',
        back: 'Back',
        next: 'Next',
        authors: 'Authors',
        isPublic: 'Record is public',
        isPendingApproval: 'Record is awaiting curator approval',
        isEdited: 'Record is being edited',
        actionApprove: 'Are you sure?',
        createdAt: 'Created',
        createArticle: 'Create article',
        identifierScheme: 'Scheme',
        searchInput: 'Search by title',
        localeSwitcher: 'Language',
        language: 'Language',
        datasetBasicInfo: 'Basic Info',
        skipDOI: 'Skip Import',
        importFromDOI: 'Import from DOI',
        articleMetadata: 'Article metadata',
        enterArticleDOI: 'Enter article DOI',
        titles: 'Titles',
        documentType: 'Document type',
        datasets: 'Datasets',
        contact: 'Contact Us',
        filters: 'Filters',
        community: 'Community',
        privacy: 'Privacy Policy',
        docs: 'User Documentation',
        sort: {
            alphabetical: 'Alphabetical'
        },
        role: {
            'system administrator': 'System administrator',
            admin: 'admin',
            curator: 'curator',
            member: 'member',
            publisher: 'editor'
        }
    },
    section: {
        articleExistsError: 'Found article with DOI',
        articleList: 'Articles',
        datasetList: 'Datasets',
        addFiles: 'Add files',
        datasetDetail: 'Dataset Detail',
        datasetUpload: 'Dataset Upload',
        identifiers: 'Additional Identifiers',
        license: 'License',
        files: 'Attachments',
        size: 'Size',
        loginRequired: 'Authentication required',
        gdpr: 'Terms of Service Consent',
        error: 'Error',
        roles: 'Roles'
    },
    message: {
        submissionSuccess: 'Successfully submitted a new record with ID {pid}',
        notFound: 'Oops. Nothing here',
        errorCreatingArticle: 'There was an error when creating the article',
        articleExistsError: 'An article record with this DOI already exists in this repository.' +
            'Would you like to attach the dataset to this article?',
        creatingArticle: 'Creating article',
        loadingMetadata: 'Loading metadata',
        copiedToClip: 'Copied to clipboard',
        resolveDOIError: 'DOI could not be resolved',
        draftDeleted: 'Draft record was deleted',
        doYRlyWnt: 'Do you really want to',
        noArticles: 'No articles found',
        noDatasets: 'No datasets found',
        noData: 'No data',
        loading: 'Loading',
        loggedOut: 'You have been logged out',
        recordNotValid: 'Record is not valid',
        gdprPrompt: 'By clicking on "Accept", you give your consent with our Terms of Service and Privacy Policy for this service.',
        authRequired: 'This page requires authentication.',
        submissionInfo: 'A new DRAFT record will be created with an unique persistent identifier.',
        submitting: 'Submitting record'
    },
    value: {
        authorType: {
            personal: 'Person',
            organizational: 'Organization'
        },
        lang: {
            'cs': 'Czech',
            'cs-cz': 'Czech',
            'en-us': 'English'
        }
    },
    route: {
        title: {
            datasetList: 'Datasets',
            datasetEdit: 'Edit Dataset',
            datasetUpload: 'Upload dataset',
            articleUpload: 'Upload article',
            datasetDetail: 'Dataset',
            admin: 'Administration',
            articleList: 'Articles'
        }
    }
}
