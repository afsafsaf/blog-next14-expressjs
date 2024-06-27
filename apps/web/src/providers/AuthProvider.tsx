'use client';

import useKeepLogin from '@/hooks/api/auth/useKeepLogin';
import { FC, PropsWithChildren, useEffect } from 'react';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { KeepLogin } = useKeepLogin();

  useEffect(() => {
    KeepLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
};
