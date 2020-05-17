import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import DenseAppBar from "./AppBar";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogFull(props) {
  let setting = {};
  if (props.fullScreen) setting = { fullScreen: true };
  const dispatch = useDispatch();
  //const [open, setOpen] = React.useState(false);
  let open = useSelector((state) => state.global.openDialog);
  //   useEffect(() => {
  //     setOpen(props.open);
  //   }, [props.open]);
  const handleClose = () => {
    open = false;
    dispatch(globalVariable({ openDialog: false }));
  };
  const right = (
    <IconButton
      edge="start"
      color="inherit"
      onClick={handleClose}
      aria-label="close"
    >
      <CloseIcon />
    </IconButton>
  );
  return (
    <>
      <Dialog
        {...setting}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DenseAppBar title={props.title} right={right}></DenseAppBar>
        {props.children}
      </Dialog>
      {/* {["formview", "formedit"].indexOf(title) === -1 ? (
      <PageHead title={title} />
    ) : null}
    {(() => {
      switch (title) {
        case "form":
          return <FormList />;
          break;
        case "formview":
          return <FormView />;
          break;
        case "formedit":
          return <FormEdit />;
          break;
      }
    })()} */}
    </>

    // <div>
    //   <Dialog
    //     fullScreen
    //     open={open}
    //     onClose={handleClose}
    //     TransitionComponent={Transition}
    //   >
    //     <AppBar className={classes.appBar}>
    //       <Toolbar>
    //         <IconButton
    //           edge="start"
    //           color="inherit"
    //           onClick={handleClose}
    //           aria-label="close"
    //         >
    //           <CloseIcon />
    //         </IconButton>
    //         <Typography variant="h6" className={classes.title}>
    //           Sound
    //         </Typography>
    //         <Button autoFocus color="inherit" onClick={handleClose}>
    //           save
    //         </Button>
    //       </Toolbar>
    //     </AppBar>
    //     {props.children}
    //   </Dialog>
    // </div>
  );
}
