const HostStatusPlugin = store => {
  let ws;
  const data = {
    paths: ['/xyz/openbmc_project/state/host0'],
    interfaces: ['xyz.openbmc_project.State.Host']
  };

  const initWebSocket = () => {
    ws = new WebSocket(`wss://${window.location.host}/subscribe`);
    ws.onopen = () => {
      ws.send(JSON.stringify(data));
    };
    ws.onerror = event => {
      console.error(event);
    };
    ws.onmessage = event => {
      const {
        properties: { CurrentHostState, RequestedHostTransition } = {}
      } = JSON.parse(event.data);
      const hostState = CurrentHostState || RequestedHostTransition;
      store.commit('global/setHostStatus', hostState);
    };
  };

  store.subscribe(({ type }) => {
    if (type === 'authentication/authSuccess') {
      initWebSocket();
    }
    if (type === 'authentication/logout') {
      if (ws) ws.close();
    }
  });
};

export default HostStatusPlugin;
