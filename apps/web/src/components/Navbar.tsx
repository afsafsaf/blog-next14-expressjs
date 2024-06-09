'use client';

import { useAppSelector } from '@/redux/hooks';

const Navbar = () => {
  const { id } = useAppSelector((state) => state.user);
  return (
    <nav className="sticky top-0 z-50 bg-transparent">
      <div className="container mx-auto px-10">
        <div className="flex items-center justify-between py-2">
          <h1 className="text-2xl font-extrabold text-gray-700">MyBlog</h1>

          {Boolean(id) ? (
            <div className="flex items-center gap-8">
              <h3>Home</h3>
              <h3>Write</h3>
              <h3>Profile</h3>
              <h3>Logout</h3>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <h3>Home</h3>
              <h3>Login</h3>
              <h3>Register</h3>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
