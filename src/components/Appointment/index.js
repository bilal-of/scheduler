import React from "react";
import 'components/Appointment/styles.scss' 
import Header from "./header"; 
import Show  from "./show"; 
import Empty from "./empty"; 


export default function Appointment(props) {

  return ( 
    <>
    {/* <article className="appointment"></article> */}
    <Header time={props.time}/>  
    {props.interview ? <Show student={props.interview.student} interviewer={props.interviewer} />:<Empty />}

    </>
  ) 
}