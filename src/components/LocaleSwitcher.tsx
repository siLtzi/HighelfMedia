'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

type L = 'fi' | 'en';

export default function LocaleSwitcher({ current }: { current: L }) {
  const pathname = usePathname() || '/';
  const other: L = current === 'fi' ? 'en' : 'fi';

  // replace the first segment (/fi or /en) with the other
  const nextHref = pathname.replace(/^\/(fi|en)(?=\/|$)/, `/${other}`);

  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href={pathname.replace(/^\/(fi|en)(?=\/|$)/, '/fi')}
        className={current === 'fi' ? 'font-semibold underline' : 'opacity-70 hover:opacity-100'}
        aria-current={current === 'fi' ? 'page' : undefined}
      >
        FI
      </Link>
      <span className="opacity-40">/</span>
      <Link
        href={pathname.replace(/^\/(fi|en)(?=\/|$)/, '/en')}
        className={current === 'en' ? 'font-semibold underline' : 'opacity-70 hover:opacity-100'}
        aria-current={current === 'en' ? 'page' : undefined}
      >
        EN
      </Link>
    </div>
  );
}
