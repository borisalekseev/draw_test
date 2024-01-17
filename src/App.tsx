import React from 'react';
import { RemoteStructServiceProvider, Ketcher } from 'ketcher-core'
import { Editor } from 'ketcher-react';
import { GraphContainer } from './container';

const structServiceProvider = new RemoteStructServiceProvider(
  "http://localhost:8002/api/v2/",
)

const Kk: React.FC = () => {
  // @ts-ignore-next-line
  return <button onClick={() => window.ketcher.getInchi().then(v => window.alert(v))}>asdasd</button>
}

const Ket: React.FC = () => {
  const [ketcher, setKetcher] = React.useState<Ketcher>()

  return (
    <>
    <Kk />
    <GraphContainer><Editor
    onInit={k => {
      // @ts-ignore-next-line
      window.ketcher = k
      window.parent.postMessage({
        eventType: "init"
      })
    }}
        staticResourcesUrl={"./"}
        structServiceProvider={structServiceProvider}
        errorHandler={function (message: string): void {
          window.alert(message);
        } }    />
        </GraphContainer>
        
        </>
  )
}


const App: React.FC = () => {
  return (
      <Ket />
  );
}

export default App;
