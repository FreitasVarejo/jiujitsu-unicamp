import { Instructor } from '../types/media';
import { Belt, BELT_INFO } from '@/constants';
import { resolveImage } from './adapters.handlers';

const parseBelt = (value: unknown): Belt => {
  if (value == null) return Belt.BRANCA;
  const normalized = String(value).toUpperCase();
  const entry = (Object.entries(BELT_INFO) as [string, { id: string }][]).find(
    ([, info]) => info.id === normalized,
  );
  return entry ? (Number(entry[0]) as Belt) : Belt.BRANCA;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const instructorAdapter = (raw: any): Instructor => {
  const belt = parseBelt(raw.belt);

  const photo = resolveImage(raw.photo) ?? {
    url: '',
    alternativeText: raw.title || '',
  };

  return {
    id: raw.slug,
    title: raw.title || '',
    year: raw.year || '',
    course: raw.course || '',
    belt,
    photo,
  };
};
