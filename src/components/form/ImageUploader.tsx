'use client';

import { ChangeEvent, useRef } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import Image from 'next/image';

export type ImageItem = {
  id: string;
  url: string;
  file?: File;
};

interface ImageUploaderProps {
  value: ImageItem[];
  onChange: (images: ImageItem[]) => void;
  maxImages?: number;
  accept?: string;
}

export default function ImageUploader({
  value,
  onChange,
  maxImages = 5,
  accept = 'image/*',
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const remainingSlots = maxImages - value.length;
    const filesToAdd = files.slice(0, remainingSlots);

    const newImages: ImageItem[] = filesToAdd.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      url: URL.createObjectURL(file),
      file,
    }));

    onChange([...value, ...newImages]);

    // Allows selecting the same file again
    e.target.value = '';
  };

  const handleDelete = (id: string) => {
    const imageToDelete = value.find((image) => image.id === id);

    if (imageToDelete?.file) {
      URL.revokeObjectURL(imageToDelete.url);
    }

    onChange(value.filter((image) => image.id !== id));
  };

  const canAddMore = value.length < maxImages;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {value.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-lg border bg-gray-100"
          >
            <Image
              width={500}
              height={500}
              src={image.url}
              alt="Uploaded image"
              className="h-full w-full object-cover"
            />

            {/* Delete button */}
            <div className="absolute inset-0 flex items-start justify-end bg-black/0 p-2 transition group-hover:bg-black/20">
              <button
                type="button"
                onClick={() => handleDelete(image.id)}
                className="rounded-full bg-white p-2 text-red-500 opacity-0 shadow transition hover:bg-red-50 group-hover:opacity-100"
                aria-label="Delete image"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {/* Add image button */}
        {canAddMore && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 transition hover:border-gray-400 hover:bg-gray-50"
          >
            <ImagePlus size={24} />
            <span className="text-sm">Add image</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleAddImages}
        className="hidden"
      />

      <div className="flex gap-6 items-center text-xs text-gray-500">
        <span>
          {value.length} / {maxImages} images
        </span>

        <span className="text-[10px]">PNG, JPG, JPEG</span>
      </div>
    </div>
  );
}
