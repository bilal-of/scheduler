
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