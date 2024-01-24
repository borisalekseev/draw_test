import React from 'react';
import { RemoteStructServiceProvider } from 'ketcher-core'
import { Editor } from 'ketcher-react';

const structServiceProvider = new RemoteStructServiceProvider(
  process.env.REACT_APP_API_HOST || "http://localhost:8002/api/v2/",
)


const App: React.FC = () => {
  
  return (<Editor
    onInit={ketcher => {
      window.addEventListener("message", (event) => {
        if (event.type == "getInchi") {
          window.parent.postMessage({
            inchi: ketcher.getInchi(),
            type: "inchi"
          }, "https://db.dchem.ru")
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
