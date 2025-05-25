// app/history/historial_conversation/[id]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import OutfitAssistantPage from '@/app/outfit-assistant/page';

export default function ConversationPage() {
    const params = useParams();

    // next/navigation pot retornar null
    if (!params || typeof params !== 'object' || !('id' in params)) {
        return <div><p>No s&apos;ha trobat l&apos;element</p></div>;
    }

    const rawId = (params as { id: string | string[] }).id;
    const conversationId = Array.isArray(rawId) ? rawId[0] : rawId;

    return (
        <OutfitAssistantPage searchParams={{ initialConversationId: conversationId ?? undefined }} />
    );
}
