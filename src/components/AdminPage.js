import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPage = () => {
    const [trips, setTrips] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [formData, setFormData] = useState({
        tripName: "",
        time: "",
        days: "",
        price: "",
        avatar: "",
    });

    const apiBaseUrl = "https://ktg-ktdt.onrender.com/api/trips";

    // Lấy danh sách trips từ API
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get(apiBaseUrl);
                setTrips(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu trips:", error);
            }
        };
        fetchTrips();
    }, []);

    // Hiển thị modal
    const handleShowModal = (trip = null) => {
        setSelectedTrip(trip);
        setFormData(
            trip
                ? { ...trip }
                : {
                      tripName: "",
                      time: "",
                      days: "",
                      price: "",
                      avatar: "",
                  }
        );
        setShowModal(true);
    };

    // Đóng modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTrip(null);
    };

    // Gửi dữ liệu thêm hoặc sửa trip
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu
        if (!formData.tripName || !formData.time || !formData.days || !formData.price || !formData.avatar) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        try {
            if (selectedTrip) {
                // Cập nhật trip
                const response = await axios.put(`${apiBaseUrl}/${selectedTrip._id}`, formData);
                if (response.status === 200) {
                    setTrips((prev) =>
                        prev.map((trip) =>
                            trip._id === selectedTrip._id ? { ...trip, ...response.data } : trip
                        )
                    );
                    handleCloseModal();
                }
            } else {
                // Thêm trip mới
                const response = await axios.post(apiBaseUrl, formData);
                if (response.status === 201) {
                    setTrips((prev) => [...prev, response.data]);
                    handleCloseModal();
                }
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
        }
    };

    // Xóa trip
    const handleDelete = async (tripId) => {
        try {
            await axios.delete(`${apiBaseUrl}/${tripId}`);
            setTrips((prev) => prev.filter((trip) => trip._id !== tripId));
        } catch (error) {
            console.error("Lỗi khi xóa trip:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Quản lý Trips</h1>
            <Button variant="primary" onClick={() => handleShowModal()} className="mb-3">
                Thêm Trip
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Trip Name</th>
                        <th>Time</th>
                        <th>Days</th>
                        <th>Price</th>
                        <th>Avatar</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map((trip, index) => (
                        <tr key={trip._id}>
                            <td>{index + 1}</td>
                            <td>{trip.tripName}</td>
                            <td>{new Date(trip.time).toLocaleString()}</td>
                            <td>{trip.days}</td>
                            <td>{trip.price}</td>
                            <td>
                                <img src={trip.avatar} alt={trip.tripName} style={{ width: "100px" }} />
                            </td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="me-2"
                                    onClick={() => handleShowModal(trip)}
                                >
                                    Sửa
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(trip._id)}>
                                    Xóa
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedTrip ? "Cập nhật Trip" : "Thêm Trip mới"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Trip Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.tripName}
                                onChange={(e) =>
                                    setFormData({ ...formData, tripName: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={formData.time}
                                onChange={(e) =>
                                    setFormData({ ...formData, time: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Days</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.days}
                                onChange={(e) =>
                                    setFormData({ ...formData, days: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({ ...formData, price: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Avatar URL</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.avatar}
                                onChange={(e) =>
                                    setFormData({ ...formData, avatar: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {selectedTrip ? "Cập nhật" : "Thêm"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminPage;
