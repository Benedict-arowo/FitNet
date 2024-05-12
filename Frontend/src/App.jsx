import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

console.log();
function App() {
	const [position, setPosition] = useState([6.5244, 3.3792]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setPosition([position.coords.latitude, position.coords.longitude]);
		});
	}, []);

	useEffect(() => {
		console.log(position);
	}, [position]);

	return (
		<div>
			<h1 className="text-3xl font-bold underline">MakeFit!</h1>
			<MapContainer
				className="h-[500px]"
				center={position}
				zoom={13}
				scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}>
					<Popup>
						You are here! <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}

export default App;
