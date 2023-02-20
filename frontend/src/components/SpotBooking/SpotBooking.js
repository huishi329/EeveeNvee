import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './SpotBooking.css';
import { DateRangePicker } from 'react-dates';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../store/bookings';


export default function SpotBooking({ spot, reviewRef }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
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
    const wrapperRef = useRef(null);

    const handleReservation = () => {
        dispatch(createBooking(spot.id, { startDate, endDate, serviceFee, cleaningFee, total }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });

    }


    useEffect(() => {
        if (startDate && endDate) {
            const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
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
        </div>

    )
}
