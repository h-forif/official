interface ImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  alt: string;
  src: string;
  fallback: string;
}

export default function Image({ src, alt, fallback, ...props }: ImageProps) {
  if (!src) {
    return <img src={fallback} alt={alt} {...props} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={(event) => {
        event.currentTarget.src = fallback;
      }}
      {...props}
    />
  );
}
