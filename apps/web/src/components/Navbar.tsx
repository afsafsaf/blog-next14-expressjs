'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
  };
  return (
    <nav className="sticky top-0 z-50 bg-transparent">
      <div className="container mx-auto px-10">
        <div className="flex items-center justify-between py-2">
          <h1 className="text-2xl font-extrabold text-gray-700 cursor-pointer">
            <Link href={'/'}>MyBlog</Link>
          </h1>

          {Boolean(id) ? (
            <div className="flex items-center gap-8">
              <h3
                className="cursor-pointer"
                onClick={() => {
                  router.push('/');
                }}
              >
                Home
              </h3>
              <h3
                className="cursor-pointer"
                onClick={() => router.push('/create-blog')}
              >
                Create Blog
              </h3>
              <h3
                className="cursor-pointer"
                onClick={() => router.push('/profile')}
              >
                Profile
              </h3>
              <h3 className="cursor-pointer" onClick={logout}>
                <Link href={'/login'}>Logout</Link>
              </h3>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <h3 className="cursor-pointer" onClick={() => router.push('/')}>
                Home
              </h3>
              <h3
                className="cursor-pointer"
                onClick={() => {
                  router.push('/login');
                }}
              >
                Login
              </h3>
              <h3
                className="cursor-pointer"
                onClick={() => {
                  router.push('/register');
                }}
              >
                Register
              </h3>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
