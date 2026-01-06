// import type { User, Role } from "../types/user";

// interface Props {
//   users: User[];
//   onRoleChange: (id: string, role: Role) => void;
// }

// export default function UserTable({ users, onRoleChange }: Props) {
//   return (
//     <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
//       <table className="w-full text-sm">
//         <thead className="bg-gray-800 text-gray-400">
//           <tr>
//             <th className="p-3 text-left">Email</th>
//             <th className="p-3 text-left">Role</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((user) => (
//             <tr
//               key={user.id}
//               className="border-t border-gray-800 hover:bg-gray-800"
//             >
//               <td className="p-3">{user.email}</td>

//               <td className="p-3">
//                 <select
//                   value={user.role}
//                   onChange={(e) =>
//                     onRoleChange(user.id, e.target.value as Role)
//                   }
//                   className="bg-black border border-gray-700 p-1 rounded"
//                 >
//                   <option value="admin">Admin</option>
//                   <option value="editor">Editor</option>
//                   <option value="viewer">Viewer</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }




import React, { useMemo, useState, useEffect } from "react";
import type { User, Role } from "../types/user";

interface Props {
  users: User[];
  onRoleChange: (id: string, role: Role) => void | Promise<void>;
}

export default function AttractiveUserTable({ users, onRoleChange }: Props) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"email" | "role">("email");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  // Keep a small local copy so the UI feels snappy while parent persists changes.
  const [localUsers, setLocalUsers] = useState<User[]>(users);
  useEffect(() => setLocalUsers(users), [users]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = localUsers.filter((u) => {
      if (!q) return true;
      return (
        (u.email || "").toLowerCase().includes(q) ||
        (u.name || "").toLowerCase().includes(q) ||
        (u.role || "").toLowerCase().includes(q)
      );
    });

    arr = arr.sort((a, b) => {
      const aKey = (sortKey === "email" ? a.email : a.role) || "";
      const bKey = (sortKey === "email" ? b.email : b.role) || "";
      if (aKey === bKey) return 0;
      if (sortDir === "asc") return aKey > bKey ? 1 : -1;
      return aKey > bKey ? -1 : 1;
    });

    return arr;
  }, [localUsers, query, sortKey, sortDir]);

  const initials = (u: User) => {
    if (u.name) {
      return u.name
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }
    return (u.email || "").split("@")[0].slice(0, 2).toUpperCase();
  };

  const handleRoleChange = async (id: string, role: Role) => {
    setLoadingMap((s) => ({ ...s, [id]: true }));
    // optimistic UI
    setLocalUsers((prev) => prev.map((p) => (p.id === id ? { ...p, role } : p)));

    try {
      // allow onRoleChange to be sync or async
      await Promise.resolve(onRoleChange(id, role));
    } catch (err) {
      // rollback on error
      setLocalUsers((prev) => prev.map((p) => (p.id === id ? users.find((x) => x.id === id) || p : p)));
      alert("Failed to update role — try again");
    } finally {
      setLoadingMap((s) => ({ ...s, [id]: false }));
    }
  };

  const toggleSort = (key: "email" | "role") => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h3 className="text-lg font-semibold text-gray-100">Users</h3>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="search"
              placeholder="Search email, name or role..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
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

          <button
            onClick={() => {
              // show a quick CSV export (client-side)
              const csv = ["email,name,role", ...localUsers.map((u) => `${u.email},${(u as any).name || ""},${u.role}`)].join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "users.csv";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-3 py-2 rounded-lg bg-green-400 text-black font-medium text-sm"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-400">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left cursor-pointer" onClick={() => toggleSort("email")}
              >
                Email
                <span className="ml-2 text-xs text-gray-400">{sortKey === "email" ? (sortDir === "asc" ? "↑" : "↓") : ""}</span>
              </th>
              <th className="p-3 text-left cursor-pointer" onClick={() => toggleSort("role")}
              >
                Role
                <span className="ml-2 text-xs text-gray-400">{sortKey === "role" ? (sortDir === "asc" ? "↑" : "↓") : ""}</span>
              </th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">No users found</td>
              </tr>
            ) : (
              visible.map((user, i) => (
                <tr
                  key={user.id}
                  className={`border-t border-gray-800 hover:bg-gray-800 ${i % 2 === 0 ? "bg-opacity-0" : "bg-white/1"}`}
                >
                  <td className="p-3 flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-black font-semibold">
                      {initials(user)}
                    </div>
                    <div>
                      <div className="text-sm text-gray-100">{user.name || user.email.split("@")[0]}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="inline-block px-2 py-1 rounded-full text-xs font-medium" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.03)'}}>
                      {user.role}
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                        className="bg-gray-800 border border-gray-700 p-2 rounded text-sm"
                        disabled={!!loadingMap[user.id]}
                      >
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                      </select>

                      {loadingMap[user.id] && (
                        <svg className="w-4 h-4 animate-spin text-gray-300" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth={3} stroke="currentColor" strokeDasharray="31.4 31.4" strokeLinecap="round" fill="none" />
                        </svg>
                      )}
                    </div>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(user.email);
                      }}
                      className="px-3 py-1 rounded-md border border-gray-700 text-xs"
                      title="Copy email"
                    >
                      Copy
                    </button>
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
