import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { VApp, VAppBar,VSelect,VOverlay, VDialog,VForm, VCheckbox, VMain, VContainer, VRow, VCol, VCard, VCardTitle, VCardText, VDivider, VList, VListItem, VToolbar, VToolbarTitle, VSpacer, VBtn, VTextField, VRadioGroup, VRadio, VTextarea, VCheckboxBtn, VCardActions } from 'vuetify/components'


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
    VBtn,
    VCard,
    VCardActions,
    VCardText,
    VCardTitle,
    VCheckbox,
    VCheckboxBtn,
    VContainer,
    VCol,
    VDialog,
    VDivider,
    VForm,
    VList,
    VListItem,
    VMain,
    VOverlay,
    VRadioGroup,
    VRadio,
    VRow,
    VSelect,
    VSpacer,
    VToolbar,
    VToolbarTitle,
    VTextField,
    VTextarea,
  },
  theme: {
    defaultTheme: 'dark',
  },
})

export default vuetify
