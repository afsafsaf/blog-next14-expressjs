'use client';

import { axiosInstance } from '@/lib/axios';
import { Blog } from '@/types/blog.types';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const useGetBlog = (id: number) => {
  const [data, setData] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const GetBlog = async () => {
    try {
      const { data } = await axiosInstance.get<Blog>(`/blogs/${id}`);

      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        // todo : replace log with toast
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { blog: data, isLoading, refetch: GetBlog };
};

export default useGetBlog;
