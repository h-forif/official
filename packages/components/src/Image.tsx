interface ImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  alt: string;
  src: string;
  fallback?: string;
}

export default function Image({ src, alt, fallback, ...props }: ImageProps) {
  let fallbackSrc = fallback;
  if (fallbackSrc === undefined) {
    fallbackSrc = 'https://via.placeholder.com/320x240?text=Image+Not+Found';
  }
  if (!src) {
    return <img src={fallbackSrc} alt={alt} {...props} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={(event) => {
        event.currentTarget.src = fallbackSrc;
      }}
      {...props}
    />
  );
}
