"use client";
import { useState, useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase"; // Adjust the import path as necessary
import { url } from "inspector";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first!");
    setStatus("Uploading...");

    try {
      const base64Image = await fileToBase64(file);
      setPreview(base64Image);
      const imageRef = await addDoc(collection(db, `images`), {
        image: base64Image,
        uploadedAt: new Date().toISOString(),
      });
      const res = await fetch("/vibe_check", {
        method: "POST",
        body: JSON.stringify({ imageId: base64Image }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStatus("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      setStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-around p-24">
      {"WELCOME TO VIBECHECK!"}

      <div>
        {
          "This simple app lets you upload a photo or use your webcam to capture an image of yourself or a group. We'll analyze the vibe of your photo and recommend music on Spotify that matches your mood!"
        }
      </div>

      <div>
        <label htmlFor="fileInput">Upload an image:</label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              setFile(selectedFile);
              setPreview(URL.createObjectURL(selectedFile));
            }
          }}
        />
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={handleUpload}
        >
          Upload
        </button>
        <p>{status}</p>
        {preview && <img src={preview} width={200} alt="Preview" />}
      </div>
    </div>
  );
}
