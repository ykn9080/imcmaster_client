import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DialogSelect(props) {
  const dispatch = useDispatch();
  let open1 = useSelector((state) => state.global.openDialog1);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(open1);
  }, [open1]);


  const handleClose = () => {
    setOpen(false);
    dispatch(globalVariable({ openDialog1: false }));
  };
  //   const sample1 = (
  //     <>
  //       <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>
  //       <Select native defaultValue="" id="grouped-native-select">
  //         <option aria-label="None" value="" />
  //         {props.optionArray.map((k, i) => {
  //           let text = k.text;
  //           if (!text && k.value)
  //             text = k.value.charAt(0).toUpperCase() + k.value.slice(1);
  //           return k.group ? (
  //             <optgroup label={k.label} />
  //           ) : (
  //             <option value={k.value}>{text}</option>
  //           );
  //         })}
  //       </Select>
  //     </>
  //   );

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          {props.dialogAction}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
