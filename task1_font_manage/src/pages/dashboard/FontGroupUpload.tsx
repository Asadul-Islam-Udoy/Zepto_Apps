import React, { useState } from "react";

interface UploadedFont {
  id: string;
  name: string;
  url: string;
  styleElement: HTMLStyleElement;
}

interface FontRow {
  id: string;
  selectedFontId: string;
  size: number;
  priceChange: number;
}

interface FontGroup {
  id: string;
  fonts: { name: string; size: number; priceChange: number }[];
}

const FontUploaderWithGroup = () => {
  const [fonts, setFonts] = useState<UploadedFont[]>([]);
  const [rows, setRows] = useState<FontRow[]>([
    { id: crypto.randomUUID(), selectedFontId: "", size: 12, priceChange: 0 },
  ]);
  const [groups, setGroups] = useState<FontGroup[]>([]);

  const addFontFace = (fontName: string, fontUrl: string): HTMLStyleElement => {
    const styleEl = document.createElement("style");
    styleEl.type = "text/css";
    styleEl.appendChild(
      document.createTextNode(`
        @font-face {
          font-family: '${fontName}';
          src: url('${fontUrl}');
        }
      `)
    );
    document.head.appendChild(styleEl);
    return styleEl;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFonts: UploadedFont[] = [];

    Array.from(files).forEach((file) => {
      if (!file.name.toLowerCase().endsWith(".ttf")) {
        alert(`Only .ttf files allowed. Ignored: ${file.name}`);
        return;
      }
      const fontName = file.name.replace(/\.ttf$/i, "");
      const fontUrl = URL.createObjectURL(file);
      const styleElement = addFontFace(fontName, fontUrl);

      newFonts.push({
        id: crypto.randomUUID(),
        name: fontName,
        url: fontUrl,
        styleElement,
      });
    });

    setFonts((prev) => [...prev, ...newFonts]);
    e.target.value = "";
  };

  const updateRow = (id: string, field: keyof Omit<FontRow, "id">, value: any) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: crypto.randomUUID(), selectedFontId: "", size: 12, priceChange: 0 },
    ]);
  };

  const removeRow = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const canSubmit = rows.filter((r) => r.selectedFontId !== "").length >= 2;

  const handleSubmit = () => {
    if (!canSubmit) {
      alert("Please select at least two fonts before submitting.");
      return;
    }

    const groupFonts = rows
      .filter((r) => r.selectedFontId !== "")
      .map((r) => {
        const f = fonts.find((f) => f.id === r.selectedFontId);
        return {
          name: f?.name || "Unknown",
          size: r.size,
          priceChange: r.priceChange,
        };
      });

    setGroups((prev) => [
      ...prev,
      { id: crypto.randomUUID(), fonts: groupFonts },
    ]);

    // Reset rows
    setRows([{ id: crypto.randomUUID(), selectedFontId: "", size: 12, priceChange: 0 }]);
  };

  const deleteGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const editGroup = (id: string) => {
    const group = groups.find((g) => g.id === id);
    if (!group) return;
    setRows(
      group.fonts.map((f) => {
        const font = fonts.find((font) => font.name === f.name);
        return {
          id: crypto.randomUUID(),
          selectedFontId: font?.id || "",
          size: f.size,
          priceChange: f.priceChange,
        };
      })
    );
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="h-100 bg-gray-50 p-8 flex flex-col items-center gap-10">
      {/* Upload */}
      <label
        htmlFor="font-upload"
        className="cursor-pointer border-4 border-dashed border-gray-300 rounded-xl p-6 w-full max-w-md text-center bg-white hover:border-blue-500 hover:bg-blue-50 transition"
      >
        <input
          id="font-upload"
          type="file"
          multiple
          accept=".ttf"
          className="hidden"
          onChange={handleFileChange}
        />
        <p className="font-semibold">Upload .ttf Fonts</p>
      </label>

      {/* Font Group Editor */}
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Font Group Editor</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Font</th>
              <th className="border px-2 py-1">Preview</th>
              <th className="border px-2 py-1">Size</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const font = fonts.find((f) => f.id === row.selectedFontId);
              return (
                <tr key={row.id}>
                  <td className="border px-2 py-1">
                    <select
                      className="w-full border rounded"
                      value={row.selectedFontId}
                      onChange={(e) =>
                        updateRow(row.id, "selectedFontId", e.target.value)
                      }
                    >
                      <option value="">-- Select --</option>
                      {fonts.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td
                    className="border px-2 py-1"
                    style={{
                      fontFamily: font?.name ?? "inherit",
                      fontSize: row.size,
                    }}
                  >
                    {font?.name || "---"}
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      value={row.size}
                      onChange={(e) =>
                        updateRow(row.id, "size", Number(e.target.value))
                      }
                      className="w-full border rounded"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      value={row.priceChange}
                      onChange={(e) =>
                        updateRow(row.id, "priceChange", Number(e.target.value))
                      }
                      className="w-full border rounded"
                    />
                  </td>
                  <td className="border px-2 py-1 text-center">
                    {rows.length > 1 && (
                      <button
                        onClick={() => removeRow(row.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button
            onClick={addRow}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Row
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`px-4 py-2 rounded text-white ${
              canSubmit
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit Group
          </button>
        </div>
      </div>

      {/* Created Groups */}
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Created Font Groups</h2>
        {groups.length === 0 ? (
          <p className="text-gray-500">No groups created yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Group Name</th>
                <th className="border px-2 py-1">Fonts</th>
                <th className="border px-2 py-1">Count</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g, i) => (
                <tr key={g.id}>
                  <td className="border px-2 py-1">Group {i + 1}</td>
                  <td className="border px-2 py-1">
                    {g.fonts.map((f) => f.name).join(", ")}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    {g.fonts.length}
                  </td>
                  <td className="border px-2 py-1 text-center space-x-2">
                    <button
                      onClick={() => editGroup(g.id)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteGroup(g.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
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

export default FontUploaderWithGroup;
