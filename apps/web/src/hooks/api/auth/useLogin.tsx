'use client';

import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slices/userSlice';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface LoginArgs extends Omit<User, 'id' | 'fullName'> {
  password: string;
}

interface LoginResponse {
  message: string;
  data: User;
  token: string;
}
const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch(); // Mengirim action ke Redux store untuk memperbarui state
  const Login = async (payload: LoginArgs) => {
    try {
      const { data } = await axiosInstance.post<LoginResponse>(
        '/auth/login',
        payload,
      );

      dispatch(loginAction(data.data));
      localStorage.setItem('token', data.token); // Menyimpan token di localStorage agar dapat dipakai untuk keep login
      router.replace('/'); // Mengarahkan pengguna ke halaman home
      toast.success('Login Success', {
        position: 'top-right',
        autoClose: 2000,
      });
    } catch (error) {
      //toast error massge jika password salah
      if (error instanceof AxiosError) {
        toast.error('Invalid Email or Password', {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    }
  };
  return { Login };
};

export default useLogin;

// axiosInstance.post('/auth/login', payload): Mengirimkan permintaan HTTP POST ke endpoint /auth/login dengan payload sebagai badan (body) permintaan. payload berisi informasi login, seperti email dan password.

// Fungsi Payload
// Mengemas Data: payload berfungsi untuk mengemas data yang diperlukan untuk proses login. Ini termasuk informasi seperti email dan password.
// Mengirim Data: Data dalam payload dikirim ke server untuk autentikasi pengguna. Server akan memproses data ini untuk memverifikasi kredensial pengguna.
