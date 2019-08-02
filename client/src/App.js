import React, { useState } from "react";
import { times, constant } from "lodash";
import * as bs from "bootstrap/dist/css/bootstrap.css";

import { Row, Container, Col } from "react-bootstrap";
function App() {
  const [data, setData] = useState({
    rows: 0,
    rowArray: [],
    columns: "",
    gutterRow: "8",
    gutterColumn: "8"
  });
  // const gridContainer = {
  //   display: "grid",
  //   gridTemplateColumns: "auto auto auto",
  //   backgroundColor: "#2196F3",
  //   padding: "10px",
  //   gridColumnGap: `${data.gutterColumn}px`,
  //   gridRowGap: `${data.gutterRow}px`
  // };
  // const gridItem = {
  //   backgroundColor: "rgba(255, 255, 255, 0.8)",
  //   border: "1px solid rgba(0, 0, 0, 0.8)",
  //   // padding: "20px",
  //   height: "100px",
  //   fontSize: "30px",
  //   textAlign: "center"
  // };
  const drawBox = (row, col) => {
    const tempArray = times(row, String);
    const colArray = col.split(",");
    const temp = tempArray.map((v, i) => {
      return (
        <Row>
          {colArray &&
            colArray[i] &&
            new Array(parseInt(colArray[i], 10)).map(value => <Col>100Px</Col>)}
        </Row>
      );
    });
    console.log(temp);
  };

  const onChangeFunc = e => {
    let temp = [];
    if (e.target.name === "rows") {
      // const tempArray = times(e.target.value, String);
      // const colArray = data.columns.split(",");
      // debugger;
      // temp = tempArray.map((v, i) => {
      //   return (
      //     <Row>
      //       {colArray &&
      //         colArray[i] &&
      //         colArray[i].map(value => <Col>100PX</Col>)}
      //     </Row>
      //   );
      // });
      drawBox(e.target.value, data.columns);
    } else if (e.target.name === "columns") {
      drawBox(e.target.value, data.rows);
    }
    setData({
      ...data,
      rowArray: temp,
      [e.target.name]: e.target.value
    });
  };

  const onBlurFunc = e => {
    const temp = data.columns.split(",");
    if (temp.length === parseInt(data.rows, 10)) {
    } else {
      alert("Enter proper value");
    }
  };

  return (
    <div className="App">
      <div>
        <label>No. Of Rows</label>
        <br />
        <input name="rows" value={data.rows} onChange={e => onChangeFunc(e)} />
      </div>
      <div>
        <label>No. Of Columns</label>
        <br />
        <input
          name="columns"
          value={data.columns}
          onChange={e => onChangeFunc(e)}
          onBlur={e => onBlurFunc(e)}
        />
      </div>
      <div>
        <label>Gutter Rows</label>
        <br />
        <input
          value={data.gutterRow}
          name="gutterRow"
          onChange={e => onChangeFunc(e)}
        />
      </div>
      <div>
        <label>Gutter Column</label>
        <br />
        <input
          value={data.gutterColumn}
          name="gutterColumn"
          onChange={e => onChangeFunc(e)}
        />
      </div>
      {/* {data.rowArray} */}
      {/* {<div style={gridContainer}>{data.rowArray}</div>} */}
      <Container>{data.rowArray}</Container>
    </div>
  );
}

export default App;
