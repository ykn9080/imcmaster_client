import React, { useEffect } from "react";
import $ from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CardAnt from "components/Common/CardAnt";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 250,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper1: {
    padding: theme.spacing(1),
    minHeight: "100vh",
  },
}));

const CardList = (props) => {
  //   const forceUpdate = useForceUpdate();
  const classes = useStyles();
  //   const history = useHistory();
  //  let dtList = props.dtList;
  // const dispatch = useDispatch();

  //   const makeNewControl = dtList => {
  //     let maxseq = _.maxBy(dtList, "seq");

  //     if (typeof maxseq === "undefined") maxseq = -1;
  //     else maxseq = maxseq.seq;
  //     const _id = new ObjectID();
  //     return {
  //       _id: _id,
  //       ctrid: "",
  //       type: "",
  //       seq: maxseq + 1,
  //       size: 6
  //     };
  //   };

  const ReOrder = (start_pos, end_pos) => {
    console.log(start_pos, end_pos);
    // let arr = formdt;
    // const _id = arr._id;
    // let newArr = [];
    // let list = _.sortBy(arr.data.list, ["seq"]);
    // if (start_pos < end_pos)
    //   _.forEach(list, function (value, key) {
    //     if (value.type !== "button") {
    //       if (value.seq <= end_pos && value.seq > start_pos) value.seq--;
    //       else if (value.seq === start_pos) value.seq = end_pos;
    //     }
    //     newArr.push(value);
    //   });
    // if (start_pos > end_pos)
    //   _.forEach(list, function (value, key) {
    //     if (value.type !== "button") {
    //       if (value.seq >= end_pos && value.seq < start_pos) value.seq++;
    //       else if (value.seq === start_pos) value.seq = end_pos;
    //     }
    //     newArr.push(value);
    //   });
    // arr.data.list = newArr;
    // setFormdt(arr);
    // setFormArray(arr.data);
    // dispatch(globalVariable({ currentData: arr }));
    //st>ed -> st prev +1 st->ed
  };
  useEffect(() => {
    let $node = $("#cardList123");
    //let $node = $(".makeStyles-root-499");
    //$(".draggable-item").resizable();
    $node.sortable({
      opacity: 0.8,
      placeholder: "ui-state-highlight",
      start: function (event, ui) {
        var start_pos = ui.item.index();
        ui.item.data("start_pos", start_pos);
        console.log("start", start_pos);
      },
      update: function (event, ui) {
        var start_pos = ui.item.data("start_pos");
        var end_pos = ui.item.index();
        //$('#sortable li').removeClass('highlights');
        ReOrder(start_pos, end_pos);
      },
    });
    $(".draggable-item").resizable();
    return () => {
      $node.sortable({
        placeholder: "ui-state-highlight",
      });
    };
  }, []);

 
  const removeItemHandler = (_id) => {
    props.dtList.map((e, i) => {
      console.log(e, _id);
      if (e._id === _id) 
      return (props.dtList.splice(i, 1))
    });
    props.removeItemHandler(props.dtList);

    // dispatch(globalVariable({ control: dtList }));
    // forceUpdate();
  };
  const editItemHandler = (dt) => {
    props.editItemHandler(dt);
  };

  return (
    <Paper variant="outlined" square className={classes.paper1}>
      <Grid container className={classes.root} spacing={1} id="cardList123">
        {props.dtList.map((dt, index) => {
          return (
            <Grid
              item
              xs={dt.size}
              key={dt._id}
              className="draggable-item ui-widget-content"
            >
              {/* <CardForm
                cardStyle={props.cardType}
                removeItemHandler={removeItemHandler}
                resizeItemHandler={props.resizeItemHandler}
                editItemHandler={props.editItemHandler}
                data={dt}
                dtList={props.dtList}
              /> */}
              <CardAnt
                removeItemHandler={removeItemHandler}
                resizeItemHandler={props.resizeItemHandler}
                editItemHandler={editItemHandler}
                removeItemHandler={removeItemHandler}
                data={dt}
                dtList={props.dtList}
                index={index}
                key={dt._id}
              />
            </Grid>
          );
        })}
        {/* <Grid item xs={3} key={"add_new"} className="draggable-item">
          <CardForm data={props.newData} />
        </Grid> */}
      </Grid>
    </Paper>
  );
};

export default CardList;
