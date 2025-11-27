import Container from './Container';
import { getTranslations } from 'next-intl/server';

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 text-sm text-zinc-600 dark:text-zinc-400">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">

          {/* Instagram link */}
          <a
            href="https://www.instagram.com/highelfmedia/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition"
          >
            <img
              src="/instagram.svg"
              alt="Instagram"
              className="h-5 w-5 opacity-80 hover:opacity-100 transition"
            />
            <span>{t('instagram')}</span>
          </a>

          {/* Copyright */}
          <p>{t('copyright', { year })}</p>
        </div>
      </Container>
    </footer>
  );
}
