const Trip = require("../models/tripModel");

// Lấy tất cả các trip
exports.getAllTrips = async(req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json(trips);
    } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
};

// Thêm một trip mới
exports.addTrip = async(req, res) => {
    const { cityName, tripName, guestName, time, days, price, avatar } = req.body;
    try {
        // Lưu trip mới vào database
        const newTrip = new Trip({ cityName, tripName, guestName, time, days, price, avatar });
        await newTrip.save();
        res.status(201).json(newTrip); // Trả về đối tượng trip mới
    } catch (err) {
        console.log("Lỗi khi thêm dữ liệu vào trip:", err);
        res.status(500).json({ error: "Lỗi khi thêm dữ liệu" });
    }
};

// Cập nhật thông tin của một trip dựa trên ID
exports.updateTrip = async(req, res) => {
    const { id } = req.params;
    const { cityName, tripName, guestName, time, days, price, avatar } = req.body;
    try {
        const trip = await Trip.findByIdAndUpdate(id, { cityName, tripName, guestName, time, days, price, avatar }, { new: true });
        if (!trip) {
            return res.status(404).json({ error: "Không tìm thấy trip" });
        }
        res.status(200).json(trip); // Trả về trip đã được cập nhật
    } catch (err) {
        console.error("Lỗi khi cập nhật trip:", err);
        res.status(500).json({ error: "Lỗi khi cập nhật trip" });
    }
};

// Xóa trip theo ID
exports.deleteTrip = async(req, res) => {
    const tripId = req.params.id;

    try {
        const deletedTrip = await Trip.findByIdAndDelete(tripId);
        if (!deletedTrip) {
            return res.status(404).json({ message: "Trip không tìm thấy" });
        }
        res.status(200).json({ message: "Trip đã bị xóa thành công", deletedTrip });
    } catch (error) {
        console.error("Lỗi khi xóa trip:", error);
        res.status(500).json({ message: "Có lỗi xảy ra khi xóa trip" });
    }
};