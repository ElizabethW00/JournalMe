type ScribbleProp = {
  className?: string;
  innerClassName?: string;
  text?: string;
  regular?: boolean;
  light?: boolean;
  bold?: boolean;
  animate?: boolean;
};

const Scribble = ({
  className,
  innerClassName,
  text,
  regular,
  light,
  bold,
  animate,
}: ScribbleProp) => {
  return (
    <div
      className={`${className} ${regular && "redacted-script-regular"} ${
        light && "redacted-script-light"
      } ${
        bold && "redacted-script-bold"
      } pointer-events-none select-none tracking-wide uppercase text-justify`}
    >
      <p
        className={`absolute ${innerClassName} ${
          animate && "animate-scribble"
        }`}
      >
        {text ?? "musicaewjo"}
      </p>
    </div>
  );
};

export default Scribble;
