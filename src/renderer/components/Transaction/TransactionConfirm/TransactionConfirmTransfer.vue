<template>
  <ListDivided :is-floating-label="true">
    <ListDividedItem
      :label="$t('TRANSACTION.AMOUNT')"
    >
      {{ formatter_networkCurrency(transaction.amount) }}
    </ListDividedItem>

    <ListDividedItem :label="$t('TRANSACTION.RECIPIENT')">
      <div
        class="flex flex-row items-center"
        @click="showUnikName = !showUnikName"
      >
        <div
          v-if="transaction.recipientUnikName"
          v-tooltip="{ content: $t('TRANSACTION.UNIKNAME_TOOLTIP', {unikname: transaction.recipientUnikName.resolver.unikname}), trigger: 'hover' }"
          class="flex flex-row items-center"
        >
          <img
            class="TransactionConfirmTransfer__uniknamePicture mr-2"
            :src="transaction.recipientUnikName.profile.picture"
          >
          <span class="TransactionConfirmTransfer__unikname flex flex-row items-start">
            <span>
              @{{ transaction.recipientUnikName.resolver.unikname }}
            </span>
            <span
              v-if="transaction.recipientUnikName.resolver.label && transaction.recipientUnikName.resolver.label !== 'default'"
            >
              #{{ transaction.recipientUnikName.resolver.label }}
            </span>
            &nbsp;-&nbsp;
          </span>
        </div>
        <div
          :class="{'TransactionConfirmTransfer__recipientAddress': transaction.recipientUnikName && transaction.recipientUnikName.resolver.unikname}"
        >
          {{ transaction.recipientId }}
        </div>
      </div>
    </ListDividedItem>
    <Collapse
      v-if="transaction.recipientUnikName"
      :is-open="showUnikName"
    >
      <Unikard :unikname="transaction.recipientUnikName" />
    </Collapse>

    <ListDividedItem
      v-if="transaction.vendorField"
      :label="$t('TRANSACTION.VENDOR_FIELD')"
    >
      {{ transaction.vendorField }}
    </ListDividedItem>

    <ListDividedItem :label="$t('TRANSACTION.FEE')">
      {{ formatter_networkCurrency(transaction.fee) }}
    </ListDividedItem>
  </ListDivided>
</template>

<script>
import { TRANSACTION_TYPES } from '@config'
import { ListDivided, ListDividedItem } from '@/components/ListDivided'
import { Unikard } from '@/components/UnikName'
import { Collapse } from '@/components/Collapse'

export default {
  name: 'TransactionConfirmTransfer',

  transactionType: TRANSACTION_TYPES.TRANSFER,

  inject: ['transaction'],

  components: {
    ListDivided,
    ListDividedItem,
    Unikard,
    Collapse
  },

  data: () => {
    return {
      showUnikName: false
    }
  }
}
</script>

<style lang="postcss" scoped>
.TransactionConfirmTransfer__uniknamePicture {
  width: 30px;
  height: 30px;
  border-radius: 30px;
}
.TransactionConfirmTransfer__unikname {
  font-weight: bold;
}
.TransactionConfirmTransfer__recipientAddress {
  color: lightslategray;
  font-style: italic;
}
</style>
