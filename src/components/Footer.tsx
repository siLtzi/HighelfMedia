import Container from './Container';
import { getTranslations } from 'next-intl/server';

export default async function Footer({ locale }: { locale: 'fi' | 'en' }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const year = new Date().getFullYear();
  return (
    <footer className="py-10 text-sm text-zinc-600 dark:text-zinc-400">
      <Container>
        <p>{t('copyright', { year })}</p>
      </Container>
    </footer>
  );
}
