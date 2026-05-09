import { CSSProperties } from "react";
import { Image } from "@/types/base";

/**
 * Generate CSS styles for image focal point positioning
 * Used in ProductCard, ProductModal, etc.
 */
export const getImageStyle = (
  focalPoint: Image["focalPoint"] | undefined,
  objectFit: "cover" | "contain" = "cover"
): CSSProperties => ({
  objectFit,
  objectPosition: focalPoint ? `${focalPoint.x}% ${focalPoint.y}%` : "center",
});

/**
 * Generate placeholder image URL based on product title
 */
export const getPlaceholderUrl = (title: string): string => {
  return `https://placehold.co/500x400/18181b/d26030?text=${title.replace(/ /g, "+")}`;
};
