import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './SpotBooking.css';
import { DateRangePicker } from 'react-dates';
import { useEffect, useRef, useState } from 'react';

export default function SpotBooking({ spot, reviewRef }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [calendarPosition, setCalendarPosition] = useState(0);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (wrapperRef.current) {
            setCalendarPosition(windowWidth - wrapperRef.current.getBoundingClientRect().right);
        }
        const updateSize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize)
    }, [wrapperRef, windowWidth])

    return (

        <div className="edit-spot" ref={wrapperRef}>
            <div className="spot-info">
                <div className="spot-info-left">
                    <div className="price-bold">{`$${spot.price} CAD`}</div>
                    <div className="night">night</div>
                </div>
                <div className="spot-info-right">
                    <span
                        onClick={() => {
                            reviewRef.current.scrollIntoView();
                        }}
                        style={{ color: '#6B7070', cursor: 'pointer' }}>
                        {`${spot.numReviews} reviews`}
                    </span>
                </div>
            </div>
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
            <div>
                {(!startDate || !endDate) ?
                    <button className="booking-button">Check Availability</button>
                    :
                    <button className="booking-button">Reservation</button>}
            </div>
            <div className='price-info'>

            </div>
        </div>

    )
}
