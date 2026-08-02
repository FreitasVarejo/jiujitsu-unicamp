/**
 * Adapter para transformar StrapiEvent em Event (domain model).
 */

import { StrapiEvent, StrapiEventSummary } from "@/types/strapi";
import { Event, EventSummary } from "@/types/event";
import { resolveImage, resolveGallery } from "./media.adapter";

/**
 * Converte StrapiEventSummary para EventSummary (domain model).
 */
export const eventSummaryAdapter = (raw: StrapiEventSummary): EventSummary => {
  const coverImage = resolveImage(raw.cover) ?? {
    url: "",
    alternativeText: raw.title || "",
    focalPoint: null,
  };

  return {
    id: raw.slug,
    title: raw.title || "",
    date: raw.date || "",
    location: raw.location || "",
    coverImage,
  };
};

/**
 * Converte StrapiEvent para Event (domain model completo).
 */
export const eventAdapter = (raw: StrapiEvent): Event => {
  const summary = eventSummaryAdapter(raw);

  return {
    ...summary,
    description: raw.description || "",
    category: raw.category || "",
    gallery: resolveGallery(raw.gallery),
  };
};
