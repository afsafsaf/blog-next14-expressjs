'use client';

import Dropzone from '@/components/Dropzone';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import PreviewImage from '@/components/PreviewImage';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import useCreateBlog from '@/hooks/api/blog/useCreateBlog';
import { useAppSelector } from '@/redux/hooks';
import { IFormCreateBlog } from '@/types/blog.types';
import { useFormik } from 'formik';
import { validationSchema } from './validationSchema';

const CreateBog = () => {
  const { createBlog } = useCreateBlog();

  const { id } = useAppSelector((state) => state.user);

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    errors,
    values,
    setFieldValue,
  } = useFormik<IFormCreateBlog>({
    initialValues: {
      title: '',
      category: '',
      thumbnail: [],
      description: '',
      content: '',
    },
    validationSchema,
    onSubmit: (values) => {
      createBlog({ ...values, userId: id });
    },
  });
  console.log(values);

  return (
    <>
      <main className="container mx-auto px-4">
        <form onSubmit={handleSubmit}>
          <div className="mx-auto flex max-w-5xl flex-col gap-4">
            <FormInput
              name="title"
              type="text"
              label="Title"
              placeholder="Title"
              value={values.title}
              error={errors.title}
              isError={!!touched.title && !!errors.title}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <FormInput
              name="category"
              type="text"
              label="Category"
              placeholder="Category"
              value={values.category}
              error={errors.category}
              isError={!!touched.category && !!errors.category}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <FormTextArea
              name="description"
              label="description"
              placeholder="Description"
              value={values.description}
              error={errors.description}
              isError={!!touched.description && !!errors.description}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <PreviewImage
              onRemoveImage={(idx: number) =>
                setFieldValue('thumbnail', values.thumbnail.toSpliced(idx, 1))
              }
              fileImages={values.thumbnail}
            />
            <Dropzone
              isError={Boolean(errors.thumbnail)}
              label="Thumbnail"
              onDrop={(files) =>
                setFieldValue('thumbnail', [
                  ...values.thumbnail,
                  ...files.map((file) => file),
                ])
              }
            />
            <RichTextEditor
              onChange={(html: string) => setFieldValue('content', html)}
              label="Content"
              value={values.content}
              isError={Boolean(errors.content)}
            />
            <div className="mb-4 flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default CreateBog;
