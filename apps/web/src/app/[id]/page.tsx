'use client';

import Markdown from '@/components/Markdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useGetBlog from '@/hooks/api/blog/useGetBlog';
import { format } from 'date-fns';
import { Share2 } from 'lucide-react';
import Image from 'next/image';
import SkeletonBlogDetail from './components/SkeletonBlogDetail';
import { notFound } from 'next/navigation';
import { appconfig } from '@/utils/config';

const BlogDetail = ({ params }: { params: { id: string } }) => {
  const { blog, isLoading } = useGetBlog(Number(params.id));
  console.log(blog);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <SkeletonBlogDetail />;
      </div>
    );
  }

  if (!blog) {
    //Jika tidak diberi kondisi maka akan error karena blog harus ada isinya
    return notFound();
  }

  return (
    <>
      <main className="container mx-auto px-4">
        <section className="mb-4">
          <div className="mb-4 space-y-1.5">
            <Badge variant="outline" className="rounded-sm bg-green-100">
              {blog.category}
            </Badge>

            <h1 className="text-2xl font-semibold">{blog.title}</h1>
            <div className="flex mb-2 items-center justify-between">
              <p className="text-sm font-light italic">
                {format(new Date(blog.createdAt), 'dd MMMM yyyy')} -{' '}
                {blog.user.fullName}
              </p>
              <Button variant="outline" size="icon">
                <Share2 size="20px" />
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] ">
            <Image
              fill
              src={`${appconfig.baseUrl}/assets${blog.thumbnail}`}
              alt={`${appconfig.baseUrl}/assets${blog.thumbnail}`}
              className="object-cover bg-slate-200"
            ></Image>
          </div>
        </section>

        <section>
          {/* render markdown */}

          <Markdown content={blog.content} />
        </section>
      </main>
    </>
  );
};

export default BlogDetail;
