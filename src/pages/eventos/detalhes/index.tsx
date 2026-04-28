import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEventDetails } from "./hook";
import {
  Lightbox,
  ImageGrid,
  LoadingGallery,
  EventDetailsHeader,
  ReturnToEventPageLink,
  ErrorEventNotFound,
} from "./components";

export const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { details, loading, error, images } = useEventDetails(id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (loading) {
    return <LoadingGallery />;
  }

  if (error || !details) {
    return <ErrorEventNotFound error={error} />;
  }

  return (
    <div className="container py-12">
      <ReturnToEventPageLink />
      <EventDetailsHeader
        setSelectedImage={setSelectedImage}
        details={details}
      />
      <ImageGrid
        details={details}
        images={images}
        setSelectedImage={setSelectedImage}
      />
      <Lightbox
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};
