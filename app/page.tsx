"use client";
import { useState, useRef } from "react";
import { database } from "../firebase";
import { ref, set } from "firebase/database";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string); // cast here
      reader.onerror = (err) => reject(err);
    });
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    setStatus("Uploading...");

    try {
      const base64Image = await fileToBase64(file);
      setPreview(base64Image);
      const imageRef = ref(database, `images/${Date.now()}`);

      await set(imageRef, {
        image: base64Image,
        uploadedAt: new Date().toISOString(),
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
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button onClick={handleUpload}>Upload</button>
        <p>{status}</p>
        {preview && <img src={preview} width={200} alt="Preview" />}
      </div>
    </div>
  );
}
