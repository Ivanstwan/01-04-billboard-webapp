import { TooltipProvider } from './components/ui/tooltip';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <TooltipProvider>{children}</TooltipProvider>
    </>
  );
};
