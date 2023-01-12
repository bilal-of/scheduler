import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames"; 

function formatSpace(spots) {
  if (spots === 0) {
    return 'no spots remaining'
  }
  if (spots === 1) {
    return '1 spot remaining'
  }  
  if (spots > 1) {
    return `${spots} spots remaining`
  } 
}

export default function DayListItem(props) {  
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots 
  }); 
  return (
    <li onClick={() => props.setDay(dayClass)} 
    className={dayClass}
    > 
    
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpace(props.spots)}</h3>
    </li>
  );
}