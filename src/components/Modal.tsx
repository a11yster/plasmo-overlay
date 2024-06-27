import React, { useState } from "react"

import { Button } from "~/components/ui/button"
import { Dialog, DialogContent } from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"

import MessageDisplay from "./MessageDisplay";
import { triggerEvents } from "~/lib/events";

//@ts-ignore
import generateSvg from "../../assets/generate.svg"
//@ts-ignore
import regenerateSvg from "../../assets/regenerate.svg"
//@ts-ignore
import tickSvg from "../../assets/tick.svg"

interface ModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
const Modal = ({ isOpen, setIsOpen }: ModalProps) => {
  const RESPONSE_TEXT =
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
  const [inputText, setInputText] = useState("")
  const [message, setMessage] = useState({ prompt: "", response: "" })
  const [isGenerated, setIsGenerated] = useState(false)

  const handleGenerateClick = () => {
    if (inputText.trim()) {
      setMessage({
        prompt: inputText,
        response: RESPONSE_TEXT
      })
      setInputText("")
      setIsGenerated(true)
    }
  }

  const handleRegenerateClick = () => {
    if (inputText.trim()) {
      setMessage({
        prompt: inputText,
        response: RESPONSE_TEXT
      })
      setInputText("")
    } else if (message.prompt) {
      setMessage({
        prompt: message.prompt,
        response: RESPONSE_TEXT
      })
    }
  }

  const handleInsertClick = () => {
    const xpath = "//div[contains(@class, 'msg-form__contenteditable')]";
    const targetNode = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    if (targetNode instanceof HTMLElement) {
      //utility function that dispatches events to the input element
      triggerEvents(targetNode, message);
      setIsOpen(false);
    }
    setIsGenerated(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="rounded-[15px] h-auto p-[12px]">
        <div className="text-lg flex flex-col gap-4 justify-center w-full">
          <MessageDisplay prompt={message.prompt} response={message.response} />
          <div className="flex flex-col gap-3 justify-center items-end">
            <Input
              placeholder="Your prompt"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full outline-2 outline-[#C1C7D0] focus:border-red-400 rounded-md hover:ring-0 ring-0 text-lg p-4"
            />
            {isGenerated ? (
              <div className="flex gap-2">
                <Button
                  className="bg-slate-200 mt-2 text-[#666D80] hover:bg-slate-100 flex gap-2"
                  onClick={handleInsertClick}
                  size="sm"
                >
                  <img src={tickSvg} className="w-3" />
                  Insert
                </Button>
                <Button
                  className="bg-[#3B82F6] mt-2 hover:bg-[#3B82F6] flex gap-2 text-lg"
                  onClick={handleRegenerateClick}
                  size="lg"
                >
                  <img src={regenerateSvg} className="w-4" />
                  Regenerate
                </Button>
              </div>
            ) : (
              <Button
                className="bg-[#3B82F6] hover:bg-[#3B82F6] mt-2 flex gap-2 text-lg"
                onClick={handleGenerateClick}
                size="lg"
              >
                <img src={generateSvg} className="w-5" />
                Generate
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal
