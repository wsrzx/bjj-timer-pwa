'use client';

import { useEffect } from 'react';
import { initializeViewport } from '@/lib/viewport';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    initializeViewport();
  }, []);

  return <>{children}</>;
} 