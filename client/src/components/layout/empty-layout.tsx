import * as React from 'react';

type EmptyLayoutProps = {
  children: React.ReactNode;
  // for react helmet
  title: string;
  showTitle: boolean;
};

export const EmptyLayout = ({
  children,
  title,
  showTitle = true,
}: EmptyLayoutProps) => {
  return <>{children}</>;
};
