const express = require('express')
const router = express.Router()

const ReservasController = require('../controllers/ReservasController')

/**
 * @swagger
 * components:
 *   schemas:
 *     Reserva:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: El identificador único de la reserva
 *         hotelName:
 *           type: string
 *           description: El nombre del hotel reservado
 *         date_start:
 *           type: string
 *           format: date
 *           description: La fecha de inicio de la reserva
 *         date_end:
 *           type: string
 *           format: date
 *           description: La fecha de fin de la reserva
 *         room_type:
 *           type: string
 *           description: El tipo de habitación reservada
 *         status:
 *           type: string
 *           description: El estado de la reserva (por ejemplo, confirmada, pendiente, cancelada, etc.)
 *         guest_count:
 *           type: integer
 *           description: El número de huéspedes que se alojarán en la habitación
 *       required:
 *         - id
 *         - hotelName
 *         - date_start
 *         - date_end
 *         - room_type
 *         - status
 *         - guest_count
 *       example:
 *         id: 1
 *         hotelName: Hotel California
 *         date_start: "2024-01-01"
 *         date_end: "2024-01-03"
 *         room_type: Suite
 *         status: confirmed
 *         guest_count: 2
 */


/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags: [Reservas]
 *     responses:
 *       200:
 *         description: Regresa todas las reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reserva'
 *
 */
router.get('/', ReservasController.GetAll)


/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Obtener una reserva en específico
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID único de la reserva
 *     responses:
 *       200:
 *         description: Reserva obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id', ReservasController.GetReservation)



/**
 * @swagger
 * /api/reservas/hotels/{hotelName}:
 *   get:
 *     summary: Obtener reservas de un hotel en específico
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: hotelName
 *         schema:
 *           type: string
 *           enum: [Holiday Inn, Fiesta Inn, Marriot Inn, Motel Quick]
 *         required: true
 *         description: Hotel Name
 *     responses:
 *       200:
 *         description: Reservas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       404:
 *         description: Reservas no encontradas
 */
router.get('/hotels/:hotelName',ReservasController.GetReservationsByHotel)


//add swagger documentation to the get by dates endpoint
/**
 * @swagger
 * /api/reservas/dates/{date_start}/{date_end}:
 *   get:
 *     summary: Obtener reservas por fechas
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: date_start
 *         schema:
 *           type: string
 *         required: true
 *         description: Fecha de inicio
 *       - in: path
 *         name: date_end
 *         schema:
 *           type: string
 *         required: true
 *         description: Fecha de fin
 *     responses:
 *       200:
 *         description: Reservas obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       404:
 *         description: Reservas no encontradas
 */
router.get('/dates/:date_start/:date_end',ReservasController.GetReservationsByDates)

//add swagger documentation to the get by status endpoint
/**
 * @swagger
 * /api/reservas/status/{status}:
 *   get:
 *     summary: Obtener reservas por status
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string 
 *           enum: [confirmed, pending, cancelled]
 *         required: true
 *         description: Status    
 *     responses:
 *       200:
 *         description: Reservas obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       404:
 *         description: Reservas no encontradas
 */
router.get('/status/:status',ReservasController.GetReservationsByStatus)

//add swagger documentation to the get by room type endpoint
/**
 * @swagger
 * /api/reservas/roomtype/{Roomtype}:
 *   get:
 *     summary: Obtener reservas por tipo de habitación
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: Roomtype
 *         schema:
 *           type: string
 *           enum: [Suite Presidencial, Suite Familiar, Habitación Doble, Habitación Individual]
 *         required: true
 *         description: Room Type
 *     responses:
 *       200:
 *         description: Reservas obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       404:
 *         description: Reservas no encontradas
 */
router.get('/roomtype/:Roomtype',ReservasController.GetReservationsByRoomType)

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crear una reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reserva'
 *     responses:
 *       200:
 *         description: Reserva creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Faltan campos necesarios para crear la reserva
 */
router.post('/', ReservasController.CreateReservation)


/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Actualizar una reserva
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID único de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reserva'
 *     responses:
 *       200:
 *         description: Reserva actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Faltan campos necesarios para actualizar la reserva
 */
router.put('/:id', ReservasController.UpdateReservation)


// Add swagger documentation to the delete endpoint
/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID único de la reserva
 *     responses:
 *       200:
 *         description: Reserva eliminada correctamente
 *       404:
 *         description: Reserva no encontrada
 */
router.delete('/:id', ReservasController.DeleteReservation)

module.exports = router