import React from 'react';
import styled from 'styled-components';
import { EventType, IStore, Stores } from '../context';
import { withContext } from '../context/Store';
import EventEditor from '../EventEditor';

interface AppProps {
    context: IStore
    rows: { date: Date, disable?: boolean, day: number }[][]
    selectedMonth: [number, number];
    onCellClick: (t: any) => void
}
interface AppState {
    name: string;
}


const formatDate = (date: Date) => {
    return Intl.DateTimeFormat("cs-CZ", {
        day: "2-digit"
    }).format(date)
}


const checkEvents = (dayEvents: EventType[], cellDate: Date) => {

    console.log(dayEvents, cellDate)

}

const EventElement = styled.div<{ color: string }>`

background: ${props => props.color};
    padding: 0.2em;
    max-width: 80px;
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
        opacity: 0.8;
    }
`


const DayEvents = ({ events, cell }: { events: EventType[], cell: { date: Date, disable?: boolean, day: number } }) => {

    console.log(cell)
    checkEvents(events, cell.date)

    return <>{events.sort((a, b) => a.from > b.from ? 1 : -1).slice(0, 4).map(ev => <EventElement color={ev.color}>{ev.from} {ev.name}</EventElement>)}</>
}

function pad(num: number, size: number) {
    let s = "000000000" + num;
    return s.substr(s.length - size);
}


const prepareCellClasses = (disable = false, today: boolean) => {

    let classes = ``

    if (disable) {
        classes = classes + " disable";
    }

    if (today) {
        classes = classes + " today";
    }

    console.log(classes)

    return classes
}




const Table = ({ rows, onCellClick, context, selectedMonth }: AppProps) => {

    const today = new Date()


    const isTodayCell = (cellDate: Date) => formatDate(today) == formatDate(cellDate)


    const [year, month] = selectedMonth

    const events = context[Stores.events]?.[`${year}-${pad(month + 1, 2)}`]


    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                </thead>
                <tbody>


                    {rows.map((cells, i) => (
                        <tr key={i}>
                            {cells.map((cell, i) =>
                                <td
                                    key={i}
                                    onClick={() => { !cell?.disable && onCellClick(cell) }}
                                    className={prepareCellClasses(cell?.disable, isTodayCell(cell.date))}>
                                    <div>{formatDate(cell.date)}</div>
                                    <DayEvents events={events?.[cell.day] ?? []} cell={cell} />
                                </td>)}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default withContext<any>(Table);
