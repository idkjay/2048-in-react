import React, { useState } from 'react';

function App() {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])

  return (
    <div>{JSON.stringify(data)}</div>
  );
}

export default App;
