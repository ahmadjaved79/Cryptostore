import React, { useRef, useState } from "react";
import { uploadFile } from "../api/fileApi";

interface UploadBoxProps {
  onUploadSuccess?: () => void;
}

// Default export React component (TypeScript + Tailwind)
export default function AttractiveUploadBox({ onUploadSuccess }: UploadBoxProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const humanFileSize = (size: number) => {
    if (size === 0) return "0 B";
    const i = Math.floor(Math.log(size) / Math.log(1024));
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    return (size / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
  };

  const handleChooseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setSuccess(false);
  };

  const resetInput = () => {
    setFile(null);
    // Clearing the native file input is required to return the UI to the "Choose file" state.
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file first");
      return;
    }

    try {
      setLoading(true);
      await uploadFile(file); // <-- your backend call
      onUploadSuccess?.();
      setSuccess(true);

      // Reset so input text goes back to "Choose file" and button returns to primary state
      resetInput();

      // small success indicator that fades after a moment
      setTimeout(() => setSuccess(false), 2200);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Drag-and-drop handlers (simple)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    if (f) {
      setFile(f);
      setSuccess(false);
    }
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Left: Drop zone / chooser */}
          <div className="flex-1 w-full">
            <div className="relative rounded-xl border-2 border-dashed border-gray-700 p-4 h-36 flex items-center justify-center">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />

              {!file ? (
                <div className="text-center">
                  <svg
                    className="mx-auto mb-2 w-10 h-10 opacity-80"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 5 17 10" />
                    <line x1="12" y1="5" x2="12" y2="19" />
                  </svg>
                  <div className="text-sm text-gray-300">Drag & drop a file here</div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <button
                      onClick={handleChooseClick}
                      className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-gray-700 hover:bg-white/8 transition text-sm"
                    >
                      Choose file
                    </button>
                    <span className="text-xs text-gray-500">or click to browse</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/5 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-100 truncate" style={{ maxWidth: 220 }}>
                        {file.name}
                      </div>
                      <div className="text-xs text-gray-400">{humanFileSize(file.size)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        // allow user to pick another file
                        resetInput();
                        fileInputRef.current?.click();
                      }}
                      className="px-3 py-1 rounded-md border border-gray-700 text-sm bg-white/5 hover:bg-white/6"
                    >
                      Change
                    </button>
                    <button
                      onClick={() => setFile(null)}
                      className="px-3 py-1 rounded-md border border-red-700 text-sm bg-red-600/10 text-red-300"
                      title="Remove file"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* subtle hints */}
            <div className="mt-2 text-xs text-gray-500">Accepted: any — Max recommended 50MB</div>
          </div>

          {/* Right: Upload action */}
          <div className="w-full sm:w-44 flex-shrink-0">
            <button
              onClick={handleUpload}
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-black transition disabled:opacity-60 ${
                success ? "bg-emerald-400" : "bg-green-400"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth={4} stroke="currentColor" strokeDasharray="31.4 31.4" strokeLinecap="round" fill="none" />
                  </svg>
                  <span className="text-sm">Encrypting 🔗</span>
                </>
              ) : success ? (
                <span>Uploaded ✓</span>
              ) : (
                <span>Upload File</span>
              )}
            </button>

            {/* small 'Choose' quick action for accessibility */}
            <button
              onClick={handleChooseClick}
              className="mt-3 w-full text-xs text-gray-300 underline"
            >
              Choose file
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
