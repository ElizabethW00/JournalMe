"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import "./write.css";

const Write = ({ journalId }: { journalId?: string }) => {
  const router = useRouter();
  const [color, setColor] = useState("#8fc9cc");
  const [value, setValue] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // useEffect(() => {
  //   if (journalId) {
  //     axios
  //       .post("/api/journals", { journalId })
  //       .then((res) => {
  //         if (res.data?.journal?.text) {
  //           setValue(res.data.journal.text);
  //           setColor(res.data.journal.color);
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching journal:", err);
  //         toast.error("Failed to load journal.");
  //       });
  //   }
  // }, [journalId]);
  useEffect(() => {
    if (journalId) {
      axios
        .post("/api/journals", { journalId })
        .then((res) => {
          if (res.data?.journal?.text) {
            setValue(res.data.journal.text);
            setColor(res.data.journal.color);
          } else {
            toast.error("No journal found. Create a new one!");
          }
        })
        .catch((err) => {
          console.error("Error fetching journal:", err);
          toast.error("Failed to load journal.");
        });
    }
  }, [journalId]);


  const today = new Date();
  const colors = ["#8fc9cc", "#d49996", "#dbab70", "#a7bd95", "#a788b5"];

  const handleExit = async () => {
    try {
      if (!journalId && value === "") {
        router.push("/journals");
        return;
      }

      const response = await axios.post("/api/journals", {
        date: today,
        text: value,
        journalId,
        color,
      });

      if (response.status === 200) {
        toast.success("Successfully saved journal!");
        setTimeout(() => router.push("/journals"), 300);
      } else {
        toast.error("Failed to save journal.");
      }
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Error saving journal.");
    }
  };

  const autoGrow = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  useEffect(autoGrow, [value]);

  // Handle input change and format the lines
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    let inputValue = e.target.value;

    // Detect lines and format them into lists
    inputValue = inputValue
      .split("\n")
      .map((line, index, arr) => {
        if (line.match(/^\d+\.\s/)) {
          // Format numbered list
          const numberMatch = line.match(/^(\d+)\.\s/);
          if (numberMatch) {
            const num = parseInt(numberMatch[1], 10);
            return `${num}. ${line.slice(numberMatch[0].length)}`;
          }
        } else if (line.startsWith("- ") || line.startsWith("• ")) {
          // Format bullet list
          return `• ${line.slice(2)}`;
        }
        return line;
      })
      .join("\n");

    // Update the state with formatted value
    setValue(inputValue);
  };

  // Handle Tab key for indentation and Enter key for continuing list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const value = textarea.value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Handle Tab key for indentation
    if (e.key === "Tab") {
      const tabSpace = "  "; // Adjust tab space if necessary
      setValue(value.substring(0, start) + tabSpace + value.substring(end));
      textarea.selectionStart = textarea.selectionEnd = start + tabSpace.length;
      e.preventDefault();
    }

    // Handle Enter key to continue bullet or numbered list
    if (e.key === "Enter") {
      const prevLine = value.substring(0, start).split("\n").pop() || "";

      // Detect bullet or numbered list and continue
      if (prevLine.startsWith("- ") || prevLine.startsWith("• ")) {
        setValue(value.substring(0, start) + "\n• " + value.substring(end));
        textarea.selectionStart = textarea.selectionEnd = end; // Move cursor after the bullet
        textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight + 24;
        e.preventDefault();
        autoGrow();
      }
    }

    // Bold toggle
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      const selectedText = value.substring(start, end);
      const isBold =
        selectedText.startsWith("**") && selectedText.endsWith("**");

      const newText = isBold
        ? selectedText.slice(2, -2) // remove ** **
        : `**${selectedText}**`;

      setValue(value.substring(0, start) + newText + value.substring(end));

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          const offset = isBold ? -2 : 2;
          textareaRef.current.selectionStart = start + (isBold ? 0 : 2);
          textareaRef.current.selectionEnd = end + offset;
        }
      });
    }

    // Italic toggle
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
      e.preventDefault();
      const selectedText = value.substring(start, end);
      const isItalic =
        selectedText.startsWith("*") && selectedText.endsWith("*");

      const newText = isItalic
        ? selectedText.slice(1, -1)
        : `*${selectedText}*`;

      setValue(value.substring(0, start) + newText + value.substring(end));

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          const offset = isItalic ? -1 : 1;
          textareaRef.current.selectionStart = start + (isItalic ? 0 : 1);
          textareaRef.current.selectionEnd = end + offset;
        }
      });
    }

    // Underline toggle
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "u") {
      e.preventDefault();
      const selectedText = value.substring(start, end);
      const isUnderlined =
        selectedText.startsWith("<u>") && selectedText.endsWith("</u>");

      const newText = isUnderlined
        ? selectedText.slice(3, -4)
        : `<u>${selectedText}</u>`;

      setValue(value.substring(0, start) + newText + value.substring(end));

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          const offset = isUnderlined ? -3 : 3;
          textareaRef.current.selectionStart = start + (isUnderlined ? 0 : 3);
          textareaRef.current.selectionEnd = end + offset;
        }
      });
    }
  };

  return (
    <div className="page">
      <div className="backTwo">
        <div className="blurBox bg-teal-50"></div>
        <div className="blurBox bg-cyan-50"></div>
      </div>

      <div
        className="sm:absolute sm:top-0 sm:right-1/6 bg-[#F3FFF9] rounded-lg py-4 px-8 shadow-button-bottom-only cursor-pointer hover:scale-105 transition duration-300 w-1/2 my-4 sm:w-auto translate-x-1/2 sm:translate-x-0 "
        onClick={handleExit}
      >
        Save & Exit
      </div>

      <div className="platform">
        <div className="flex flex-col gap-4 w-4/5">
          <p className="date">
            {today.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-500 text-sm font-sans">
            Choose your journal's color:
          </p>
          <div className="flex flex-row justify-start gap-4">
            {colors.map((c, index) => (
              <div
                key={index}
                className={`colorBox ${color === c ? "ring-2 ring-black" : ""}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              ></div>
            ))}
          </div>
        </div>

        <form>
          <div>
            <textarea
              ref={textareaRef}
              value={value}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Write your thoughts..."
              className="writing-area "
            />
            {/* <div className="preview ">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{value}</ReactMarkdown>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;
