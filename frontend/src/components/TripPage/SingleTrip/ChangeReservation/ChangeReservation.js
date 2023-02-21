import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ChangeReservation.module.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './ChangeReservationCalendar.css';
import { DateRangePicker } from 'react-dates';
import { getSpotDetail } from '../../../../store/spots';
import { getSpotBookings, updateBooking } from '../../../../store/bookings';

export default function ChangeReservation({ booking, setShowModal, setShowChangeReservation }) {
    const spotBookings = useSelector(state => state.bookings.spot);
    const spot = useSelector(state => state.spots.singleSpot);
    const [startDate, setStartDate] = useState(moment(booking.startDate));
    const [endDate, setEndDate] = useState(moment(booking.endDate));
    const [focusedInput, setFocusedInput] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [calendarPosition, setCalendarPosition] = useState(0);
    const [serviceFee, setServiceFee] = useState(booking.serviceFee);
    const [cleaningFee, setCleaningFee] = useState(booking.cleaningFee);
    const [days, setDays] = useState(Math.round((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24)));
    const [total, setTotal] = useState(booking.total);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);

    const closeModal = () => {
        setShowChangeReservation(false);
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        setErrors([]);
        dispatch(updateBooking(booking.id, booking.Spot, { startDate, endDate, serviceFee, cleaningFee, total }))
            .then(() => closeModal())
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    };

    const isDayBlocked = (day) => {
        if (!spotBookings) return false;
        for (const booking of Object.values(spotBookings)) {
            const start = new Date(booking.startDate);
            const end = new Date(booking.endDate);
            if (start <= day && day < end) return true;
        };
        return false;
    };

    const handleClick = () => {
        setFocusedInput('startDate');
    };


    useEffect(() => {
        dispatch(getSpotDetail(booking.spotId));
        dispatch(getSpotBookings(booking.spotId));
        if (startDate && endDate) {
            const days = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
            setDays(days);
            const basePrice = days * spot?.price;
            setServiceFee(Math.round(basePrice * 0.15));
            setCleaningFee(Math.round(basePrice * 0.1));
            setTotal(basePrice + serviceFee + cleaningFee);
        }
        if (wrapperRef.current) {
            setCalendarPosition(windowWidth - wrapperRef.current.getBoundingClientRect().right);
        }
        const updateSize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize)
    }, [wrapperRef, windowWidth, startDate, endDate, serviceFee, cleaningFee, total, dispatch, booking.spotId, spot?.price])

    if (!spotBookings || !spot) return null;

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <i className="fa-solid fa-xmark" onClick={() => setShowModal(false)}></i>
                    <h2>Change Reservation</h2>
                    <i></i>
                </div>
                <div className={styles.message}>Plan change? No worries, we got you!</div>

                <div className={styles.datePicker} >
                    <DateRangePicker
                        startDate={startDate} // momentPropTypes.momentObj or null,
                        startDateId="start_date_id" // PropTypes.string.isRequired,
                        startDatePlaceholderText="CHECK-IN" // PropTypes.string,
                        endDate={endDate} // momentPropTypes.momentObj or null,
                        endDatePlaceholderText="CHECKOUT" // PropTypes.string,
                        endDateId="end_date_id" // PropTypes.string.isRequired,
                        customArrowIcon={<i></i>} // PropTypes.node,
                        regular={true} // PropTypes.bool,
                        onDatesChange={({ startDate, endDate }) => {
                            setStartDate(startDate);
                            setEndDate(endDate);
                        }} // PropTypes.func.isRequired,
                        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                        hideKeyboardShortcutsPanel={true} //PropTypes.bool,
                        // withPortal={true} // PropTypes.bool,
                        horizontalMargin={calendarPosition} //PropTypes.number,
                        isDayBlocked={isDayBlocked} //PropTypes.func,
                    />
                    {(!focusedInput && (startDate || !endDate)) &&
                        <button className={styles.bookingButton} onClick={handleClick}>Check Availability</button>}

                </div>
                {errors.length > 0 &&
                    <div className={styles.errorDiv}>
                        {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                    </div>}
                {days > 0 &&
                    <div className={styles.priceInfo}>
                        <div className={styles.priceTitle}>Current booking breakdown</div>
                        <div className={styles.priceDetail}>
                            <div className={styles.priceItem}>
                                <div>${spot.price} CAD x {days} nights</div>
                                <div>${spot.price * days} CAD</div>
                            </div>
                            <div className={styles.priceItem}>
                                <div>Cleaning fee</div>
                                <div>${cleaningFee} CAD</div>
                            </div>
                            <div className={styles.priceItem}>
                                <div>Service fee</div>
                                <div>${serviceFee} CAD</div>
                            </div>
                        </div>
                        <div className={styles.priceTotal}>
                            <div>Total</div>
                            <div>${total} CAD</div>
                        </div>
                    </div>}
                <div className={styles.buttons}>
                    <div className={styles.cancel} onClick={closeModal}>Cancel</div>
                    <div className={styles.delete}
                        onClick={handleSubmit}>
                        Change Reservation
                    </div>
                </div>
            </div>
        </div >
    )
}
