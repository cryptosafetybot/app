import React from "react";
import { chromeExtensionFrame } from "../../config.json";
import "../../extension.css";

interface ChromeExtensionFrameProps {
  children: React.ReactNode;
}

/**
 * Mimics the chrome extension pop-up in storybook
 */
export function ChromeExtensionFrame({ children }: ChromeExtensionFrameProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "calc(100vh - 32px)",
      }}
    >
      <div
        style={{
          width: chromeExtensionFrame.width,
          border: "0.5px solid rgb(200,200,200)",
          boxShadow: "1px 3px 3px rgba(100,100,100,0.3)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
