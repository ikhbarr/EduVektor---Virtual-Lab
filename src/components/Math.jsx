import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

const Math = ({ children, block }) => {
  const content = Array.isArray(children) ? children.join('') : children;
  if (block) {
    return <BlockMath math={content} />;
  }
  return <InlineMath math={content} />;
};

export default Math;
