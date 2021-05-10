import {computed, ref} from 'vue'
import deepmerge from 'deepmerge'

const activeFacets = ref(null)
const facetsDrawerVisible = ref(false)

export default function useFacets(collection) {
    const defaults = ref({
        components: {
            bucketsContainer: {
                component: 'facet-container'
            },
            listBucketCheckbox: {
                attrs: {
                    color: 'secondary',
                    keepColor: true
                }
            },
            listBucketLabel: {
                component: 'div',
                useChildren: true,
                html: true,
                // eslint-disable-next-line no-unused-vars
                translator: ({bucket, facet}) => {
                    return `${(bucket.key_as_string || bucket.key)}      (${bucket.doc_count})`
                }
            },
            listBucketValue: {
                component: null,
            },
            // drawer: {
            //     component: 'facets-drawer',
            //     attrs: {},
            //     style: {'border-bottom': null},
            //     class: []
            // },
            // TODO: implement active facets drawer
            // drawerBucket: {
            //     component: () => import(/* webpackChunkName: 'facets' */ '@/components/search/facets/')
            // },
        }
    })

    const types = ref({
        nested: {
            components: {
                facet: {
                    component: 'nested-facet'
                }
            }
        }
    })

    const definitions = ref({
        accessRights: {
            type: 'nested',
            aggs: {
                inner_facet: {
                    label: "accessRights"
                }
            }
        },
        accessRightsCurator: {
            type: 'nested',
            aggs: {
                inner_facet: {
                    label: "access Rights Curator"
                }
            }
        },
        resourceType: {
            type: 'nested',
            aggs: {
                inner_facet: {
                    label: "resourceType"
                }
            }
        },
        language: {
            type: 'nested',
            aggs: {
                inner_facet: {
                    label: "language"
                }
            }
        },
        rights: {
            type: 'nested',
            aggs: {
                inner_facet: {
                    label: "rights"
                }
            }
        },
        provider: {
            type: 'nested',
            aggs: {
                inner_facet: {
                    label: "provider"
                }
            }
        },
        entities: {
            type: 'nested',
            aggs: {
                inner_facet: {
                    label: "entities"
                }
            }
        }
    })

    async function facetLoader(facetSelection, activeFacets, excludedFromQuery /*, extras = {}*/) {
        const fetchedFacets = new Set([...Object.keys(facetSelection.selected()), ...Object.keys(activeFacets)])
        if (!fetchedFacets.size) {
            return {}
        }
        const facets = await collection.httpFacets.load({
            query: {
                facets: [...Array.from(fetchedFacets.values()).map(transformFacet)].join(','),
                ...Object.entries(facetSelection.selected()).reduce(
                    (p, s) => {
                        if (!(excludedFromQuery && excludedFromQuery.includes(s[0]))) {
                            p[transformFacet([0])] = [...s[1]].map(x => x.toString())
                        }
                        return p
                    }, {}),
                size: 1
            },
            returnPromise: true
        })
        return facets.aggregations
    }

    const facetDefinitions = computed(() => {
        const cols = collection.facetDefinitions
        // eslint-disable-next-line no-unused-vars
        for (const [k, val] of Object.entries(cols)) {
            if (definitions.value[k]) {
                cols[k] = deepmerge(cols[k], definitions.value[k])
            }
        }
        return cols
    })

    function transformFacet(f) {
        if (f.split) {
            return f.split('.')[0]
        } else {
            return f
        }
    }

    return {
        defaults,
        types,
        definitions,
        facetDefinitions,
        activeFacets,
        facetsDrawerVisible,
        facetLoader,
        transformFacet
    }
}
