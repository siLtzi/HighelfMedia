import HeroContent from './Content';

interface HeroProps {
  locale: string;
  data: any; // Receives the data fetched in page.tsx
}

export default function Hero({ locale, data }: HeroProps) {
  // If data is missing (e.g. Sanity content not published), render nothing or a fallback
  if (!data) return null;

  return <HeroContent data={data} />;
}