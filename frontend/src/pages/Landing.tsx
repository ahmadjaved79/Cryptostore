// import { useNavigate } from "react-router-dom";

// export default function Landing() {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-gray-950 text-white min-h-screen">

//       {/* ================= HERO ================= */}
//       <section className="relative overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

//           {/* TEXT */}
//           <div>
//             <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
//               Crypto<span className="text-green-400">Store</span>
//             </h1>

//             <p className="mt-6 text-gray-400 text-lg">
//               End‑to‑end encrypted file storage with role‑based access,
//               secure sharing, and full audit logging.
//             </p>

//             <div className="mt-8 flex gap-4">
//               <button
//                 onClick={() => navigate("/signup")}
//                 className="bg-green-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-green-400 transition"
//               >
//                 Get Started
//               </button>

//               <button
//                 onClick={() => navigate("/login")}
//                 className="border border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-800 transition"
//               >
//                 Login
//               </button>
//             </div>
//           </div>

//           {/* IMAGE */}
//           <div className="relative">
//             <img
//               src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7"
//               alt="Cyber Security"
//               className="rounded-2xl shadow-2xl border border-gray-800"
//             />
//           </div>
//         </div>
//       </section>

//       {/* ================= FEATURES ================= */}
//       <section className="py-20 bg-gray-900">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             Why SecureVault?
//           </h2>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "End‑to‑End Encryption",
//                 desc: "Files are encrypted before storage using AES‑256."
//               },
//               {
//                 title: "Role‑Based Access",
//                 desc: "Admin, Editor, Viewer with strict permissions."
//               },
//               {
//                 title: "Audit Logs",
//                 desc: "Every upload, download, and share is tracked."
//               }
//             ].map((f) => (
//               <div
//                 key={f.title}
//                 className="bg-gray-950 border border-gray-800 p-6 rounded-xl hover:border-green-500 transition"
//               >
//                 <h3 className="text-xl font-bold text-green-400 mb-2">
//                   {f.title}
//                 </h3>
//                 <p className="text-gray-400">{f.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= HOW IT WORKS ================= */}
//       <section className="py-20">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold mb-12">How It Works</h2>

//           <div className="grid md:grid-cols-4 gap-6">
//             {[
//               "Login securely",
//               "Upload encrypted files",
//               "Share with permissions",
//               "Audit every action"
//             ].map((step, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-900 border border-gray-800 p-6 rounded-xl"
//               >
//                 <div className="text-green-400 text-2xl font-bold mb-2">
//                   {i + 1}
//                 </div>
//                 <p className="text-gray-400">{step}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= ROLES ================= */}
//       <section className="py-20 bg-gray-900">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             Role‑Based Dashboards
//           </h2>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 role: "Admin",
//                 desc: "Manage users, assign roles, view audit logs."
//               },
//               {
//                 role: "Editor",
//                 desc: "Upload, download, and share encrypted files."
//               },
//               {
//                 role: "Viewer",
//                 desc: "Access only shared files securely."
//               }
//             ].map((r) => (
//               <div
//                 key={r.role}
//                 className="bg-gray-950 border border-gray-800 p-6 rounded-xl"
//               >
//                 <h3 className="text-xl font-bold text-green-400 mb-2">
//                   {r.role}
//                 </h3>
//                 <p className="text-gray-400">{r.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= CTA ================= */}
//       <section className="py-24 text-center">
//         <h2 className="text-4xl font-bold mb-6">
//           Secure Your Files Today
//         </h2>

//         <p className="text-gray-400 mb-8">
//           Built for privacy, compliance, and enterprise‑grade security.
//         </p>

//         <button
//           onClick={() => navigate("/signup")}
//           className="bg-green-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-400 transition"
//         >
//           Get Started Now
//         </button>
//       </section>

//       {/* ================= FOOTER ================= */}
//       <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
//         © 2026 SecureVault • End‑to‑End Encrypted File System
//       </footer>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-950 text-white min-h-screen overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative">
        {/* Glow background */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-500/20 blur-[120px]" />
        <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-emerald-400/10 blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Crypto<span className="text-green-400">Store</span>
            </h1>

            <p className="mt-6 text-gray-400 text-lg max-w-xl">
              Military-grade encrypted cloud storage designed for
              <span className="text-green-400 font-medium"> privacy-first </span>
              teams and enterprises.
            </p>

            <div className="mt-10 flex gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="bg-green-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-green-400 transition shadow-lg shadow-green-500/20"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/login")}
                className="border border-gray-700 px-8 py-4 rounded-xl hover:bg-gray-800 transition"
              >
                Login
              </button>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              🔒 Zero-trust • AES-256 • Audit-ready
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7"
              alt="Crypto Security"
              className="rounded-3xl shadow-2xl border border-gray-800"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Why CryptoStore?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "End-to-End Encryption",
                desc: "Files are encrypted client-side using AES-256 before reaching the server."
              },
              {
                title: "Role-Based Security",
                desc: "Fine-grained Admin, Editor, and Viewer permissions."
              },
              {
                title: "Audit-Grade Logging",
                desc: "Every action is tracked for compliance and transparency."
              }
            ].map((f) => (
              <div
                key={f.title}
                className="bg-gray-950/80 backdrop-blur border border-gray-800 p-8 rounded-2xl hover:border-green-500 transition"
              >
                <h3 className="text-xl font-bold text-green-400 mb-3">
                  {f.title}
                </h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-14">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Authenticate securely",
              "Encrypt & upload files",
              "Share with permissions",
              "Audit every action"
            ].map((step, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:-translate-y-1 transition"
              >
                <div className="text-green-400 text-3xl font-extrabold mb-3">
                  {i + 1}
                </div>
                <p className="text-gray-400">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ROLES ================= */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Role-Based Dashboards
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                role: "Admin",
                desc: "User management, role assignment, and audit oversight."
              },
              {
                role: "Editor",
                desc: "Upload, download, and share encrypted assets."
              },
              {
                role: "Viewer",
                desc: "Read-only access to authorized files."
              }
            ].map((r) => (
              <div
                key={r.role}
                className="bg-gray-950/80 backdrop-blur border border-gray-800 p-8 rounded-2xl"
              >
                <h3 className="text-xl font-bold text-green-400 mb-3">
                  {r.role}
                </h3>
                <p className="text-gray-400">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/5 blur-2xl" />

        <div className="relative">
          <h2 className="text-5xl font-bold mb-6">
            Secure Your Data. Own Your Privacy.
          </h2>

          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Enterprise-grade cryptographic storage built for modern security needs.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="bg-green-500 text-black px-10 py-5 rounded-2xl font-bold text-lg hover:bg-green-400 transition shadow-xl shadow-green-500/30"
          >
            Start Securing Files
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © 2026 CryptoStore • Zero-Trust Encrypted Storage
      </footer>
    </div>
  );
}
