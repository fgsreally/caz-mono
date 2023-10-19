import type { I18n, I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'

export const i18n = createI18n(<I18nOptions>{
    locale: 'en', // TODO: i18n system!
    fallbackLocale: 'en',
    legacy: false,
    allowComposition: true,
})

const i18nInstance = i18n


export async function changeAppLanguage(locale: string) {
    const localeData = en

    if (!i18nInstance)
        throw new Error('Tried to change language without active i18n instance')

    i18nInstance.global.setLocaleMessage(locale, localeData)

    // TODO: Look into the type issues here
    i18nInstance.global.locale.value = locale
}