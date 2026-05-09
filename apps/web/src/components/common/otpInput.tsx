import React, { useRef, useState } from "react";

type InputProps = {
  length?: number;
  onComplete: (pin: string) => void;
};

const OTPInput = ({ length = 4, onComplete }: InputProps) => {
  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

  const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));

  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    if (newPin.every((digit) => digit !== "")) {
      onComplete(newPin.join(""));
    }
  };

  return (
    <div className={`grid grid-cols-6 gap-5`}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={OTP[index]}
          onChange={(e) =>
            handleTextChange(e.target.value.replace(/\D/g, ""), index)
          }
          ref={(ref) => {
            inputRef.current[index] = ref as HTMLInputElement;
          }}
          className={`border border-solid border-border-slate-500 focus:border-primary-500 p-3 outline-none rounded-lg text-purple-500 font-bold flex text-center`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
