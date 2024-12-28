// Polyfill for require
if (typeof window !== 'undefined') {
  (window as any).require = function(module: string) {
    if (module === '@google/generative-ai') {
      return import('@google/generative-ai');
    }
    throw new Error(`Module ${module} not found`);
  };
}

export {};
