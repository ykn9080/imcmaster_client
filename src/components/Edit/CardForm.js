import React from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { Link, useHistory } from "react-router-dom";
import useForceUpdate from "use-force-update";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import ArrowRight from "@material-ui/icons/ArrowRight";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ControlList from "components/Controls";

const useStyles = makeStyles(theme => ({
  card: {
    //maxWidth: "100%"
    maxHeight: 400,
    minHeight: 300
  },
  media: {
    height: 0
    //paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default props => {
  const classes = useStyles();
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);
  //
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const removeHandler = () => {
    setExpanded(!expanded);
  };
  const createControl = (ctrList, _id, direction) => {
    //step1: select control type->step2: select template/create new
    //->step3: edit control
    //->step4-1: save control ->save to control list, return to edit menu,
    //->step4-2: cancel -> return to edit menu
    // setOpen1(!open1);
    // setOpen(true);
    // console.log(open, open1);
    console.log("im click");
    history.push("/controls", { params: "Hello World" });
  };
  const resizeControl = (ctrList, _id, direction) => {
    console.log(_id, direction);
    _.each(ctrList, function(value, key) {
      if (value._id === _id) {
        console.log(value.size);
        switch (direction) {
          case "left":
            if (value.size > 3) value.size = value.size - 1;
            break;
          case "right":
            if (value.size < 12) value.size = value.size + 1;
            break;
        }
        console.log(value, value.size);
      }
    });
    dispatch(globalVariable({ control: ctrList }));
    forceUpdate();
  };
  console.log(open);
  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="edit">
            <EditIcon
              onClick={() => createControl(props.ctrList, props.data._id)}
            />
          </IconButton>{" "}
          <IconButton aria-label="delete">
            <DeleteIcon
              onClick={() => props.removeControl(props.ctrList, props.data._id)}
            />
          </IconButton>
          <IconButton aria-label="delete">
            <ArrowLeft
              onClick={() =>
                resizeControl(props.ctrList, props.data._id, "left")
              }
            />
          </IconButton>
          <IconButton aria-label="delete">
            <ArrowRight
              onClick={() =>
                resizeControl(props.ctrList, props.data._id, "right")
              }
            />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      {/* <ControlList
        id={props.data.ctrid}
        type={props.data.type}
        status={open}
        status1={open1}
      /> */}
    </>
  );
};
