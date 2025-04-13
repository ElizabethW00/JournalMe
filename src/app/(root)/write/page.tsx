"use client";
import React, { useState, useRef } from "react";
import "./write.css";

const Write = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string>("");

  // Handle input change and format the lines
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

    // Adjust textarea height based on content
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = textarea.scrollHeight + "px"; // Grow to fit content
    }
  };

  // Handle Tab key for indentation and Enter key for continuing list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const value = textarea.value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Handle Tab key for indentation
    if (e.key === "Tab") {
      e.preventDefault();
      const tabSpace = "  "; // Adjust tab space if necessary
      textarea.value =
        value.substring(0, start) + tabSpace + value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + tabSpace.length;
    }

    // Handle Enter key to continue bullet or numbered list
    if (e.key === "Enter") {
      const prevLine = value.substring(0, start).split("\n").pop() || "";

      // Detect bullet or numbered list and continue
      if (prevLine.startsWith("- ") || prevLine.startsWith("• ")) {
        textarea.value =
          value.substring(0, start) + "\n• " + value.substring(end); // Continue bullet list
        textarea.selectionStart = textarea.selectionEnd = start + 3; // Move cursor after the bullet
        e.preventDefault();
      } else if (/^\d+\.\s/.test(prevLine)) {
        // Get the last number in the numbered list
        const lines = value.split("\n");
        let lastNumber = 0;
        // Loop backwards through the lines to find the last numbered line
        for (let i = lines.length - 1; i >= 0; i--) {
          const line = lines[i];
          const numberMatch = line.match(/^(\d+)\.\s/);
          if (numberMatch) {
            lastNumber = parseInt(numberMatch[1], 10);
            break;
          }
        }

        // Insert the next number
        const nextNumber = lastNumber + 1;
        textarea.value =
          value.substring(0, start) +
          "\n" +
          `${nextNumber}.    ` +
          value.substring(end);
        textarea.selectionStart = textarea.selectionEnd =
          start + `${nextNumber}.    `.length; 
        e.preventDefault();
      }
    }
  };

  // Format today's date for display
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="platform">
      <p className="date">{today}</p>
      <form>
        <textarea
          ref={textareaRef}
          value={value}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Write your thoughts..."
          className="writing-area"
        />
      </form>
    </div>
  );
};

export default Write;
