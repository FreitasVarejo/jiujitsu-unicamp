import { Instructor } from '../types/media';
import { Belt } from '@/constants';
import { resolveImage } from './adapters.handlers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const instructorAdapter = (raw: any): Instructor => {
  const belt =
    raw.belt && Object.values(Belt).includes(raw.belt as Belt)
      ? (raw.belt as Belt)
      : Belt.Branca;

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
