// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
import { AddressbarColor, colors } from 'quasar'

export default () => {
  AddressbarColor.set(colors.getBrand('primary'))
}
