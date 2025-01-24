export function highlightText(content: string) {
  const keywords = {
    승인: "text-blue",
    거절: "text-red",
    "새로 들어왔어요.": "text-green",
  };

  return (
    <>
      {content.split(/(승인|거절|새로 들어왔어요\.?)/g).map((part, index) => {
        const color = keywords[part as keyof typeof keywords];
        return color ? (
          <span key={index} className={`text-md font-regular ${color}`}>
            {part}
          </span>
        ) : (
          part
        );
      })}
    </>
  );
}
