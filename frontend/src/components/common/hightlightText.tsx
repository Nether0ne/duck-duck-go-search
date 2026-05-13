import { FC } from "react";

type HighlightTextProps = {
  text: string;
  query: string;
  matchStart: number;
  currentMatchIndex: number;
};

export const HighlightText: FC<HighlightTextProps> = ({
  text,
  query,
  matchStart,
  currentMatchIndex,
}) => {
  if (!query) return text;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);

  let localMatchIndex = 0;

  return (
    <>
      {parts.map((part, i) => {
        if (!regex.test(part)) {
          regex.lastIndex = 0;
          return part;
        }
        regex.lastIndex = 0;

        const globalIndex = matchStart + localMatchIndex;
        const isCurrent = globalIndex === currentMatchIndex;
        localMatchIndex += 1;

        return (
          <mark
            key={i}
            data-match-index={globalIndex}
            className={
              isCurrent
                ? "bg-orange-400 font-bold rounded-sm"
                : "bg-yellow-200 rounded-sm"
            }
          >
            {part}
          </mark>
        );
      })}
    </>
  );
};

export const countMatches = (text: string, query: string) => {
  if (!query) return 0;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return (text.match(new RegExp(escaped, "gi")) ?? []).length;
};
