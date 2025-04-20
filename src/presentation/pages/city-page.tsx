import { useParams } from "react-router";

export function CityPage() {
    const city = useParams().city;
    return (
        <div>
            <h1>City</h1>
            <p>Welcome to the {city} page!</p>
        </div>
    );
}