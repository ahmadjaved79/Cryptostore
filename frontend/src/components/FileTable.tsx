// import type { FileItem } from "../types/file";

// interface Props {
//   files: FileItem[];
//   role: "admin" | "editor" | "viewer";
//   onDownload: (file: FileItem) => void;
//   onShare?: (file: FileItem) => void;
// }



// export default function FileTable({
//   files,
//   role,
//   onDownload,
//   onShare,
// }: Props) 
 
// {
//    if (!Array.isArray(files)) {
//   return (
//     <div className="text-gray-400 p-4">
//       No files available
//     </div>
//   );
// }

//   return (
//     <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden mt-5">
//       <table className="w-full text-sm">
//         <thead className="bg-gray-800 text-gray-400">
//           <tr>
//             <th className="p-3 text-left">File Name</th>
//             <th className="p-3 text-left">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {files.map((file) => (
//             <tr
//               key={file.id}
//               className="border-t border-gray-800 hover:bg-gray-800"
//             >
//                <td className="p-3">{file.filename}</td>

//               <td className="p-3 flex gap-3">
//                 <button
//                   onClick={() => onDownload(file)}
//                   className="text-cyan-400 hover:underline"
//                 >
//                   Download
//                 </button>

//                 {role === "admin" && onShare && (
//                   <button
//                     onClick={() => onShare(file)}
//                     className="text-green-400 hover:underline"
//                   >
//                     Share
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useMemo, useState } from "react";
import type { FileItem } from "../types/file";

interface Props {
  files: FileItem[];
  role: "admin" | "editor" | "viewer";
  onDownload: (file: FileItem) => void;
  onShare?: (file: FileItem) => void;
}

export default function AttractiveFileTable({
  files,
  role,
  onDownload,
  onShare,
}: Props) {
  const [query, setQuery] = useState("");

  if (!Array.isArray(files)) {
    return <div className="text-gray-400 p-4">No files available</div>;
  }

  const filteredFiles = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return files;
    return files.filter((f) => f.filename.toLowerCase().includes(q));
  }, [files, query]);

  return (
    <div className="max-w-5xl mx-auto mt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-100">Files</h3>

        {/* Search */}
        <div className="relative">
          <input
            type="search"
            placeholder="Search files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <svg
            className="w-4 h-4 absolute left-3 top-2.5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-400">
            <tr>
              <th className="p-3 text-left">File</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredFiles.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-6 text-center text-gray-400">
                  No matching files
                </td>
              </tr>
            ) : (
              filteredFiles.map((file, i) => (
                <tr
                  key={file.id}
                  className={`border-t border-gray-800 hover:bg-gray-800 transition ${
                    i % 2 === 0 ? "" : "bg-white/5"
                  }`}
                >
                  <td className="p-3 flex items-center gap-3">
                    {/* File icon */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"
                        />
                      </svg>
                    </div>

                    <div>
                      <div className="text-sm text-gray-100 truncate max-w-xs">
                        {file.filename}
                      </div>
                      <div className="text-xs text-gray-500">Encrypted file</div>
                    </div>
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onDownload(file)}
                        className="px-3 py-1.5 rounded-md text-xs font-medium border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10"
                      >
                        Download
                      </button>

                      {role === "admin" && onShare && (
                        <button
                          onClick={() => onShare(file)}
                          className="px-3 py-1.5 rounded-md text-xs font-medium border border-green-500/40 text-green-400 hover:bg-green-500/10"
                        >
                          Share
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
