'use client';

import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slices/userSlice';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ResetPasswordResponse {
  message: string;
}
const useResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (password: string, token: string) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.patch<ResetPasswordResponse>(
        '/auth/reset-password',
        { password },
        {
          headers: {
            Authorization: `Bearer${token}`,
          },
        },
      );
      alert(data.message);

      router.replace('/login'); // Mengarahkan pengguna ke halaman login
      toast.success('Reset Password Success', {
        position: 'top-right',
        autoClose: 2000,
      });
    } catch (error) {
      //toast error massge jika password salah
      if (error instanceof AxiosError) {
        // toast.error('Password can not be changed', {
        //   position: 'top-right',
        //   autoClose: 2000,
        // });
        alert(error?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { resetPassword, isLoading };
};

export default useResetPassword;

// axiosInstance.post('/auth/login', payload): Mengirimkan permintaan HTTP POST ke endpoint /auth/login dengan payload sebagai badan (body) permintaan. payload berisi informasi login, seperti email dan password.

// Fungsi Payload
// Mengemas Data: payload berfungsi untuk mengemas data yang diperlukan untuk proses login. Ini termasuk informasi seperti email dan password.
// Mengirim Data: Data dalam payload dikirim ke server untuk autentikasi pengguna. Server akan memproses data ini untuk memverifikasi kredensial pengguna.
