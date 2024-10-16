const { Center, Sport, Court, Booking } = require('../models/bookingModel'); // Assuming models are exported from the same directory

// Helper function to check if the booking overlaps with existing bookings
const isOverlappingBooking = async (courtId, startTime, endTime) => {
    const existingBookings = await Booking.find({
        court: courtId,
        $or: [
            { startTime: { $lt: endTime, $gte: startTime } }, // Overlap with start
            { endTime: { $gt: startTime, $lte: endTime } },   // Overlap with end
            { startTime: { $lt: startTime }, endTime: { $gt: endTime } } // Envelops the booking
        ]
    });
    return existingBookings.length > 0;
};

// Controller to add a new booking
const addBooking = async (req, res) => {
    try {
        const { courtId, startTime, customerName } = req.body;

        // Input validation
        if (!courtId || !startTime || !customerName) {
            return res.status(400).json({ error: 'Court ID, start time, and customer name are required.' });
        }

        // Convert startTime to Date object and calculate endTime
        const start = new Date(startTime);
        const end = new Date(start.getTime() + 60 * 60 * 1000); // 60-minute booking slot

        // Check if the court exists
        const court = await Court.findById(courtId);
        if (!court) {
            return res.status(404).json({ error: 'Court not found.' });
        }

        // Check for overlapping bookings
        const isOverlapping = await isOverlappingBooking(courtId, start, end);
        if (isOverlapping) {
            return res.status(409).json({ error: 'Court is already booked for this time slot.' });
        }

        // Create the booking
        const newBooking = new Booking({
            court: courtId,
            startTime: start,
            endTime: end,
            customerName
        });

        // Save the booking to the database
        await newBooking.save();

        // Add the booking to the court's list of bookings
        court.bookings.push(newBooking._id);
        await court.save();

        return res.status(201).json({
            message: 'Booking created successfully',
            booking: newBooking
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to view all bookings for a specific court
const viewBookingsByCourt = async (req, res) => {
    try {
        const { courtId } = req.params;

        // Check if the court exists
        const court = await Court.findById(courtId).populate('bookings');
        if (!court) {
            return res.status(404).json({ error: 'Court not found.' });
        }

        return res.status(200).json({
            message: 'Bookings retrieved successfully',
            bookings: court.bookings
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to fetch all centers, fully populated up to courts (excluding bookings)
const getAllCenters = async (req, res) => {
    try {
        // Find all centers and populate their sports and courts, but not bookings
        const centers = await Center.find()
            .populate({
                path: 'sports',
                populate: {
                    path: 'courts',
                    select: '-bookings' // Exclude bookings
                }
            });

        if (!centers.length) {
            return res.status(404).json({ error: 'No centers found.' });
        }

        return res.status(200).json({
            message: 'All centers data retrieved successfully',
            centers
        });
    } catch (error) {
        console.error('Error fetching centers data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addBooking,
    viewBookingsByCourt,
    getAllCenters
};
