// Polyfill for require
if (typeof window !== 'undefined') {
  (window as any).require = function(module: string) {
    if (module === '@google/generative-ai') {
      return import('@google/generative-ai');
    }
    if (module === 'isomorphic-fetch') {
      // isomorphic-fetch is not needed in the browser as fetch is already available
      return {
        default: window.fetch,
        fetch: window.fetch,
        Headers: window.Headers,
        Request: window.Request,
        Response: window.Response
      };
    }
    throw new Error(`Module ${module} not found`);
  };
}

export {};
