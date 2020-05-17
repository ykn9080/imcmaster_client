import React, { useRef, useState, useEffect } from "react";
import "./ContextMenu.css";

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       menu: [
//         { label: "Item 1", callback: this.itemCallback },
//         { label: "Menu item 2", callback: this.item2Callback },
//         { label: "Apple", callback: this.appleCallback },
//         { label: "This is orange", callback: this.orangeCallback },
//         { label: "Conetxt menu is fun" },
//         { label: "Cool", callback: this.coolCallback },
//       ],
//     };
//   }

//   itemCallback() {
//     alert("clicked on Item 1");
//   }

//   item2Callback() {
//     alert("clicked on Item 2");
//   }

//   appleCallback() {
//     alert("clicked on Apple");
//   }
//   orangeCallback() {
//     alert("clicked on Orange");
//   }
//   coolCallback() {
//     alert("clicked on Cool");
//   }
//   render() {
//     return (
//       <div>
//         <h1>Hello, React</h1>
//         <p>Implementing custom context menu in react.js</p>
//         <p> Right click anywhere on the screen to see the menu defined below</p>
//         {JSON.stringify(this.state.menu)}
//         <ContextMenu items={this.state.menu}></ContextMenu>
//       </div>
//     );
//   }
// }

const ContextMenu = (props) => {
  const contextRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  let items = [],
    node = {};

  if (props.items) items = props.items;
  if (props.node) node = props.node;

  useEffect(() => {
    document.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      const clickX = event.clientX;
      const clickY = event.clientY;
      setVisible(true);
      setPosition({ x: clickX, y: clickY });
    });
    document.addEventListener("click", function (event) {
      if (contextRef.current && contextRef.current.id === "customcontext") {
        click(
          event.target.getAttribute("index"),
          event.target.getAttribute("node")
        );
      }
      event.preventDefault();

      setVisible(false);
      setPosition({ x: 0, y: 0 });
    });
  }, []);

  const click = (index, node) => {
    if (!index) {
      setVisible(false);
      setPosition({ x: 0, y: 0 });
      return false;
    }
    if (props.callback) {
      props.callback(index, JSON.parse(node));
    }
  };

  const returnMenu = (items, node) => {
    var myStyle = {
      position: "absolute",
      top: `${position.y}px`,
      left: `${position.x + 5}px`,
    };

    return (
      <div
        className="custom-context"
        id="customcontext"
        style={myStyle}
        ref={contextRef}
      >
        {items.map((item, index, arr) => {
          if (arr.length - 1 === index) {
            return (
              <div
                key={index}
                className="custom-context-item-last"
                index={index}
                node={JSON.stringify(node)}
              >
                {item.label}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="custom-context-item"
                index={index}
                node={JSON.stringify(node)}
              >
                {item.label}
              </div>
            );
          }
        })}
      </div>
    );
  };
  return <div id="cmenu">{visible ? returnMenu(items, node) : null}</div>;
};

export default ContextMenu;
