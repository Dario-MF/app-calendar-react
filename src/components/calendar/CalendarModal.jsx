import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import Swal from 'sweetalert2';
import './modal.css';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endDate = now.clone().add(1, 'hours');

export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(endDate.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: now.toDate(),
        end: endDate.toDate()
    });

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if (dateStart !== null) {
            setDateEnd(moment(dateStart).add(1, 'hours').toDate())
        }
    }, [dateStart]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };

    const handleStartDateChange = (event) => {
        console.log(event)
        setDateStart(moment(event).toDate());
        setFormValues({
            ...formValues,
            start: event
        });
    };

    const handleEndDateChange = (event) => {
        setDateEnd(event);
        setFormValues({
            ...formValues,
            end: event
        });
    };

    const closeModal = () => {
        // TODO: cerrar modal.
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end);
        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire('Error', 'La fecha/hora debe ser mayor a la de inicio', 'error')
            return;
        }
        if (title.trim().length < 2) {
            setTitleValid(false);
            console.log(titleValid)
            return;
        }
        //TODO: realizar grabación en DB.

        setTitleValid(true);
        closeModal();
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Modal
                isOpen={true}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={200}
                className="modal"
                overlayClassName="modal-fondo"
            >
                <h3>Nuevo evento</h3>
                <hr />
                <form className="container" onSubmit={handleSubmitForm}>
                    <div className="form-group">
                        <KeyboardDateTimePicker
                            inputVariant="outlined"
                            ampm={false}
                            label="Fecha y hora inicio"
                            value={dateStart}
                            onChange={handleStartDateChange}
                            format="MMMM dd yyyy, HH:mm "
                        />
                    </div>
                    <div className="form-group">
                        <KeyboardDateTimePicker
                            inputVariant="outlined"
                            ampm={false}
                            label="Fecha y hora fin"
                            value={dateEnd}
                            onChange={handleEndDateChange}
                            minDate={dateStart}
                            minDateMessage="End Date should be at least start Date "
                            format="MMMM dd yyyy, HH:mm "
                        />
                    </div>
                    <hr />
                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className={`form-control ${!titleValid && 'is-invalid'}`}
                            placeholder="Título del evento"
                            name="title"
                            value={title}
                            onChange={handleInputChange}
                            autoComplete="off" />
                        <small id="emailHelp" className="form-text text-muted"> Una descripción corta </small>
                    </div>
                    <div className="form-group">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={notes}
                            onChange={handleInputChange}
                        >
                        </textarea>
                        <small id="emailHelp" className="form-text text-muted"> Información adicional </small>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    ><i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </form>
            </Modal>
        </MuiPickersUtilsProvider>
    );
};
