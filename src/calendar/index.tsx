import React, { useEffect, useState } from 'react';
import Table from '../table';
import CalendarUtils from "./utils"


const prepareMonth = (year: number, month: number,) => {
    return CalendarUtils.generateDayItemForMonth(year, month)
}

const formatMonthOfWeek = (date: Date) =>
    Intl.DateTimeFormat("cs-CZ", {
        month: "long"
    }).format(date)




const Calendar = ({ onDayClick = (cell: any) => { } }) => {

    const [state, setState] = useState<[number, number] | undefined>()
    const [data, setData] = useState<any>()

    useEffect(() => {
        const now = new Date()
        const params: [number, number] = [now.getFullYear(), now.getMonth()]
        setState(params)
    }, [])

    const onCellClick = (cell: any) => {

        onDayClick(cell)
    }

    const changeMonth = (next: boolean) => (e: any) => {

        if (state) {
            const [year, month] = state
            let date = new Date(year, month)

            date.setMonth(date.getMonth() + (next ? 1 : -1))

            const params: [number, number] = [date.getFullYear(), date.getMonth()]
            setState(params)
        }

    }



    useEffect(() => {

        state && setData(prepareMonth(...state))

    }, [state])


    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "2em" }}>
                <button className='button' onClick={changeMonth(false)}>&lt;&lt;</button>
                <div style={{ padding: "0 1em" }}>
                    {<h2 className='h2'>{state?.[0]}</h2>}
                    {state && <p>{formatMonthOfWeek(new Date(...state))}</p>}
                </div>

                <button className='button' onClick={changeMonth(true)}>&gt;&gt;</button>

            </div>

            {data && state && <Table rows={data} onCellClick={onCellClick} selectedMonth={state} />}
        </div>
    );
}

export default Calendar;
