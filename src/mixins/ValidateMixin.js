export default {
    props: {
        rules: Array
    },
    methods: {
        validate () {
            this.$refs.input.validate()
        }
    },
    computed: {
        hasError () {
            return this.$refs.input.hasError
        }
    }
}
