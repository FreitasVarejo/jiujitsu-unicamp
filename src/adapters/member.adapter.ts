import { Member } from '../types/media';
import { Belt } from '@/constants';
import { resolveMediaUrl } from './adapters.handlers';

export const memberAdapter = (raw: any): Member => {
  const belt =
    raw.belt && Object.values(Belt).includes(raw.belt as Belt)
      ? (raw.belt as Belt)
      : Belt.Branca;

  return {
    id: raw.slug,
    title: raw.title,
    year: raw.year || '',
    course: raw.course || '',
    belt,
    coverImage: resolveMediaUrl(raw.photo),
  };
};
