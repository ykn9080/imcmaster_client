import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Panel from "./Panel";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 320,
    maxWidth: 400,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320,
  },
}));

export default function DialogSelect(props) {
  console.log(props.dialogAction);
  const classes = useStyles();
  const dispatch = useDispatch();
  let open1 = useSelector((state) => state.global.openDialog1);
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");
  useEffect(() => {
    setOpen(open1);
  }, [open1]);
  const handleChange = (event) => {
    setAge(Number(event.target.value) || "");
  };

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
