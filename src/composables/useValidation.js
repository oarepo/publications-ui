import {ref} from "vue";

export default function useValidation() {

    const error = ref(false)
    const errorMessage = ref('')

    function resetValidation () {
        error.value = false
        errorMessage.value = ''
    }

    const required = (msg) => {
        return x => {
            let valid = !!x
            if (valid && x.length !== undefined) {
                valid = !!x.length
            }
            return valid || msg
        }
    }

    const minLength = (len, msg) => {
        return x => x.length >= len || msg
    }

    const maxLength = (len, msg) => {
        return x => x.length <= len || msg
    }

    return {required, minLength, maxLength, error, errorMessage, resetValidation}
}
