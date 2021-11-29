import * as React from 'react';
import Box from '@mui/material/Box';


import { Button } from '@material-ui/core';

function App() {
  return <div><span>click to claim reward</span><Button color="primary">Claim Rewards</Button></div>
}

ReactDOM.render(<App />, document.querySelector('#app'));
