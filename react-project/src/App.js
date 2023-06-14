import React from "react";
import "./styles.css";


const dummyData=[{
    id:1,
    "name": "comp1",
    "children": [
      {
        id:2,
        "name": "comp2",
        "children": [
          {
            id:5,
            "name": "comp5"
          },
          {
            id:6,
            "name": "comp6",
            "children":[
                {
                    id:8,
                    "name": "comp8"
                  },
                  {
                    id:9,
                    "name": "comp9"
                  },
            ]
          }
        ]
      },
      {
        id:3,
        "name": "comp3",
        "children": [
          
              {
                id:7,
                "name": "comp7"
              }
          
        ]
      },
      {
        id:4,
        "name": "comp4"
      }
    ]
  }
  ]
  const Card = (props) => {
    const {btnClicked,setBtnClicked}=props;

    // finding object in dummy data
let findValue = (arr, val) => {
    for(let obj of arr){
        if (obj.id === val) {
            return obj;
        }
        if(obj.children){
            let result = findValue(obj.children, val);
            if (result) {
                return result;
            }
        }
    }
    return undefined;
  };

  // onclick parent setting btnClicked with child ids
  const triggerChilds = (e,id) => {
    e.stopPropagation();
    // setBtnClicked([]);
    let result = findValue(dummyData, id);
    const ids = [];
    JSON.stringify(result, (key, value) => {
      if (key === 'id') ids.push(value);
      return value;
    });
        setBtnClicked(ids);
        // setBtn(true);
  };
    return (
      <div>
        {props.data.map((item,index) => (
          <>
            <ul className="card" key={item.id}>
              <button
              key={item.id}
              style={btnClicked && btnClicked?.includes(item.id)
                ? { backgroundColor: "red" }
                : {}
              }
              className="box"
              onClick={(e) =>  triggerChilds(e,item.id)}>{item.name}</button>
              {item.children?.length && <Card data={item.children} btnClicked={btnClicked} setBtnClicked={setBtnClicked}/>}
            </ul>
          </>
        ))}
      </div>
    );
  };
function App() {
 
    const [btnClicked, setBtnClicked] = React.useState([]);

    return (
      <div className="org-tree">
        <Card data={dummyData} btnClicked={btnClicked} setBtnClicked={setBtnClicked} />
      </div>
    );
}

export default App;