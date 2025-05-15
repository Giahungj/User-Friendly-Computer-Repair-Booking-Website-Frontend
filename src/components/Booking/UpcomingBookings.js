import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUpcomingBookings } from "../../services/BookingService";
import { AuthContext } from "../../context/AuthContext";
import { CardActionArea, Card, CardContent, Typography, Avatar, Box, CircularProgress }  from '@mui/material';

const UpcomingBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
      const getUpcomingBookings = async () => {
          try {
              const response = await fetchUpcomingBookings(auth.account.patientId);
              if (response.EC === 0) {
                  setBookings(response.DT.rows);
              } else {
                  console.error(response.EM);
              }
          } catch (error) {
              console.error("Lỗi khi lấy lịch hẹn sắp tới:", error);
          } finally {
              setLoading(false);
          }
      };

      getUpcomingBookings();
  }, []);
  
  
  if (loading) return 
    <Box sx={{ display: 'flex', alignItems: 'center'}}>
      <CircularProgress size="lg" />
    </Box>
  if (bookings === undefined) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <div className="shadow-lg p-5 text-center bg-light rounded-3" style={{ maxWidth: "600px" }}>
              <h2 className="text-danger mb-4 fw-bold">Không có lịch hẹn nào</h2>
              <p className="text-muted mb-4">Hiện tại bạn chưa có lịch hẹn nào trong ngày hôm nay và trong tương lai. Vui lòng kiểm tra lại hoặc đặt lịch hẹn mới nếu cần.</p>
              <div className="d-flex justify-content-center gap-3">
                  <button className="btn btn-primary" onClick={() => navigate(-1)}>
                      Quay lại
                  </button>
                  <button className="btn btn-outline-secondary" onClick={() => navigate("/support")}>
                      Liên hệ hỗ trợ
                  </button>
              </div>
              <hr className="my-4" />
              <p className="text-muted small">Nếu cần hỗ trợ, vui lòng liên hệ bộ phận CSKH hoặc xem lại lịch hẹn trong tài khoản của bạn.</p>
          </div>
      </div>
    )
  }
  if (Object.keys(bookings).length === 0) return 
  (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="shadow-lg p-5 text-center bg-light rounded-3" style={{ maxWidth: "600px" }}>
            <h2 className="text-danger mb-4 fw-bold">Không có lịch hẹn nào</h2>
            <p className="text-muted mb-4">Hiện tại bạn chưa có lịch hẹn nào trong ngày hôm nay và trong tương lai. Vui lòng kiểm tra lại hoặc đặt lịch hẹn mới nếu cần.</p>
            <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-primary" onClick={() => navigate(-1)}>
                    Quay lại
                </button>
                <button className="btn btn-outline-secondary" onClick={() => navigate("/support")}>
                    Liên hệ hỗ trợ
                </button>
            </div>
            <hr className="my-4" />
            <p className="text-muted small">Nếu cần hỗ trợ, vui lòng liên hệ bộ phận CSKH hoặc xem lại lịch hẹn trong tài khoản của bạn.</p>
        </div>
    </div>
  );

  return (
    <div className="container px-4 py-5">
      <div className="row justify-content-center">
        <div className="col-12 text-center mb-4">
          <Typography variant="h3" component="h1" sx={{ color: '#2c3e50' }}>
            Lịch hẹn sắp tới của bạn
          </Typography>
        </div>
        {Object.entries(bookings).map(([date, bookingList]) => (
          <div key={date} className="col-12 mb-5">
            <h5 className="mb-3" style={{ color: '#34495e' }}>
              Ngày: {new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </h5>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
              {bookingList.map((booking) => (
                <div key={booking.id} className="col">
                  <Card sx={{ maxWidth: 345, height: '100%' }}>
                    <CardActionArea sx={{ p: 1 }} onClick={() => navigate(`/booking/${booking.id}`)}>
                      <CardContent>
                        <Avatar
                          alt="Remy Sharp"
                          src={booking.Schedule.Doctor.User.avatar ? `http://localhost:8080/images/uploads/${booking.Schedule.Doctor.User.avatar}` : '/default-avatar.jpg'}
                          sx={{ width: 100, height: 100, marginX: 'auto', marginY: 2 }}
                        />
                        <Typography gutterBottom variant="h5" component="div" textAlign="center">
                          BS. {booking.Schedule.Doctor.User.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          Giá khám: {booking.Schedule.Doctor.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          Phòng khám: {booking.Schedule.Doctor.Facility.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          Địa chỉ: {booking.Schedule.Doctor.Facility.address}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          Ngày khám: {booking.date}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          Thời gian: {booking.Schedule.Timeslot.startTime} - {booking.Schedule.Timeslot.endTime}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBookings;
