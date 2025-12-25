import { useTranslations } from 'next-intl';
import ContactPageContent from './Content';

// 1. Define the interface for the data prop
interface ContactPageProps {
  data: {
    contactPage?: {
      title?: string;
      desc?: string;
    };
    footer?: {
      email?: string;
      phone?: string;
      location?: string;
    };
  } | null;
  services: {
    title: string;
    slug: string;
    packages: { name: string }[];
  }[];
}

// 2. Accept 'data' as a prop
export default function ContactPage({ data, services }: ContactPageProps) {
  const t = useTranslations('contact');

  // 3. Extract the two parts of data we need
  const contactSettings = data?.contactPage || {};
  const footerInfo = data?.footer || {};

  return (
    <ContactPageContent 
      services={services}
      labels={{
        // Use Sanity data if available, otherwise use JSON fallback
        title: contactSettings.title || t('title'),
        desc: contactSettings.desc || t('desc'),
        name: t('name'),
        email: t('email'),
        message: t('message'),
        submit: t('submit'),
        helper: t('helper')
      }}
      info={{
        email: footerInfo.email || "hello@highelf.fi",
        phone: footerInfo.phone || "",
        location: footerInfo.location || "Oulu, Finland"
      }}
    />
  );
}