'use client';

import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { saveImages, loadImages, getStorageSize } from '@/lib/indexedDB';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
}

export default function GallerySection() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load images from IndexedDB on mount
  useEffect(() => {
    const loadImagesFromDB = async () => {
      try {
        const images = await loadImages();
        setGalleryImages(images);
      } catch (error) {
        console.error('Failed to load gallery images:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadImagesFromDB();
  }, []);

  // Save images to IndexedDB whenever they change
  useEffect(() => {
    if (!isLoading) {
      const saveImagesToDB = async () => {
        try {
          await saveImages(galleryImages);
          const sizeInBytes = await getStorageSize();
          const sizeInMB = sizeInBytes / (1024 * 1024);
          
          if (sizeInMB > 100) {
            setStorageError(`Storage usage: ${sizeInMB.toFixed(2)}MB. Consider deleting some images.`);
          } else {
            setStorageError(null);
          }
        } catch (error) {
          console.error('Failed to save gallery images:', error);
          setStorageError('Failed to save images. Please try again.');
        }
      };
      saveImagesToDB();
    }
  }, [galleryImages, isLoading]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        // Check file size (limit to 15MB per image with IndexedDB)
        const maxSize = 20 * 1024 * 1024; // 15MB in bytes
        if (file.size > maxSize) {
          setStorageError(`Image "${file.name}" is too large. Maximum size is 15MB.`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage: GalleryImage = {
            id: `${Date.now()}-${Math.random()}`,
            url: event.target?.result as string,
            title: file.name,
          };
          setGalleryImages((prev) => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });

    // Reset input
    e.target.value = '';
  };

  const handleDeleteImage = (id: string) => {
    setGalleryImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full overflow-y-auto p-4 sm:p-6 md:p-8"
      style={{ backgroundColor: 'var(--section-bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: 'var(--heading-text)' }}
          >
            Gallery
          </motion.h2>

          {/* Upload Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleUploadClick}
            className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-4 sm:py-2 bg-[var(--macos-accent-blue)] text-white rounded-lg hover:brightness-110 transition-all"
          >
            <Upload size={14} className="sm:w-[18px] sm:h-[18px]" />
            <span className="text-xs sm:text-sm font-medium">Upload</span>
          </motion.button>
          
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Storage Error Alert */}
        {storageError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm"
          >
            {storageError}
          </motion.div>
        )}

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[var(--macos-accent-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p style={{ color: 'var(--secondary-text)' }}>Loading gallery...</p>
            </div>
          </div>
        ) : galleryImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * Math.min(index, 10) }}
                className="group relative aspect-square rounded-xl overflow-hidden bg-[var(--macos-sidebar)] border border-[var(--macos-border)] hover:border-[var(--macos-accent-blue)] transition-all cursor-pointer"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <X size={14} className="sm:w-4 sm:h-4" />
                </button>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <ImageIcon size={32} className="text-white dark:text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--macos-sidebar)' }}>
              <ImageIcon size={32} className="sm:w-10 sm:h-10" style={{ color: 'var(--muted-text)' }} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: 'var(--heading-text)' }}>
              No images yet
            </h3>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base" style={{ color: 'var(--body-text)' }}>
              Upload your first images to get started
            </p>
            <button 
              onClick={handleUploadClick}
              className="flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-[var(--macos-accent-blue)] text-white rounded-lg hover:brightness-110 transition-all"
            >
              <Upload size={16} className="sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">Upload Images</span>
            </button>
          </motion.div>
        )}

        {/* Image Count */}
        {galleryImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center text-[var(--macos-text-secondary)] text-sm"
          >
            {galleryImages.length} {galleryImages.length === 1 ? 'image' : 'images'} in gallery
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
