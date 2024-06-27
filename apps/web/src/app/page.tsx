'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function Home() {
  const { toast } = useToast();
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>Test</Button>
      <h1
        onClick={() =>
          toast({
            description: 'Your massage has been sent',
          })
        }
      >
        sonner
      </h1>
    </>
  );
}
