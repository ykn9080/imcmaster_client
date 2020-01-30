import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const initialState = {
  selected: "",
  nestSelect: "",
  children: [],
  active: ""
};

class NestedNav extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleClick = title => {
    this.setState({ ...initialState });
  };

  mappedChildren = (child, selectedTitle) => {
    const { nestedParentClass } = this.props;
    let childElement;

    if (child) {
      childElement = child.map(({ id, title, children, url }) => (
        <li
          key={id}
          id={id}
          className={
            nestedParentClass +
            (this.state.nestSelect === title ? "nest-selected" : "")
          }
          url={url}
        >
          <Link to={"/"}>{title}</Link>
          {children ? (
            <FontAwesomeIcon
              onClick={() => this.mappedChildren(children, this.state.select)}
              className="i button"
              icon="arrow-circle-down"
            />
          ) : null}
        </li>
      ));
      this.setState({
        selected: selectedTitle,
        children: childElement,
        active: "true"
      });
    }
    return "";
  };

  navListItems = data =>
    data.map(({ id, url, children, title, icon }) => {
      const { parentClass } = this.props;
      return (
        <li
          key={id}
          id={id}
          className={
            parentClass + (this.state.selected === title ? "selected" : "")
          }
          url={url}
        >
          <i onClick={this.handleClick}>{icon}</i>
          <Link to={"/"}>
            <span>{title}</span>
          </Link>
          {children ? (
            <FontAwesomeIcon
              onClick={() => this.mappedChildren(children, title)}
              className="i button"
              icon="arrow-circle-right"
            />
          ) : null}
        </li>
      );
    });

  render() {
    const { data } = this.props;
    const active = this.state.active === "true" ? "true" : "";

    return (
      <div className={"nested-nav"}>
        <div className={"container-two-" + active}>
          <h2>{this.state.selected}</h2>
          {this.state.children}
        </div>
        <div className="container-one">{this.navListItems(data)}</div>
      </div>
    );
  }
}




const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };
  
  let data = [
    {
      title: "Top level 1",
      slug: "top-level-1",
      children: [
        {
          title: "Sub level 1",
          slug: "sub-level-1",
          children: [
            {
              title: "Sub Sub Level 1",
              slug: "sub-sub-level-1",
              children: [
                {
                  title: "Sub Sub Level 2",
                  slug: "sub-sub-level-2",
                  children: [
                    {
                      title: "Sub Sub Level 23",
                      slug: "sub-sub-level-23"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Sub level 2",
          slug: "sub-level-2"
        }
      ]
    },
    {
      title: "Top level 2",
      slug: "top-level 2"
    }
  ];
  
  export const Menu = ({ data }) => {
    return (
      <ul>
        {data.map(m => {
          return (
            <li>
              {m.title}
              {m.children && <Menu data={m.children} />}
            </li>
          );
        })}
      </ul>
    );
  };
  
  
  export const Recur = () => {
    return (
        <Menu data={data} />
      </div>
    );
  };

  



export default NestedNav;
