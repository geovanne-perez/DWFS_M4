exports.reservas = generateRandomReservations();

function generateRandomReservations() {
    let reserva = [];

    for (let i = 1; i <= 20; i++) {
        let reservation = {
            id: i,
            hotelName: getRandomHotel(),
            date_start: getRandomDate(),
            date_end: getRandomDate(),
            room_type: getRandomRoomType(),
            status: getRandomStatus(),
            guest_count: getRandomGuestCount()
        };
        reservation.date_end = getRandomEndDate(reservation.date_start);
        reserva.push(reservation);
    }
    return reserva;
}

function getRandomHotel() {
    const Hotels = ["Holiday Inn", "Fiesta Inn", "Marriot Inn", "Motel Quick"];
    const randomIndex = Math.floor(Math.random() * Hotels.length);
    return Hotels[randomIndex];
}

function getRandomDate() {
    const start = new Date(2024, 2, 10);
    const end = new Date(2024, 11, 31);
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
}
function getRandomEndDate(startdate){
    const start = new Date(startdate);
    const end = new Date(2024, 12, 31);
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
}
function getRandomRoomType() {
    const roomTypes = ["Suite Presidencial", "Suite Familiar", "Habitación Doble", "Habitación Individual"];
    const randomIndex = Math.floor(Math.random() * roomTypes.length);
    return roomTypes[randomIndex];
}
function getRandomStatus() {
    const statuses = ["confirmed", "pending", "cancelled"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
}
function getRandomGuestCount() {
    return Math.floor(Math.random() * 4) + 1;
}