import React from 'react';
import { PageBuilder } from '@/components/page-builder/page-builder';

export default function EditorPage() {
  const handleSave = async (components: any[]) => {
    // Aquí implementarías la lógica para guardar en tu backend
    console.log('Guardando componentes:', components);
    // Simular una llamada API
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="h-screen">
      <PageBuilder
        pageId="landing-1"
        initialComponents={[]}
        onSave={handleSave}
        isPremiumUser={false}
      />
    </div>
  );
}
