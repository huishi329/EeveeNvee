import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './SpotBooking.css';
import { DateRangePicker } from 'react-dates';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../store/bookings';
import { getSpotBookings } from '../../store/bookings';
import { Modal } from '../../context/Modal';
import ReservationConfirmation from '../ReservationConfirmation/ReservationConfirmation';

export default function SpotBooking({ spot, reviewRef }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const spotBookings = useSelector(state => state.bookings.spot);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [calendarPosition, setCalendarPosition] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);
    const [cleaningFee, setCleaningFee] = useState(0);
    const [days, setDays] = useState(0);
    const [total, setTotal] = useState(0);
    const [errors, setErrors] = useState([]);
    const [showReservation, setShowReservation] = useState(false);
    const [reservation, setReservation] = useState(null);
    const wrapperRef = useRef(null);
    console.log(reservation);

    const handleReservation = () => {
        dispatch(createBooking(spot.id, { startDate, endDate, serviceFee, cleaningFee, total }))
            .then((res) => {
                setReservation(res);
                setShowReservation(true);
            })
            .catch(async (res) => {
                console.log(res);
                // const data = await res.json();
                // if (data && data.errors) setErrors(Object.values(data.errors));
            });

    }

    const isDayBlocked = (day) => {
        if (!spotBookings) return false;
        for (const booking of Object.values(spotBookings)) {
            const start = new Date(booking.startDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(booking.endDate);
            end.setHours(0, 0, 0, 0);
            if (start <= day && day < end) return true;
        };
        return false;
    }


    useEffect(() => {
        dispatch(getSpotBookings(spot.id));
        if (startDate && endDate) {
            const days = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
            setDays(days);
            const basePrice = days * spot.price;
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
    }, [wrapperRef, windowWidth, startDate, endDate, serviceFee, cleaningFee, total, spot.price])

    if (!user || !spotBookings) return null;

    return (

        <div className="edit_spot" ref={wrapperRef}>
            <div className="spot_info">
                <div className="spot_info_left">
                    <div className="price_bold">{`$${spot.price} CAD`}</div>
                    <div className="night">night</div>
                </div>
                <div className="spot_info_right">
                    <span
                        onClick={() => {
                            reviewRef.current.scrollIntoView();
                        }}
                        style={{ color: '#6B7070', cursor: 'pointer' }}>
                        {`${spot.numReviews} reviews`}
                    </span>
                </div>
            </div>
            <div className='date_picker'>
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
            </div>
            {errors.length > 0 &&
                <div className='errors-div'>
                    {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                </div>}
            <div>
                {user.id === spot.ownerId ?
                    <button className="booking_button" onClick={() => alert('You cannot book your own spot!')}>Check Availability</button>
                    :
                    (!startDate || !endDate) ?
                        <button className="booking_button">Check Availability</button>
                        :
                        <button className="booking_button" onClick={handleReservation}>Reservation</button>}
            </div>
            {days > 0 &&
                <div className='price_info'>
                    <div className="price_detail">
                        <div className="price_item">
                            <div>${spot.price} CAD x {days} nights</div>
                            <div>${spot.price * days} CAD</div>
                        </div>
                        <div className="price_item">
                            <div>Cleaning fee</div>
                            <div>${cleaningFee} CAD</div>
                        </div>
                        <div className="price_item">
                            <div>Service fee</div>
                            <div>${serviceFee} CAD</div>
                        </div>
                    </div>
                    <div className='price_total'>
                        <div>Total</div>
                        <div>${total} CAD</div>
                    </div>
                </div>}
            {showReservation &&
                <Modal onClose={() => setShowReservation(false)}>
                    <ReservationConfirmation
                        spot={spot}
                        reservation={reservation}
                        setShowReservation={setShowReservation} />
                </Modal>
            }
        </div>
    )
}
