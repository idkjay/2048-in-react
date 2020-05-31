import React, { useState } from 'react';

function App() {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])

  return (
    <div
      style={{
        background: "#AD9D8F",
        width: "max-content",
        margin: "auto",
        padding: 5,
        borderRadius: 5,
        marginTop: 10
      }}
    >
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
