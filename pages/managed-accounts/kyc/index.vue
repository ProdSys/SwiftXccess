<template>
  <section>
    <b-container>
      <b-row>
        <b-col>
          <iframe id="iframe" :src="redirectUrl" style="width:100%; height:800px;" allow="camera *;" frameborder="0" />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import * as AuthStore from '~/store/modules/Auth'
import * as ConsumersStore from '~/store/modules/Consumers'
import BaseMixin from '~/minixs/BaseMixin'
import { accountsStore } from '~/utils/store-accessor'

@Component({
  components: {}
})
export default class KycPage extends mixins(BaseMixin) {
  redirectUrl!: string

  async asyncData({ store, redirect }) {
    const _consumerId = AuthStore.Helpers.identityId(store)

    try {
      const _res = await ConsumersStore.Helpers.startKYC(store, _consumerId)
      return { redirectUrl: _res.data.redirectUrl }
    } catch (e) {
      if (e.response.data.errorCode === 'KYC_ALREADY_APPROVED') {
        const _accounts = await accountsStore(store).index()

        if (_accounts.data.count >= 1) {
          const _accountId = _accounts.data.account[0].id.id
          redirect('/managed-accounts/' + _accountId + '/topup')
        }
      }
    }
  }

  receiveMessage(event) {
    console.log(event)
    switch (event.data.status) {
      case 'failed':
        this.$router.push('/managed-accounts/kyc/failed')
        break
      case 'approved':
        this.$router.push('/managed-accounts/kyc/check')
        break
    }
  }

  beforeMount() {
    window.addEventListener('message', this.receiveMessage, false)
  }

  beforeDestroy() {
    window.removeEventListener('message', this.receiveMessage, false)
  }
}
</script>
