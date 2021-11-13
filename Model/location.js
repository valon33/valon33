function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position =>
                resolve({
                    coords: {
                        accuracy: position.coords.accuracy,
                        altitude: position.coords.altitude,
                        altitudeAccuracy: position.coords.altitudeAccuracy,
                        heading: position.coords.heading,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        speed: position.coords.speed
                    },
                    timestamp: position.timestamp
                })
            );
        } else {
            reject(new Error("Browser does not support geolocation!"));
        }
    });
}

export async function getCoords() {
    try {
        const data = await getLocation();
        const cords = {
            lat: data.coords.latitude,
            long: data.coords.longitude
        };
        return cords;
    } catch (err) {
        console.log(err);
    }
}

// getCoords();
