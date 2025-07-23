import type { Dispatch, SetStateAction } from "react";

type props = {
  setLang: Dispatch<SetStateAction<"en" | "th">>;
  lang: string;
};
const LanguageToggle = ({ setLang, lang }: props) => {
  return (
    <div className="hidden sm:flex gap-2 justify-end-safe">
      <button
        onClick={() => setLang("th")}
        className={`px-2 py-1 text-sm font-medium rounded  ${
          lang === "th" ? "bg-blue-600 text-white" : "text-gray-300"
        }`}
      >
        ไทย
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 text-sm font-medium rounded ${
          lang === "en" ? "bg-blue-600 text-white" : "text-gray-300"
        }`}
      >
        ENG
      </button>
    </div>
  );
};
export default LanguageToggle;
