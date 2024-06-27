import React from 'react';

interface MessageDisplayProps {
  prompt: string;
  response: string;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ prompt, response }) => {
  if (!prompt) return null;

  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[400px]">
      <div className="flex justify-end">
        <div className="bg-[#DFE1E7] p-2 rounded-md text-[#666D80] max-w-[75%] break-words">
          {prompt}
        </div>
      </div>
      <div className="flex justify-start mt-2">
        <div className="bg-[#DBEAFE] p-2 rounded-md text-[#666D80] max-w-[75%] break-words">
          {response}
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;
