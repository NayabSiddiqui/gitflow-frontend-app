import * as React from 'react';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

const Hello = ({name, enthusiasmLevel = 1}: Props) => {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
  }

  return (
    <div className="hello">
      <div className="greeting">
        Hi {name + getExclamationMarks(enthusiasmLevel)}
      </div>
    </div>
  );
};

export default Hello;