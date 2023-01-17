import React from "react";
import 'components/Appointment/styles.scss'
import Header from "./header";
import Show from "./show";
import Empty from "./empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./form";
import Status from "./status";
import Confirm from "./confirm";
import Error from "./error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING";
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = 'EDIT'
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"


  const { mode, transition, back } = useVisualMode(
    (props.interview || props.time === '5pm') ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function deleting() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  function edit() {
    transition(EDIT)
  }


  return (
    <>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            transition(CONFIRM)
          }}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status isSaving
        />
      )}

      {mode === DELETING && (
        <Status
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          onConfirm={deleting}
          onCancel={() => back()}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message='Can not delete appointment'
          onClose={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message='Can not save appointment'
          onClose={() => back()}
        />
      )}
    </>
  )
}