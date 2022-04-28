import React, { FormEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import "./styles.scss"
import Calendar from './calendar';
import Modal from './EventEditor/modal';
import { withContext } from './context/Store';
import { EventType, IStore, Stores } from './context';

interface Props {
  context: IStore
}

function App(props: Props) {
  const [state, setState] = useState()


  const onConfirm = (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    const events = props.context[Stores.events]

    const formData = new FormData(event.currentTarget);

    const from: any = formData.get('from')
    const to: any = formData.get('to')
    const date: any = formData.get('date')
    const name: any = formData.get('name')
    const color: any = formData.get('color')


    const key = date?.slice(0, 7)
    const day = Number(date?.slice(8))

    const newEvent: EventType = {
      color,
      from,
      to,
      name
    }

    const dayEvents = events[key as string]?.[day] ?? []

    if (key) {
      props.context.set(Stores.events, { [key as string]: { ...events[key as string], [day]: [...dayEvents, newEvent] } })
      setState(undefined)
    }
  }

  return (
    <div className="App">
      {state && <Modal data={state} onClickOutside={() => setState(undefined)} onConfirm={onConfirm} />}
      <Calendar onDayClick={(cell) => setState(cell)} />
    </div>
  );
}

export default withContext<any>(App);
