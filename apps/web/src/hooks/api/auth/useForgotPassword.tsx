'use client';

import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slices/userSlice';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ForgotPasswordResponse {
  message: string;
}
const useForgotPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.post<ForgotPasswordResponse>(
        '/auth/forgot-password',
        { email },
      );
      alert(data.message);

      router.replace('/login'); // Mengarahkan pengguna ke halaman home
      toast.success('Reset password has been sent to your email', {
        position: 'top-right',
        autoClose: 2000,
      });
    } catch (error) {
      //toast error massge jika password salah
      if (error instanceof AxiosError) {
        toast.error('Email does not exist', {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { forgotPassword, isLoading };
};

export default useForgotPassword;

// axiosInstance.post('/auth/login', payload): Mengirimkan permintaan HTTP POST ke endpoint /auth/login dengan payload sebagai badan (body) permintaan. payload berisi informasi login, seperti email dan password.

// Fungsi Payload
// Mengemas Data: payload berfungsi untuk mengemas data yang diperlukan untuk proses login. Ini termasuk informasi seperti email dan password.
// Mengirim Data: Data dalam payload dikirim ke server untuk autentikasi pengguna. Server akan memproses data ini untuk memverifikasi kredensial pengguna.
