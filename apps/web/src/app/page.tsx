'use client';

import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>Test</Button>
      <h1 onClick={() => toast.error('hello world')}>
        sonner
        <Toaster richColors />
      </h1>
    </>
  );
}
