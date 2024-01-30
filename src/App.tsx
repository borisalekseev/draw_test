import React from 'react';
import { RemoteStructServiceProvider } from 'ketcher-core'
import { Editor } from 'ketcher-react';
import getEventHandlerClass from "./util"
import { EventType } from './util/interface';

const structServiceProvider = new RemoteStructServiceProvider(
  process.env.REACT_APP_API_HOST || "http://localhost:6380/api/v2/",
)

const App: React.FC = () => {
  
  return (<Editor
    onInit={ketcher => {
      window.addEventListener("message", async (event: MessageEvent<{type: EventType, structure?: string, status?: "ok" | "error"}>) => {
        const handlerClass = getEventHandlerClass(event.data.type)
        const handler = new handlerClass(ketcher, event.data.type, event.data.structure)
        handler.handleEvent()
      })
    }}
      staticResourcesUrl={"./"}
      structServiceProvider={structServiceProvider}
      errorHandler={(error) => console.warn(error)}    />
)
}

export default App;
