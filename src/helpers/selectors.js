
export function getAppointmentsForDay(state, day) {
  const findDay = state.days.find(currentDay => currentDay.name === day); 
  if (!findDay) {
    return []
  } 
  const findAppointment = findDay.appointments.map((id) => {
    return state.appointments[id]
  })
  return findAppointment;
} 

export function getInterview(state, interview) { 

  if (!interview) {
    return null
  } 
  return {student: interview.student, interviewer: state.interviewers[interview.interviewer]} 
}

export function getInterviewersForDay(state, day) {
  const findDay = state.days.find(currentDay => currentDay.name === day); 
  if (!findDay) {
    return []
  } 
  const findInterviewer = findDay.interviewers.map((id) => {
    return state.interviewers[id]
  })
  return findInterviewer;
} 