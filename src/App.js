import React, { useState, useEffect } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { useEvent } from './util'

function App() {

  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;
  
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])

  //initialize
  const initialize = () => {
    let newGrid = cloneDeep(data);
    let newClone = cloneDeep(data);
    console.log(newClone);

    addNumber(newGrid);
    addNumber(newGrid);
    //adds two numbers to the grid, either 2 or 4
    setData(newGrid);
  }

  //add number, add  an item to the grid
  const addNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;

    while (!added) {
      if (gridFull) {
        break;
      }

      let random1 = Math.floor(Math.random() * 4);
      let random2 = Math.floor(Math.random() * 4);
      attempts++;

      if (newGrid[random1][random2] === 0) {
        newGrid[random1][random2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
    }
  }
  //swipe right, left, up, down
  const swipeLeft = (dummy) => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const swipeRight = (dummy) => {
    let oldData = data;
    let newArray = cloneDeep(data);

    for (let i = 3; i >= 0; i--) {
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const handleKeyDown = event =>{
    switch (event.keyCode) {
      case LEFT_ARROW:
        swipeLeft();
        break;
    }
    switch (event.keyCode) {
      case RIGHT_ARROW:
        swipeRight();
        break;
    }
  }

  // check game over

  //reset

  useEffect(() => {
    initialize();
  }, [])

  useEvent("keydown", handleKeyDown);

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
  const { blockStyle } = style;

  return (
    <div
      style={{
        ...blockStyle,
        color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
      }}
    >
      {num}
    </div>
  );
};

const style = {
  blockStyle: {
    height: 80,
    width: 80,
    background: "lightgray",
    margin: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    fontWeight: "800",
    color: "white",
  }
}

export default App;
