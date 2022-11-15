import { useSelector } from "react-redux";

function HostingList() {
    const hostingSpots = useSelector(state => state.spots.hostSpots);
}

export default HostingList;
