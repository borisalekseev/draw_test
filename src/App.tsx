import React from 'react';
import { RemoteStructServiceProvider } from 'ketcher-core'
import { Editor } from 'ketcher-react';

const structServiceProvider = new RemoteStructServiceProvider(
  process.env.REACT_APP_API_HOST || "http://localhost:6380/api/v2/",
)
const TARGET_ORIGIN = process.env.REACT_APP_TARGET_ORIGIN || "*"
type EventTypes = "getInchi" | "getSmiles"

const App: React.FC = () => {
  
  return (<Editor
    onInit={ketcher => {
      window.addEventListener("message", async (event: MessageEvent<{type: EventTypes}>) => {
        if (event.data.type === "getInchi") {
          window.parent.postMessage(
            {inchi: await ketcher.getInchi(), type: "inchi"}, TARGET_ORIGIN
          )
        }
      })
    }}
      staticResourcesUrl={"./"}
      structServiceProvider={structServiceProvider}
      // @ts-ignore-next-line
      errorHandler={(error) => window.alert(error)}    />
)
}

export default App;
