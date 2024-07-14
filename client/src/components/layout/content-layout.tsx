import * as React from 'react';

type ContentLayoutProps = {
  children: React.ReactNode;
  // for react helmet
  title: string;
  showTitle: boolean;
};

export const ContentLayout = ({
  children,
  title,
  showTitle = true,
}: ContentLayoutProps) => {
  return (
    <>
      <div className="flex min-h-svh flex-col py-6">
        {showTitle && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>
        )}
        <div className="mx-auto max-w-7xl flex-1 px-4 py-6 sm:px-6 md:px-8">
          {children}
        </div>
      </div>
    </>
  );
};
