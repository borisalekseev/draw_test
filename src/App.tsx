import React from 'react';
import { RemoteStructServiceProvider } from 'ketcher-core'
import { Editor } from 'ketcher-react';

const structServiceProvider = new RemoteStructServiceProvider(
  process.env.REACT_APP_API_HOST || "http://localhost:6380/api/v2/",
)
const TARGET_ORIGIN = process.env.REACT_APP_TARGET_ORIGIN || "*"
type EventTypes = "getInchi" | "getSmiles" | "setMolecule" | "getInchiKey" | "getMolfile"

const App: React.FC = () => {
  
  return (<Editor
    onInit={ketcher => {
      window.addEventListener("message", async (event: MessageEvent<{type: EventTypes, structure?: string, status?: "ok" | "error"}>) => {
        if (event.data.type === "getInchi") {
          window.parent.postMessage(
            {inchi: await ketcher.getInchi(), type: "inchi"}, TARGET_ORIGIN
          )
        }
        else if (event.data.type === "getSmiles") {
          window.parent.postMessage(
            {inchi: await ketcher.getSmiles(), type: "smiles"}, TARGET_ORIGIN
          )
        }
        else if (event.data.type === "getInchiKey") {
          window.parent.postMessage(
            {inchi: await ketcher.getInChIKey(), type: "inchikey"}, TARGET_ORIGIN
          )
        }
        else if (event.data.type === "getMolfile") {
          window.parent.postMessage(
            {inchi: await ketcher.getMolfile(), type: "molfile"}, TARGET_ORIGIN
          )
        }
        else if (event.data.type === "setMolecule") {
          if (!event.data.structure) {
            console.warn("No 'structure' attr in message")
          }
          ketcher.setMolecule(event.data.structure || "")
        }
      })
    }}
      staticResourcesUrl={"./"}
      structServiceProvider={structServiceProvider}
      errorHandler={(error) => console.warn(error)}    />
)
}

export default App;
