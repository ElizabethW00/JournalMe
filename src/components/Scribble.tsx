type ScribbleProp = {
  className?: string;
  regular?: boolean;
  light?: boolean;
  bold?: boolean;
};

const Scribble = ({ className, regular, light, bold }: ScribbleProp) => {
  return (
    <p
      className={`${className} ${regular && "redacted-script-regular"} ${
        light && "redacted-script-light"
      } ${
        bold && "redacted-script-bold"
      } pointer-events-none select-none tracking-wide uppercase text-justify`}
    >
      musicaewjo
    </p>
  );
};

export default Scribble;
