import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import useForceUpdate from "use-force-update";
import $ from "jquery";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardForm from "components/Edit/CardForm";
import ControlIcon from "components/Controls/ControlIcon";
import { ObjectID } from "bson"; //_id maker for MongoDB
import { BodyHead } from "./BodyHead";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 250,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  iconright: {
    alignItems: "bottom"
  },
  primary: {
    margin: theme.spacing(1)
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -80,
    float: "right",
    right: 0,
    marginRight: 20
  },
  fabRight: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    float: "right",
    right: 0,
    marginRight: 20
  }
}));

export const Body = props => {
  const forceUpdate = useForceUpdate();
  const classes = useStyles();

  let ctrList;
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [expanded, setExpanded] = useState(false);
  ctrList = useSelector(state => state.global.control);
  if (typeof ctrList == "undefined") ctrList = [];
  useEffect(() => {
    $(".MuiGrid-container").css({ overflow: "hidden" });
  });
  ctrList = _.sortBy(ctrList, ["seq"]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addNewControl = ctrList => {
    let maxseq = _.maxBy(ctrList, "seq");
    if (typeof maxseq === "undefined") maxseq = -1;
    const _id = new ObjectID();
    ctrList.push({
      _id: _id,
      ctrid: "",
      type: "",
      seq: maxseq + 1,
      size: 6
    });
    dispatch(globalVariable({ control: ctrList }));
    forceUpdate();
  };
  const removeControl = (ctrList, _id) => {
    console.log(ctrList, _id);
    ctrList.map((e, i) => {
      console.log(e, _id);
      if (e._id === _id) ctrList.splice(i, 1);
    });
    dispatch(globalVariable({ control: ctrList }));
    forceUpdate();
  };

  return (
    <div>
      <BodyHead />

      <Grid container className={classes.root} spacing={1}>
        {ctrList.map((dt, index) => {
          return (
            <Grid item xs={dt.size} key={dt._id} className="draggable-item">
              <CardForm
                removeControl={removeControl}
                data={dt}
                ctrList={ctrList}
              />
            </Grid>
          );
        })}
        <ControlIcon ctrList={ctrList} addNewControl={addNewControl} />
      </Grid>
    </div>
  );
};

/* #region  drag drop sample */
// const applyDrag = (arr, dragResult) => {
//   const { removedIndex, addedIndex, payload } = dragResult;
//   if (removedIndex === null && addedIndex === null) return arr;

//   const result = [...arr];
//   let itemToAdd = payload;

//   if (removedIndex !== null) {
//     itemToAdd = result.splice(removedIndex, 1)[0];
//   }

//   if (addedIndex !== null) {
//     result.splice(addedIndex, 0, itemToAdd);
//   }

//   return result;
// };

// const generateItems = (count, creator) => {
//   const result = [];
//   for (let i = 0; i < count; i++) {
//     result.push(creator(i));
//   }
//   return result;
// };

// export const DragHandle = () => {
//   const [items, setItems] = useState(
//     generateItems(50, index => {
//       return {
//         id: index,
//         data: "Draggable" + index
//       };
//     })
//   );

//   return (
//     <div>
//       <div className="simple-page">
//         <Container
//           dragHandleSelector=".column-drag-handle"
//           onDrop={e => setItems(applyDrag(items, e))}
//         >
//           {items.map(p => {
//             return (
//               <Draggable key={p.id}>
//                 <div className="draggable-item">
//                   <Card
//                     title="Default size card"
//                     extra={<a href="#">More</a>}
//                     style={{ width: 300 }}
//                   >
//                     <span
//                       className="column-drag-handle"
//                       style={{ float: "left", padding: "0 10px" }}
//                     >
//                       &#x2630;
//                     </span>
//                     <p>Card content</p>
//                     <p>Card content</p>
//                     <p>Card content</p>
//                   </Card>
//                 </div>
//               </Draggable>
//             );
//           })}
//         </Container>
//       </div>
//     </div>
//   );
// };
/* #endregion */
