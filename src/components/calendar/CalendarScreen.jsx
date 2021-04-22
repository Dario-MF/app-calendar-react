import React, { useState } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import { CalendarModal } from './CalendarModal';
import { CalendarEvent } from './CalendarEvent';
import { NavBar } from '../ui/NavBar';
import { messages } from '../../helpers/calendar-esp';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

const localizer = momentLocalizer(moment);
const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#f5f7',
    user: {
        id: 123,
        name: 'Dario'
    }
}]

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            border: '0px',
            opacity: 0.8,
            display: 'block',
            color: '#fff'
        }
        return { style }
    };
    const onDoubleClick = (event) => {
        console.log(event)
    };
    const onSelectEvent = (event) => {
        console.log(event)
    }
    const onViewChange = (event) => {
        setLastView(event);
        localStorage.setItem('lastView', event);
    }

    return (
        <div className='calendar-screen'>
            <NavBar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                view={ lastView }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                components={{
                    event: CalendarEvent
                }}
            />


            <CalendarModal />
        </div>
    );
};
