import React, { useEffect, useRef } from "react";

interface Prop {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ query, setQuery }: Prop) => {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(
    function () {
      function callBack(e: Event) {
        if (!(e instanceof KeyboardEvent)) return;
        if (document.activeElement === inputEl.current) return;
        if (e.code === "Enter") {
          inputEl.current?.focus();
          setQuery("");
        }
      }
      document.addEventListener("keydown", callBack);
      return () => document.addEventListener("keydown", callBack);
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default Search;
