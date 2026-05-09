/**
 * Adapter para transformar StrapiInstructor em Instructor (domain model).
 */

import { StrapiInstructor } from "@/types/strapi";
import { Instructor } from "@/types/home";
import { Belt, BELT_INFO } from "@/constants/home";
import { resolveImage } from "./media.adapter";

const parseBelt = (value: unknown): Belt => {
  if (value == null) return Belt.BRANCA;
  const normalized = String(value).toUpperCase();
  const entry = (Object.entries(BELT_INFO) as [string, { id: string }][]).find(
    ([, info]) => info.id === normalized
  );
  return entry ? (Number(entry[0]) as Belt) : Belt.BRANCA;
};

/**
 * Converte StrapiInstructor para Instructor (domain model).
 */
export const instructorAdapter = (raw: StrapiInstructor): Instructor => {
  const belt = parseBelt(raw.belt);

  const photo = resolveImage(raw.photo) ?? {
    url: "",
    alternativeText: raw.title || "",
    focalPoint: null,
  };

  return {
    id: raw.slug,
    title: raw.title || "",
    year: raw.year || "",
    course: raw.course || "",
    belt,
    photo,
  };
};
