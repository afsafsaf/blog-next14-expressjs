'use client';

import { appconfig } from '@/utils/config';
import { Dice1, Trash2, icons } from 'lucide-react';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import { Button } from './ui/button';

interface PreviewImageProps {
  fileImages?: File[];
  images?: string[];
  onRemoveImage: (index: number) => void;
}
const PreviewImage: FC<PreviewImageProps> = ({
  onRemoveImage,
  fileImages,
  images,
}) => {
  const imageResults = useMemo(() => {
    if (fileImages) {
      return fileImages.map((image) => URL.createObjectURL(image));
    }

    return images;
  }, [fileImages, images]);
  return (
    <div className="flex gap-4 ">
      {imageResults?.map((image, index) => {
        return (
          <div
            key={index}
            className="relative h-[200px] w-[300px] rounded-md border"
          >
            <Image
              src={images ? `${appconfig.baseUrl}/` : image}
              alt="thumbnail"
              objectFit="contain"
              fill
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-5 -top-5"
              onClick={() => onRemoveImage(index)}
            >
              <Trash2 className="h-6 w-6 " />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewImage;
