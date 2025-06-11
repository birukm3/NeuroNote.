import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { NavBarDash } from "../components/NavbarDash";

export const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [uid, setUid] = useState(null);

  const navigate = useNavigate();

  // Ensure Firebase auth is ready
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        navigate("/login"); 
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setErrorMsg("");
  };

  const handleUpload = async () => {
    if (!selectedFile) return setErrorMsg("Please select a PDF file.");
    if (!className.trim()) return setErrorMsg("Please enter a class name.");

    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("class", className);
    formData.append("userID", uid);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5050/generate", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Upload failed");

      navigate("/flashcards", {
        state: {
          flashcards: result,
          className,
        },
      });
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBarDash />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center mb-4">
          Upload Your Lecture Notes
        </h1>
        <p className="text-gray-300 text-center mb-10">
          Upload your notes or transcripts as PDFs. We'll generate flashcards from them instantly.
        </p>

        <div className="bg-slate-700 border-2 border-dashed border-blue-500 hover:border-blue-300 p-10 rounded-xl">
          <div className="flex flex-col items-center space-y-4 text-center">
            <CloudArrowUpIcon className="h-16 w-16 text-blue-500" />
            <p className="text-xl font-semibold">Drag & drop your PDF here</p>
            <p className="text-sm text-gray-400">or click to browse</p>

            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="text-white mt-4"
            />

            <div className="w-full flex flex-col items-center mt-4">
              <label htmlFor="classInput" className="text-sm text-gray-400 mb-1">
                Class name
              </label>
              <input
                id="classInput"
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="e.g. Biology 101"
                className="w-64 bg-gray-800 text-white border border-blue-500 rounded px-4 py-2"
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-6 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded text-white font-semibold"
            >
              {loading ? "Generating..." : "Generate Flashcards"}
            </button>

            <p className="text-xs text-gray-400 mt-2">Only PDF files are supported.</p>
            {errorMsg && <p className="text-red-400">{errorMsg}</p>}
          </div>
        </div>

        <div className="mt-16 text-center space-y-4">
          <h2 className="text-2xl font-bold">Why Upload?</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            NeuroNote turns hours of lecture content into efficient flashcards—letting you study smarter and faster.
          </p>
        </div>
      </div>
    </div>
  );
};
