'use client';

import { FC } from 'react';
import ReactMarkdown, { Components } from 'react-markdown'; //manual
import rehypeRaw from 'rehype-raw'; //manual

interface MardownProps {
  content: string;
}

const Markdown: FC<MardownProps> = ({ content }) => {
  const renderers: Components = {
    h2: ({ children }) => <h2 className="text-lg font-bold">{children}</h2>,
    p: ({ children }) => <p className="text-base font-light">{children}</p>,
  };
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={renderers}>
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
