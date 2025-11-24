import {getRequestConfig} from 'next-intl/server';

type Locales = 'fi' | 'en';

export default getRequestConfig(async ({locale}) => {
  const l = ((locale ?? 'fi') as Locales);
  const messages = (await import(`./messages/${l}.json`)).default;

  return {
    locale: l,
    messages
  };
});