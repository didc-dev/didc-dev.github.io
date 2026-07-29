import { portfolioImages, type PortfolioImageKey } from "../_data/images";

type Props = {
  imageKey: PortfolioImageKey;
  className?: string;
  sizes?: string;
  eager?: boolean;
  alt?: string;
};

export function ResponsiveImage({ imageKey, className, sizes = "100vw", eager = false, alt }: Props) {
  const image = portfolioImages[imageKey];
  const srcSet = image.widths.map((width) => `/images/portfolio/${image.base}-${width}.webp ${width}w`).join(", ");
  const fallbackWidth = image.widths.at(-1)!;
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={`/images/portfolio/${image.base}-${fallbackWidth}.webp`}
        width={image.width}
        height={image.height}
        alt={alt ?? image.alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        style={{ objectPosition: image.position }}
      />
    </picture>
  );
}
