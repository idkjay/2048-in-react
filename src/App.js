import React, { useState } from 'react';

function App() {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])

  return (
    <div>
      {data.map((row, oneIndex) => {
        return (
          <div style={{ display: "flex"}} key={oneIndex}>
            {row.map((digit, index) => (
              <Block 
                num={digit}
                key={index}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

const Block = ({ num }) => {
  return <div>{num}</div>
}
export default App;
