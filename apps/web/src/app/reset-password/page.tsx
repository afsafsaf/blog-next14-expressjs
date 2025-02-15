'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import React from 'react';

import { Loader2 } from 'lucide-react';
import { validationSchema } from './validationSchema';
import { notFound, useSearchParams } from 'next/navigation';
import useResetPassword from '@/hooks/api/auth/useResetPassword';

const ResetPassword = () => {
  // untuk menangkap query kita menggunakan serachparams
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); //mencari params yang tulisannya token

  if (!token) {
    notFound();
  }
  const { resetPassword, isLoading } = useResetPassword();
  const { errors, handleBlur, handleSubmit, handleChange, touched, values } =
    useFormik({
      initialValues: {
        password: '',
        confirmPassword: '',
      },
      validationSchema,
      onSubmit: ({ password }) => {
        resetPassword(password, token);
      },
    });
  return (
    <>
      <main className="container mx-auto h-[90vh] px-4">
        <div className="mt-40 flex justify-center">
          <Card className="w-[450px]">
            <CardHeader>
              <CardTitle className="text-center text-3xl text-primary">
                Reset Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <FormInput
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    value={values.password}
                    error={errors.password}
                    isError={!!touched.password && !!errors.password}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <FormInput
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword}
                    isError={
                      !!touched.confirmPassword && !!errors.confirmPassword
                    }
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </div>

                {/* Kalau sedang loading, maka buttonnya akan ke desible */}
                <Button className="mt-6 w-full" disabled={isLoading}>
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

export default ResetPassword;
