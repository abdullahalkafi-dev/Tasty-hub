"use client";
import React, { useEffect, useState } from "react";

const BlogDescriptionComponent = ({
  content,
  details = true,
}: {
  content: string | undefined;
  details?: boolean | undefined;
}) => {
  const [truncatedContent, setTruncatedContent] = useState<string>("");

  useEffect(() => {
    const truncateContent = (text: string | undefined, maxLength: number) => {
      if (!text) return "";
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    };

    if (details) {
      setTruncatedContent(content || "");
    } else {
      setTruncatedContent(truncateContent(content, 300));
    }
  }, [content, details]);

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: truncatedContent || "" }}
    />
  );
};

export default BlogDescriptionComponent;
