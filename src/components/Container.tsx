import React from 'react';

type Props = {};

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      {children}
    </div>
  );
};

export default Container;
