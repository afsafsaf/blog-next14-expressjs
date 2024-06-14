'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import React from 'react';

import { validationSchema } from './validationSchema';
import useForgotPassword from '@/hooks/api/auth/useForgotPassword';
import { Loader2 } from 'lucide-react';

const ForgetPassword = () => {
  const { forgotPassword, isLoading } = useForgotPassword();
  const { errors, handleBlur, handleSubmit, handleChange, touched, values } =
    useFormik({
      initialValues: {
        email: '',
      },
      validationSchema,
      onSubmit: ({ email }) => {
        forgotPassword(email);
      },
    });
  return (
    <>
      <main className="container mx-auto h-[90vh] px-4">
        <div className="mt-40 flex justify-center">
          <Card className="w-[450px]">
            <CardHeader>
              <CardTitle className="text-center text-3xl text-primary">
                Forgot Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <FormInput
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    value={values.email}
                    error={errors.email}
                    isError={!!touched.email && !!errors.email}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </div>

                <Button className="mt-6 w-full" disabled={isLoading}>
                  {/* Kalau sedang loading, maka buttonnya akan ke desible */}
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default ForgetPassword;
