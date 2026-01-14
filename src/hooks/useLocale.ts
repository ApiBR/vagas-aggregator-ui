import { useTranslation } from 'react-i18next';
import { enUS, es, it, ptBR } from 'date-fns/locale';

export function useLocale() {
  const { i18n } = useTranslation();

  const locales = {
    en: enUS,
    es: es,
    it: it,
    pt: ptBR
  };

  return locales[i18n.language as keyof typeof locales] || enUS;
}