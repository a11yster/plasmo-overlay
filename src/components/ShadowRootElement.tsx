import React, { useState } from "react"
import Modal from "./Modal"

//@ts-ignore
import magicImage from "../../assets/image.png"

const ShadowRootElement = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <img
        src={magicImage}
        className="w-[32px]"
        onClick={() => setIsOpen(true)}
        alt="Magic Image"
      />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default ShadowRootElement
