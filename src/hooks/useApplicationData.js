import {useState, useEffect} from "react";
import axios from "axios";


export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }); 
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')

    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []) 

  function updateSpots(day, appointments) { 
    //count null appointments 
    let spots = 0; 
    for (const id of day.appointments) {
      const appointment = appointments[id]; 
      if (!appointment.interview) {
        spots++;
      }
    } 
    const newDay = {...day, spots}; 
    return newDay.spots
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 
    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
        return {...day, spots: updateSpots(day, appointments)}
      }
      return day;
    }) 
    return axios.put(`/api/appointments/${id}`, {
      interview
    })
      .then((response) => { 
        setState({
          ...state,
          appointments, 
          days
        });
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 
    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
        return {...day, spots: updateSpots(day, appointments)}
      }
      return day;
    })
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        setState({
          ...state,
          appointments, 
          days
        });
      })
  } 
  return {cancelInterview, bookInterview, state, setDay}

}

