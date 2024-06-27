'use client';

import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slices/userSlice';
import { User } from '@/types/user.type';

interface KeepLoginResponse {
  message: string;
  data: User;
}
const useKeepLogin = () => {
  const dispatch = useAppDispatch(); // Mengirim action ke Redux store untuk memperbarui state
  const KeepLogin = async () => {
    try {
      const { data } =
        await axiosInstance.get<KeepLoginResponse>('/auth/keep-login');

      dispatch(loginAction(data.data));
    } catch (error) {}
  };
  return { KeepLogin };
};

export default useKeepLogin;

// axiosInstance.post('/auth/login', payload): Mengirimkan permintaan HTTP POST ke endpoint /auth/login dengan payload sebagai badan (body) permintaan. payload berisi informasi login, seperti email dan password.

// Fungsi Payload
// Mengemas Data: payload berfungsi untuk mengemas data yang diperlukan untuk proses login. Ini termasuk informasi seperti email dan password.
// Mengirim Data: Data dalam payload dikirim ke server untuk autentikasi pengguna. Server akan memproses data ini untuk memverifikasi kredensial pengguna.
