export const getImageByImageId = (imageId: string) => {
  const path = imageId.replaceAll("-", "");
  return `https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_512/${path}.png`;
};
