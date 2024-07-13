import { getImageByImageId } from "@/utils/image";

describe("getImageByImageId", () => {
  it("should return the correct URL for a given imageId", () => {
    const imageId = "example-image-id";
    const expectedUrl =
      "https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_512/exampleimageid.png";
    const result = getImageByImageId(imageId);
    expect(result).toBe(expectedUrl);
  });

  it("should replace all hyphens with an empty string in the imageId", () => {
    const imageId = "ex-ample-image-id";
    const expectedUrl =
      "https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_512/exampleimageid.png";
    const result = getImageByImageId(imageId);
    expect(result).toBe(expectedUrl);
  });

  it("should return a URL with the correct file extension", () => {
    const imageId = "example-image-id";
    const expectedUrl =
      "https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_512/exampleimageid.png";
    const result = getImageByImageId(imageId);
    expect(result.endsWith(".png")).toBeTruthy();
  });

  it("should return a URL that starts with the correct S3 bucket URL", () => {
    const imageId = "example-image-id";
    const expectedUrl =
      "https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_512/exampleimageid.png";
    const result = getImageByImageId(imageId);
    expect(
      result.startsWith(
        "https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_512/"
      )
    ).toBeTruthy();
  });
});
