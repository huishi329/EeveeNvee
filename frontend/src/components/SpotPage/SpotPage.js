import React from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotDetail } from "../../store/spot";
import { setNavbar, restoreNavbar } from "../../store/style";
import SpotDetail from '../SpotDetail';
import ReviewPanel from '../ReviewPanel/ReviewPanel';

function SpotPage() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot)
    useEffect(() => {
        dispatch(setNavbar());
        dispatch(getSpotDetail(spotId));
        return () => dispatch(restoreNavbar());
    }, [dispatch, spotId]);

    if (!spot) return null;

    return (
        <>
            <SpotDetail spot={spot} />
            <ReviewPanel spot={spot} />
        </>
    )
};

export default SpotPage;
