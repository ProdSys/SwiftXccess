import { Component, Vue } from 'nuxt-property-decorator'
import { initialiseStores } from '~/utils/store-accessor'

@Component
export default class BaseMixin extends Vue {
  public isInvalid(item) {
    return item.$dirty ? !item.$error : null
  }

  public invalidFeedback(item, type, customMessage) {
    if (typeof customMessage !== 'undefined') {
      return customMessage
    }

    if (typeof type === 'undefined') {
      return 'Not Handled'
    } else {
      switch (type) {
        case 'required':
          return 'This is a required field.'
        case 'terms':
          return 'Please accept terms and conditions.'
        case 'email':
          return 'Please enter a valid email address.'
        case 'password':
          return 'Please enter a valid password - must be between 8 and 30 characters, and must include lowercase, uppercase, number and special characters.'
        case 'confirmPassword':
          return 'Confirmation password should be the same as password.'
        default:
          return 'Not Handled'
      }
    }
  }

  get stores() {
    return initialiseStores(this.$store)
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
