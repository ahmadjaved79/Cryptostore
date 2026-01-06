import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import type { FileItem } from "../types/file";
import type { User } from "../types/user";
import { listFiles } from "../api/fileApi";
import { getUsers, updateUserRole, getAuditLogs } from "../api/adminApi";

import UploadBox from "../components/UploadBox";
import FileTable from "../components/FileTable";
import UserTable from "../components/UserTable";
import ShareModal from "../components/ShareModal";
import { downloadFile } from "../api/fileApi";


type Tab = "files" | "users" | "logs";

export default function Admin() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [activeTab, setActiveTab] = useState<Tab>("files");
  const [shareFile, setShareFile] = useState<FileItem | null>(null);
 const [files, setFiles] = useState<FileItem[]>([]);
const [users, setUsers] = useState<User[]>([]);
const [logs, setLogs] = useState<any[]>([]); // logs can stay any for now

  // 🔐 Protect admin route
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

 useEffect(() => {
  if (activeTab === "files") {
    console.log("ADMIN: fetching files");
    listFiles().then((data) => {
      console.log("ADMIN FILES:", data);
      setFiles(data);
    });
  }
}, [activeTab]);


  // 👤 Load users
  useEffect(() => {
    if (activeTab === "users") {
      getUsers().then(setUsers);
    }
  }, [activeTab]);

  // 🧾 Load audit logs
  useEffect(() => {
    if (activeTab === "logs") {
      getAuditLogs().then(setLogs);
    }
  }, [activeTab]);

  const handleRoleChange = async (userId: string, role: string) => {
    await updateUserRole(userId, role);
    const updated = await getUsers();
    setUsers(updated);
  };
  
  const handleDownload = async (file) => {
  const blob = await downloadFile(file.id);
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = file.filename;
  a.click();

  window.URL.revokeObjectURL(url);
};


  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 p-5 hidden md:block">
        <h2 className="text-green-400 font-bold text-xl mb-8">
          🔐 SecureVault
        </h2>

        <nav className="space-y-3">
          <button onClick={() => setActiveTab("files")}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === "files" ? "bg-green-500 text-black" : "hover:bg-gray-800"
            }`}>
            📁 Files
          </button>

          <button onClick={() => setActiveTab("users")}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === "users" ? "bg-green-500 text-black" : "hover:bg-gray-800"
            }`}>
            👤 Users
          </button>

          <button onClick={() => setActiveTab("logs")}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === "logs" ? "bg-green-500 text-black" : "hover:bg-gray-800"
            }`}>
            🧾 Audit Logs
          </button>
        </nav>

        <button
          onClick={logout}
          className="mt-10 w-full bg-red-500 py-2 rounded font-bold"
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">

        {/* FILES */}
        {activeTab === "files" && (
          <>
            <h1 className="text-2xl font-bold mb-4">📁 File Management</h1>
            <UploadBox onUploadSuccess={() => listFiles().then(setFiles)} />
           <FileTable
  files={files}
  role="admin"
  onDownload={handleDownload}
  onShare={(file) => setShareFile(file)}
/>
          </>
        )}

        {/* USERS */}
        {activeTab === "users" && (
          <>
            <h1 className="text-2xl font-bold mb-4">👤 User Management</h1>
            <UserTable users={users} onRoleChange={handleRoleChange} />
          </>
        )}

        {/* AUDIT LOGS */}
{activeTab === "logs" && (
  <>
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
      <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
        🧾 Audit Logs
      </h1>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative">
          <input
            type="search"
            placeholder="Search logs..."
            className="pl-9 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) =>
              (window.__auditQuery = e.target.value.toLowerCase())
            }
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

        {/* Export */}
        <button
          onClick={() => {
            const csv = [
              "user,action,file,time",
              ...logs.map(
                (l) =>
                  `${l.users?.email || "system"},${l.action},${
                    l.files?.filename || "-"
                  },${new Date(l.created_at).toLocaleString()}`
              ),
            ].join("\n");

            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "audit_logs.csv";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="px-3 py-2 rounded-lg bg-green-400 text-black text-sm font-medium"
        >
          Export CSV
        </button>
      </div>
    </div>

    {/* Table */}
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-800 text-gray-400">
          <tr>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Action</th>
            <th className="p-3 text-left">File</th>
            <th className="p-3 text-left">Time</th>
          </tr>
        </thead>

        <tbody>
          {logs
            .filter((log) => {
              const q = window.__auditQuery || "";
              if (!q) return true;
              return (
                log.users?.email?.toLowerCase().includes(q) ||
                log.action.toLowerCase().includes(q) ||
                log.files?.filename?.toLowerCase().includes(q)
              );
            })
            .map((log, i) => {
              const diff =
                Date.now() - new Date(log.created_at).getTime();
              const mins = Math.floor(diff / 60000);
              const timeAgo =
                mins < 1
                  ? "just now"
                  : mins < 60
                  ? `${mins} min ago`
                  : `${Math.floor(mins / 60)} hr ago`;

              return (
                <tr
                  key={i}
                  className={`border-t border-gray-800 hover:bg-gray-800 transition ${
                    i % 2 === 0 ? "" : "bg-white/5"
                  }`}
                >
                  <td className="p-3 text-gray-100">
                    {log.users?.email || "System"}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          log.action.includes("upload")
                            ? "bg-green-500/15 text-green-400"
                            : log.action.includes("download")
                            ? "bg-cyan-500/15 text-cyan-400"
                            : log.action.includes("delete")
                            ? "bg-red-500/15 text-red-400"
                            : log.action.includes("share")
                            ? "bg-purple-500/15 text-purple-400"
                            : "bg-gray-500/15 text-gray-300"
                        }`}
                    >
                      {log.action}
                    </span>
                  </td>

                  <td className="p-3 text-gray-200 truncate max-w-xs">
                    {log.files?.filename || "—"}
                  </td>

                  <td className="p-3 text-gray-400">
                    <div>{new Date(log.created_at).toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{timeAgo}</div>
                  </td>
                </tr>
              );
            })}

          {logs.length === 0 && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-400">
                No audit logs available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </>
)}


         {shareFile && (
  <ShareModal
    file={shareFile}
    onClose={() => setShareFile(null)}
  />
)}

      </main>
    </div>
  );
}
