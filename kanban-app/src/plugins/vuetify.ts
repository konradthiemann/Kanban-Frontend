import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { VApp, VAppBar, VMain, VContainer, VRow, VCol, VCard, VCardTitle, VCardText, VDivider, VList, VListItem, VToolbar, VToolbarTitle, VSpacer, VBtn, VTextField, VRadioGroup, VRadio } from 'vuetify/components'


const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components: {
    VApp,
    VAppBar,
    VMain,
    VContainer,
    VRow,
    VCol,
    VCard,
    VCardTitle,
    VCardText,
    VDivider,
    VList,
    VListItem,
    VToolbar,
    VToolbarTitle,
    VSpacer,
    VBtn,
    VTextField,
    VRadioGroup,
    VRadio,
  },
})

export default vuetify
