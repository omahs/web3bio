import { useEffect, useState } from "react";
import { fallbackEmoji } from "../../utils/utils";

export const Empty = (props) => {
  const { text = "Please try different identity keyword." } = props;
  const [emoji, setEmoji] = useState("");
  useEffect(() => {
    setEmoji(fallbackEmoji[Math.floor(Math.random() * fallbackEmoji.length)]);
  }, []);
  return (
    <div className="empty">
      <div className="empty-icon h1">{emoji}</div>
      <p className="empty-title h4">No results found</p>
      <p className="empty-subtitle">{text}</p>
    </div>
  );
};
