<template lang="pug">
div.q-pa-md.q-gutter-sm
</template>

<script>
import {computed, defineComponent, nextTick, onMounted, ref, watch} from 'vue'
import {arrayContains, arraysDiffer} from '@/utils'
import useTaxonomy from '@/composables/useTaxonomy'

export default defineComponent({
  name: 'TaxonomyTree',
  emits: ['loaded', 'input'],
  props: {
    taxonomyCode: String,
    startExpanded: Boolean,
    treeOptions: {
      type: Object,
      default: () => ({
        checkbox: false,
        dnd: false
      })
    },
    initialSize: {
      type: Number,
      default: 50
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: [Object, Array] // selected items
  },
  setup (props, ctx) {
    const {loadTaxonomyPage, taxonomyUrl} = useTaxonomy()

    const tree = ref(null)
    const filter = ref('')
    const activatedFilter = ref('')
    const data = ref([])
    const dataReady = ref(false)
    const taxonomyUrlStack = ref([])
    const taxonomyTermStack = ref([])
    const pageStack = ref([])
    const page = ref(1)
    const size = ref(0)
    const total = ref(0)
    const singleLevel = ref(true)
    const selected = ref([])
    const checkRunning = ref(false)
    const deleted = ref(false)

    onMounted(() => {
      size.value = props.initialSize
      loadTaxonomy()
    })

    watch(props.value, () => {
      valueChanged()
    })

    function valueChanged () {
      if (props.value === null || props.value === undefined) {
        if (selected.value.length) {
          selected.value = []
        }
      } else if (Array.isArray(props.value)) {
        if (arraysDiffer(props.value, selected.value)) {
          selected.value = [...props.value]
        }
      } else {
        if (selected.value.length !== 1 || selected.value[0] !== props.value) {
          selected.value = [props.value]
        }
      }

      later(() => {
        check()
      })
    }

    function processData (data) {
      return data.map(x => {
        if (x.children !== undefined) {
          x.children = processData(x.children)
        }
        x.data = { ...x }
        if (x.data.selectable !== undefined) {
          x.state = { selectable: x.data.selectable }
        }
        delete x.data.children
        return x
      })
    }

    function loadTaxonomy () {
      loadTaxonomyPage({
        code: props.taxonomyCode,
        page: page.value,
        size: size.value,
        url: this.localTaxonomyUrl,
        filter: activatedFilter.value,
        levels: singleLevel.value ? 1 : undefined,
        deleted: deleted.value
      }).then(({ terms, total }) => {
        // terms starts with taxonomy node
        data.value = processData(terms.children)
        total.value = total
        dataReady.value = false
        nextTick(() => {
          dataReady.value = true
          if (props.startExpanded) {
            later(() => {
              tree.value.findAll({}).expand()
            })
          }
          later(() => {
            valueChanged()
            ctx.emit('loaded', {
              tree: tree,
              page: page.value,
              terms: terms,
              total: total.value,
              size: size.value
            })
          })
        })
      })
    }

    watch(page, () => {
      pageChanged()
    })

    function pageChanged () {
      loadTaxonomy()
    }

    function openTaxonomy ({ term, node }) {
      taxonomyTermStack.value.push(term)
      taxonomyUrlStack.value.push(term.links.self)
      pageStack.value.push(page.value)
      if (page.value !== 1) {
        page.value = 1 // no need to reload as it is automatic on page change
      } else {
        loadTaxonomy()
      }
    }

    function taxonomyUp () {
      taxonomyUrlStack.value.pop()
      taxonomyTermStack.value.pop()
      page.value = pageStack.value.pop()
      loadTaxonomy()
    }

    const parentListTerm = computed(() => {
      if (taxonomyTermStack.value.length) {
        return taxonomyTermStack.value[taxonomyTermStack.value.length - 1]
      }
    })

    const localTaxonomyUrl = computed(() => {
      if (taxonomyUrlStack.value.length > 0) {
        return taxonomyUrlStack.value[taxonomyUrlStack.value.length - 1]
      }
    })

    const hasParent = computed(() => {
      return taxonomyUrlStack.value.length
    })

    function search () {
      activatedFilter.value = filter.value
      if (page.value !== 1) {
        page.value = 1
      } else {
        loadTaxonomy()
      }
    }

    const maxPage = computed(() => {
      return Math.ceil(total.value / (size.value || 1))
    })

    const parentUrl = computed(() => {
      // returns local url (if nested) or the collection's url
      return localTaxonomyUrl.value || taxonomyUrl(props.taxonomyCode)
    })

    function prepend (...params) {
      const node = tree.value.prepend(...params)
      node.select()
    }

    function check () {
      checkRunning.value = true
      selected.value.forEach(term => {
        const selection = tree.value.find({ data: { slug: term.slug } })
        if (selection) {
          selection.check()
        }
      });
      (tree.value.checked() || []).forEach(node => {
        if (!arrayContains(selected.value, node.data)) {
          node.uncheck()
        }
      })
      this.checkRunning = false
    }

    function later (f) {
      const self = this
      const cnt = []
      function l () {
        if (!tree.value) {
          if (cnt.length < 5) {
            cnt.push(1)
            setTimeout(l, 100 * cnt.length)
          }
        } else {
          f()
        }
      }
      setTimeout(l, 0)
    }

    function expand () {
      later(() => tree.value.findAll({}).expand())
    }

    function collapse () {
      later(() => tree.value.findAll({}).collapse())
    }

    function clicked (term, node) {
      if (term.descendants_count > 0) {
        if (node.children.length) {
          if (node.expanded()) {
            later(() => {
              node.collapse()
            })
          } else {
            later(() => {
              node.expand()
            })
          }
        } else {
          openTaxonomy({ term, node })
        }
        return
      }
      selected.value = [term]
      ctx.emit('input', selected.value)
    }

    function checked (term) {
      if (checkRunning.value) {
        return
      }
      for (const t of selected.value) {
        if (t.slug === term.slug) {
          return
        }
      }
      if (props.multiple) {
        selected.value.push(term)
      } else {
        selected.value = [term]
      }
      ctx.emit('input', selected.value)
    }

    function unchecked (term) {
      if (checkRunning.value) {
        return
      }
      if (!props.multiple) {
        return
      }
      const prevSelected = selected.value
      selected.value = selected.value.filter(x => x !== term)
      if (prevSelected.length !== selected.value.length) {
        ctx.emit('input', selected.value)
      }
    }

    return {tree}
  }
})
</script>

<style scoped>

</style>
