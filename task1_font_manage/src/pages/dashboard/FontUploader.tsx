import { useState } from "react";

interface UploadedFont {
  name: string;
  url: string;
  styleElement: HTMLStyleElement;
}

const FontUploader = () => {
  const [fonts, setFonts] = useState<UploadedFont[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.name.toLowerCase().endsWith(".ttf")) {
      alert("Please upload a .ttf font file only.");
      return;
    }

    const fontName = file.name.replace(/\.ttf$/i, "");
    const fontUrl = URL.createObjectURL(file);

    // Create style element
    const styleElement = document.createElement("style");
    styleElement.type = "text/css";
    styleElement.appendChild(
      document.createTextNode(`
        @font-face {
          font-family: '${fontName}';
          src: url('${fontUrl}');
        }
      `)
    );

    document.head.appendChild(styleElement);

    setFonts((prev) => [...prev, { name: fontName, url: fontUrl, styleElement }]);

    // Reset input value so same file can be uploaded again if needed
    e.target.value = "";
  };

  const handleDelete = (name: string) => {
    setFonts((prev) => {
      const fontToDelete = prev.find((f) => f.name === name);
      if (fontToDelete) {
        // Remove style element safely
        if (fontToDelete.styleElement.parentNode) {
          fontToDelete.styleElement.parentNode.removeChild(fontToDelete.styleElement);
        }
        // Revoke URL
        URL.revokeObjectURL(fontToDelete.url);
      }
      return prev.filter((f) => f.name !== name);
    });
  };

  return (
    <div className=" h-100 bg-gray-100 flex flex-col items-center p-8">
      <label
        htmlFor="file-upload"
        className="
          group
          cursor-pointer
          border-2 border-dashed border-gray-300 rounded-xl
          p-10
          w-full max-w-md
          text-center bg-white shadow-md
          hover:border-blue-500 hover:bg-blue-50
          focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-300
          transition
          select-none
          flex flex-col items-center justify-center space-y-4
          mb-10
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14 text-gray-400 group-hover:text-blue-600 transition-colors duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0 0l-3-3m3 3l3-3m-3-6v4"
          />
        </svg>

        <p className="text-lg font-semibold text-gray-700 group-hover:text-blue-700 transition-colors duration-300">
          Click or drag your .ttf font here
        </p>
        <p className="text-sm text-gray-400">Only TTF font files allowed</p>

        <input
          type="file"
          id="file-upload"
          accept=".ttf"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-6 border-b pb-2">Uploaded Fonts</h3>

        {fonts.length === 0 ? (
          <p className="text-gray-500 text-center">No fonts uploaded yet.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">Font Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Preview</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fonts.map((font) => (
                <tr key={font.name} className="hover:bg-gray-100 transition-colors">
                  <td className="border border-gray-300 px-4 py-3">{font.name}</td>
                  <td
                    className="border border-gray-300 px-4 py-3"
                    style={{ fontFamily: font.name }}
                  >
                    The quick brown fox jumps over the lazy dog.
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(font.name)}
                      className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-3 py-1
                        rounded
                        text-sm
                        transition
                      "
                      aria-label={`Delete ${font.name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FontUploader;
