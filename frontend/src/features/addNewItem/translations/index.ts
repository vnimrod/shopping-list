import enUS from './en-us.json';
import heIL from './he-il.json';

export type Lang = 'en-us' | 'he-il';
export type Dict = Record<string, string>;

const dictionaries: Record<Lang, Dict> = {
  'en-us': enUS,
  'he-il': heIL,
};

export const getTexts = (lang: Lang): Dict => dictionaries[lang] ?? enUS;