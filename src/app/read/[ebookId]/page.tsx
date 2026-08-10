'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getEbookById, verifyUserOwnership } from '@/lib/data/repository';
import { OnlineReader } from '@/components/reader/online-reader';
import { useAuth } from '@/lib/auth/context';
import { Ebook } from '@/types';

export default function ReaderPage() {
  const params = useParams();
  const ebookId = params?.ebookId as string;
  const { user } = useAuth();

  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initReader() {
      if (!ebookId) return;
      const book = await getEbookById(ebookId);
      if (book) {
        setEbook(book);
        const activeUserId = user ? user.id : 'usr-customer';
        const ownership = await verifyUserOwnership(activeUserId, ebookId);
        setIsOwner(ownership);
      }
      setLoading(false);
    }
    initReader();
  }, [ebookId, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-white">
        <p>eBook not found.</p>
      </div>
    );
  }

  return (
    <OnlineReader
      ebook={ebook}
      userId={user?.id || 'usr-customer'}
      isOwner={isOwner}
    />
  );
}
