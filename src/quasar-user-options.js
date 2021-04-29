import './styles/quasar.sass'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {AddressbarColor, BottomSheet, Cookies, Dialog, Loading, LoadingBar, Meta, Notify} from 'quasar'

export default {
    config: {
        brand: {
            primary: '#0068a2',
            secondary: '#5a5a5a',
            accent: '#5a5a5a',

            dark: '#1D1D1D',

            positive: '#008547',
            negative: '#E60000',
            info: '#00A1DE',
            warning: '#FBB731'
        }
    },
    plugins: {
        AddressbarColor,
        Cookies,
        BottomSheet,
        Loading,
        LoadingBar,
        Meta,
        Dialog,
        Notify
    }
}
