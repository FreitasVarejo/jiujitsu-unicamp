import { useEffect, useState } from "react";

interface FontsAPI {
  ready: Promise<unknown>;
}

export const useFontsLoaded = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkFonts = async () => {
      try {
        if ("fonts" in document) {
          const fonts = document as unknown as { fonts: FontsAPI };
          await fonts.fonts.ready;
        }

        if (isMounted) {
          setFontsLoaded(true);
          document.body.classList.add("fonts-loaded");
        }
      } catch (err) {
        console.error("Erro ao carregar fontes:", err);
        if (isMounted) {
          setFontsLoaded(true);
        }
      }
    };

    checkFonts();

    return () => {
      isMounted = false;
    };
  }, []);

  return fontsLoaded;
};
