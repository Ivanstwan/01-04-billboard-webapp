import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { AppProvider } from './main-provider';

// Create a client
const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultNotFoundComponent: () => <div>Global not found!</div>,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        {/* <QueryClientProvider client={queryClient}> */}
        <RouterProvider router={router} />
        {/* </QueryClientProvider> */}
      </QueryClientProvider>
    </StrictMode>,
  );
}
