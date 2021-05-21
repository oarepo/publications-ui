export const DATASETS_COLLECTION_CODE = 'datasets'
export const DATASETS_DRAFT_COLLECTION_CODE = 'datasets/draft'

export const ARTICLES_COLLECTION_CODE = 'articles'
export const ARTICLES_DRAFT_COLLECTION_CODE = 'articles/draft'

export const STATE_EDITING = 'editing'
export const STATE_APPROVED = 'approved'
export const STATE_PUBLISHED = 'published'
export const STATE_PENDING_APPROVAL = 'pending-approval'

export const AUTHOR_TYPES = Object.freeze({
    PERSON: 'personal',
    ORGANIZATION: 'organizational',
})

export const RESOURCE_IDENTIFIER_SCHEMES = [
    "ark",
    "arxiv",
    "bibcode",
    "doi",
    "ean13",
    "eissn",
    "handle",
    "igsn",
    "isbn",
    "issn",
    "istc",
    "lissn",
    "lsid",
    "pmid",
    "purl",
    "upc",
    "url",
    "urn",
    "w3id"
]

// Refers to MULTILINGUAL_SUPPORTED_LANGUAGES config.py API option
export const API_MULTILINGUAL_SUPPORTED_LANGUAGES = ['cs', 'en']

export const PERSON_IDENTIFIER_SCHEMES = ["orcid", "isni", "gnd", "ror"]

// TODO: migrate to taxonomy terms
export const CONTRIBUTOR_ROLES = [
    'advisor',
    'artist',
    'collaborator',
    'contact-person',
    'data-curator',
    'data-manager',
    'distributor',
    'editor',
    'organizer',
    'panelist',
    'photographer',
    'producer',
    'project-leader',
    'project-manager',
    'project-member',
    'research-group',
    'referee',
    'researcher',
    'reviewer',
    'rights-holder',
    'supervisor',
    'translator'
]

// TODO: migrate to taxonomy terms
export const AFFILIATIONS = ['CESNET', 'VŠCHT', 'NTK', 'AVČR']

// TODO: migrate to taxonomy terms
export const LICENSES = [
    'cc/1-0',
    'cc/2-0',
    'cc/2-5',
    'cc/3-0',
    'cc/4-0',
    'cc/zero',
    'cc',
    'copyright'
]

export default {
    DATASETS_COLLECTION_CODE,
    DATASETS_DRAFT_COLLECTION_CODE,
    ARTICLES_COLLECTION_CODE,
    ARTICLES_DRAFT_COLLECTION_CODE,
    STATE_EDITING,
    STATE_PENDING_APPROVAL,
    RESOURCE_IDENTIFIER_SCHEMES,
    PERSON_IDENTIFIER_SCHEMES,
    AUTHOR_TYPES,
    AFFILIATIONS,
    LICENSES,
    CONTRIBUTOR_ROLES,
}
