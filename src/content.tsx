import * as React from "react"
import { createRoot } from "react-dom/client"
import type {
  PlasmoCSConfig,
  PlasmoCSUIContainerProps,
  PlasmoGetOverlayAnchor,
  PlasmoRender,
} from "plasmo"
import ShadowRootElement from "~components/ShadowRootElement"
import cssText from "data-text:~styles/globals.css"
import "~styles/globals.css"
export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
document.querySelector(".msg-form__contenteditable[data-artdeco-is-focused='true']")

//override the static OverlayCSUIContainer to position the anchor-element at the bottom right of the root element
const OverlayCSUIContainer = (props: PlasmoCSUIContainerProps) => {
  const [top, setTop] = React.useState(0)
  const [left, setLeft] = React.useState(0)

  React.useEffect(() => {
    // Handle overlay repositioning
    if (props.anchor.type !== "overlay") {
      return
    }

    const updatePosition = async () => {
      const rect = props.anchor.element?.getBoundingClientRect()
      if (!rect) {
        return
      }

      const pos = {
        left: rect.right + window.scrollX,
        top: rect.bottom + window.scrollY
      }

      setLeft(pos.left - 38)
      setTop(pos.top - 38)
    }

    updatePosition()

    const unwatch = props.watchOverlayAnchor?.(updatePosition)
    window.addEventListener("scroll", updatePosition)
    window.addEventListener("resize", updatePosition)

    return () => {
      if (typeof unwatch === "function") {
        unwatch()
      }
      window.removeEventListener("scroll", updatePosition)
      window.removeEventListener("resize", updatePosition)
    }
  }, [props.anchor.element])

  return (
    <div
      id={props.id}
      className="plasmo-csui-container"
      style={{
        display: "flex",
        position: "absolute",
        top,
        left
      }}>
      {props.children}
    </div>
  )
}
export const render: PlasmoRender<typeof OverlayCSUIContainer> = async (
  {
    anchor,
    createRootContainer
  }
) => {
  //had to specify the anchor element again for some reason even though it should have been returned from getOverlayAnchor
  anchor.element = document.querySelector(".msg-form__contenteditable[data-artdeco-is-focused='true']")
  const rootContainer = await createRootContainer(anchor)

  const root = createRoot(rootContainer) 

  root.render(
    <OverlayCSUIContainer anchor={anchor}>
      <ShadowRootElement/>
    </OverlayCSUIContainer>
  )
}