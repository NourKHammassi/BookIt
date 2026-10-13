"use client";

import { useState, useRef } from "react";

type Props = {
  images: string[];
  onChange: (images: string[]) => void;
  max?: number;
};

export default function ImageUploader({ images, onChange, max = 5 }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url as string;
  }

  async function handleFiles(files: FileList | File[]) {
    const fileArray = Array.from(files).slice(0, max - images.length);
    if (fileArray.length === 0) return;

    setUploading(true);
    try {
      const urls = await Promise.all(fileArray.map(uploadFile));
      onChange([...images, ...urls]);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((url, i) => (
            <div key={i} className="relative group aspect-[3/2] rounded-xl overflow-hidden bg-[#1A3654]/5">
              <img
                src={url}
                alt={`Property ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-[#1A3654]/70 hover:bg-[#C4503D] text-white rounded-full text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-all cursor-pointer flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop Zone */}
      {images.length < max && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl px-4 py-6 text-center cursor-pointer transition-colors ${
            dragOver
              ? "border-[#2B5EA7] bg-[#2B5EA7]/5"
              : "border-[#1A3654]/10 hover:border-[#2B5EA7]/30 bg-[#FAF7F2]/40"
          }`}
        >
          {uploading ? (
            <p className="text-[12px] font-body text-[#2B5EA7] font-medium">
              Uploading...
            </p>
          ) : (
            <>
              <svg className="mx-auto mb-2 w-6 h-6 text-[#1A3654]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" />
              </svg>
              <p className="text-[12px] font-body text-[#1A3654]/40">
                Drop images here or <span className="text-[#2B5EA7] font-medium">browse</span>
              </p>
              <p className="text-[10px] font-body text-[#1A3654]/20 mt-1">
                {images.length}/{max} photos
              </p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </div>
      )}
    </div>
  );
}