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
      <div className={`absolute ${innerClassName}`}>
        {text ?? "musicaewjo"}

        <div
          className={`${
            animate
              ? "animate-scribble w-[105%] h-full absolute top-1/2 right-[-1px] bg-white"
              : "hidden"
          }`}
        />
      </div>
    </div>
  );
};

export default Scribble;
