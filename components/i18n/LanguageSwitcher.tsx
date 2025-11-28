'use client';

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from './LanguageProvider';
import { Locale, localeNames } from '@/lib/i18n/config';
import { useState, useEffect } from 'react';

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" suppressHydrationWarning>
        <Globe className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t.header.language}>
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLocaleChange('en')}
          className={locale === 'en' ? 'bg-accent' : ''}
        >
          {localeNames.en}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLocaleChange('ar')}
          className={locale === 'ar' ? 'bg-accent' : ''}
        >
          {localeNames.ar}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
