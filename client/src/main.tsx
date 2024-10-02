import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { AppProvider } from './main-provider';
import { AuthProvider, useAuth } from './auth';
import { Toaster } from './components/ui/sonner';

// Create a client
const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: null, // This will be set after we wrap the app in an AuthProvider
  },
  defaultNotFoundComponent: () => <div>Global not found!</div>,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      {/* <QueryClientProvider client={queryClient}> */}
      <AuthProvider>
        <InnerApp />
        <Toaster />
      </AuthProvider>
      {/* </QueryClientProvider> */}
    </QueryClientProvider>,
  );
}
