// app/history/historial_conversation/[id]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import OutfitAssistantPage from '@/app/outfit-assistant/page';

export default function ConversationPage() {
    const params = useParams();
    // next/navigation can return string or string[] for params
    console.log("dataa", params);
    const rawId = params.id;
    // Ensure it's a single string or undefined
    const conversationId = Array.isArray(rawId) ? rawId[0] : rawId;

    return (
         <OutfitAssistantPage searchParams={{ initialConversationId: conversationId ?? undefined }}
      />
    );
}