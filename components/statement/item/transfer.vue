<template>
  <b-row align-v="center">
    <b-col cols="1">
      <div class="transaction-type-icon">
        <div class="transaction increase">
          <transfer-icon />
        </div>
      </div>
    </b-col>
    <b-col>
      <div class="transaction-type">
        <div class="transaction">
          <template v-if="isOut">To {{ destination }}</template>
          <template v-if="isIn">From {{ source }}</template>
        </div>
      </div>
      <b-row class="text-muted">
        <b-col>
          Personal Transfer
        </b-col>
        <b-col class="text-right">
          <card-fee :transaction="transaction" />
        </b-col>
      </b-row>
    </b-col>
    <b-col class="text-right" cols="3" xl="2">
      <amount :transaction="transaction" />
    </b-col>
  </b-row>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { StatementEntry } from '~/api/Models/Statements/StatementEntry'

@Component({
  components: {
    TransferIcon: () => import('~/assets/svg/statement/transfer.svg?inline'),
    Amount: () => import('~/components/statement/item/common/amount.vue'),
    CardFee: () => import('~/components/statement/item/common/cardFee.vue')
  }
})
export default class StatementItemAdditionalField extends Vue {
  @Prop()
  readonly transaction!: StatementEntry

  get source() {
    return this.transaction.additionalFields?.sourceInstrumentFriendlyName
  }

  get destination() {
    return this.transaction.additionalFields?.destinationInstrumentFriendlyName
  }

  get isOut() {
    return this.destination !== undefined
  }

  get isIn() {
    return this.source !== undefined
  }
}
</script>
