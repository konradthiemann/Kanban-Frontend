import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { VApp, VAppBar,VSelect,VOverlay, VCheckbox, VMain, VContainer, VRow, VCol, VCard, VCardTitle, VCardText, VDivider, VList, VListItem, VToolbar, VToolbarTitle, VSpacer, VBtn, VTextField, VRadioGroup, VRadio, VTextarea } from 'vuetify/components'


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
    VOverlay,
    VMain,
    VContainer,
    VRow,
    VSelect,
    VCol,
    VCheckbox,
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
    VTextarea,
    VRadioGroup,
    VRadio,
  },
  theme: {
    defaultTheme: 'dark',
  },
})

export default vuetify
