import { useState } from 'react';

interface InputProps {
	digitQuantity: number;
	onGetCode(values: Array<string>): void;
}

export function Input({digitQuantity, onGetCode}: InputProps) {
  const [code, setCode] = useState<Array<string>>(new Array(digitQuantity).fill(''));

  function onChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const {value} = e.target;

    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);
    onGetCode(newCode);

    const nextField: HTMLInputElement | null = document.querySelector(
      `input[name=code-${index + 1}]`
    );

    if (nextField && value) {
      nextField.focus();
    }
  }

  function onHandleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    const {value} = e.currentTarget;

    if (e.key === 'Backspace' && !value) {
      e.preventDefault();

      const previousField: HTMLInputElement | null = document.querySelector(
        `input[name=code-${index - 1}]`
      );

      previousField?.focus();
    }
  }

  function onHandlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();

    const paste = e.clipboardData.getData('text/plain');
    const pasteDigits = paste.match(/\d/g);

    if (pasteDigits && pasteDigits.length === digitQuantity) {
      const pasteCode = pasteDigits.slice(0, 6);

      setCode(pasteCode);
      onGetCode(pasteCode);
    }
  }

  return (
    <>
      {code.map((_, index) => (
        <input
          key={index}
          name={`code-${index}`}
          maxLength={1}
          type="text"
          onChange={(e) => onChange(index, e)}
          onKeyDown={(e) => onHandleKeyDown(index, e)}
          value={code[index]}
          onPaste={onHandlePaste}
        />
      ))}
    </>
  );
}
