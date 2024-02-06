let Reserva1 = {
    id: 1,
    hotelName: "Hotel Holiday Inn",
    date_start: "2024-01-01",
    date_end: "2024-02-15",
    room_type: "Suite Presidencial",
    status: "confirmed",
    guest_count: 2
};
let Reserva2 = {
    id: 1,
    hotelName: "Hotel Holiday Inn",
    date_start: "2024-02-01",
    date_end: "2024-02-03",
    room_type: "Suite Familiar",
    status: "confirmed",
    guest_count: 2
};
exports.GetAll = async (req, res) => {
    // Código para crear una reserva
    res.json(
        {
            msg:'Reservas obtenidas correctamente',
            data: [Reserva1, Reserva2]
        }
    );
}



// Entregar con Vercel o Netlify


