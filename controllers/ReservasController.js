// Call function generateRandomReservations() to generate random reservations
const GenReservas = require('../models/reservasRandom')
const reservas = GenReservas.reservas


// Obtener todas las reservas
exports.GetAll = async (req, res) => {
    res.json(
        {
            msg:'Reservas obtenidas correctamente',
            data: reservas
        }
    );
}

//Obtener una reserva en específico 
exports.GetReservation = async (req, res) => {
    const id = parseInt(req.params.id);
    const reserva = reservas.find(reserva => reserva.id === id);

    if (reserva) {
        res.json({
            msg: 'Reserva obtenida correctamente',
            data: reserva
        });
    } 
    else {
        res.status(404).json({
            msg: 'Reserva no encontrada'
        });
    }
}

// Obtener reservas por hotel
exports.GetReservationsByHotel = async (req, res) => {
    const hotelName = req.params.hotelName;
    console.log(`Get reservations from hotel: ${hotelName}`);
    const reservasPorHotel = reservas.filter(reserva => reserva.hotelName === hotelName);
    if (reservasPorHotel.length > 0) {
        res.json({
            msg: 'Reservas obtenidas correctamente',
            data: reservasPorHotel
        });
    }
    else {
        res.status(404).json({
            msg: 'Reservas no encontradas'
        });
    }
}

//obtener reservas por fechas
exports.GetReservationsByDates = async (req, res) => {
    const fechaInicial = new Date(req.params.date_start);
    const fechafinal = new Date(req.params.date_end);
    console.log(`Get reservations by dates between ${fechaInicial} and ${fechafinal}`);

    const ReservasPorFecha = reservas.filter(reserva => {
        const reservaFechaInicial = new Date(reserva.date_start);
        const reservaFechaFinal = new Date(reserva.date_end);
        return reservaFechaInicial >= fechaInicial && reservaFechaFinal <= fechafinal;
    });
    
    if (ReservasPorFecha.length > 0) {
        res.json({
            msg: `Reservas obtenidas en fechas: ${fechaInicial} y ${fechafinal}`,
            data: ReservasPorFecha
        });
    } else {
        res.status(404).json({
            msg: 'Sin reservas encontradas'
        });
    }
}

//Obtener reservas por estatus
exports.GetReservationsByStatus = async (req,res) => {
    const status = req.params.status;
    const ReservationsByStatus = reservas.filter(reserva => reserva.status === status)

    if (ReservationsByStatus.length > 0){
        res.json({
            msg: `${ReservationsByStatus.length} Reservas con estatus ${status} encontradas`,
            data: ReservationsByStatus
        })
    }
    else{
        res.status(404).json({
            msg: `No se encontraron reservas con el estatus ${status}`
        })
    }
}

//Obtener reservas por tipo de Habitación
exports.GetReservationsByRoomType = async (req,res) => {
    const Roomtype = req.params.Roomtype;
    const ReservationsByRoomtype = reservas.filter(reserva => reserva.room_type === Roomtype)

    if (ReservationsByRoomtype.length > 0){
        res.json({
            msg: `${ReservationsByRoomtype.length} Reservas con tipo de habitación ${Roomtype} encontradas`,
            data: ReservationsByRoomtype
        })
    }
    else{
        res.status(404).json({
            msg: `No se encontraron reservas con el tipo de habitación ${Roomtype}`
        })
    }

}



exports.GetAll = async (req, res) => {
    res.json(
        {
            msg:'Reservas obtenidas correctamente',
            data: reservas
        }
    );
}

// Crear una reserva
exports.CreateReservation = async (req, res) => {
    const reserva = req.body;
    // Validar que la reserva tenga los campos necesarios
    if (reserva.hotelName && reserva.date_start && reserva.date_end && reserva.room_type && reserva.status && reserva.guest_count) {
        reserva.id = reservas.length + 1;
        reservas.push(reserva);
        res.json({
            msg: 'Reserva creada correctamente',
            data: reserva
        });
    } else {
        res.status(400).json({
            msg: 'Faltan campos necesarios para crear la reserva'
        });
    }   
}

// Actualizar una Reserva

exports.UpdateReservation = async (req,res) => {
    const reserva = req.body;
    if (reserva.hotelName && reserva.date_start && reserva.date_end && reserva.room_type && reserva.status && reserva.guest_count) {
        
        // Buscar la reserva a actualizar
        const id = parseInt(req.params.id);
        const index = reservas.findIndex(reserva => reserva.id === id);
        if (index !== -1) {
            reservas[index] = reserva;
            res.json({
                msg: 'Reserva actualizada correctamente',
                data: reserva
            });
        } else {
            res.status(404).json({
                msg: 'Reserva no encontrada'
            });
        }
        
    } else {
        res.status(400).json({
            msg: 'Faltan campos necesarios para crear la reserva'
        });
    }   

}

// Eliminar una reserva

exports.DeleteReservation = async (req,res) => {
    const id = parseInt(req.params.id);
    const index = reservas.findIndex(reserva => reserva.id === id);
    if (index !== -1) {
        reservas.splice(index, 1);
        res.json({
            msg: 'Reserva eliminada correctamente'
        });
    } else {
        res.status(404).json({
            msg: 'Reserva no encontrada'
        });
    }
}



// Entregar con Vercel o Netlify


