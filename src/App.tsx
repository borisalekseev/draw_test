import React from 'react';
import { RemoteStructServiceProvider } from 'ketcher-core'
import { Editor } from 'ketcher-react';

const structServiceProvider = new RemoteStructServiceProvider(
  process.env.REACT_APP_API_HOST || "http://localhost:8002/api/v2/",
)


const App: React.FC = () => {
  
  return (<Editor
    onInit={ketcher => {
      console.log("INIT KETCHER")
      console.log(ketcher)
      // @ts-ignore-next-line
      window.ketcher = ketcher
      window.parent.postMessage({
        eventType: "init",
        ketcher: ketcher
      }, "https://db.dchem.ru")
      window.parent.postMessage({
        eventType: "initWrong",
        ketcher: ketcher
      })
    }}
      staticResourcesUrl={"./"}
      structServiceProvider={structServiceProvider}
      // @ts-ignore-next-line
      errorHandler={(error) => window.alert(error)}    />
)
}

export default App;
