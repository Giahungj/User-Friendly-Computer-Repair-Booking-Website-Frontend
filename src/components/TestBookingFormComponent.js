import { useState } from 'react';
import { Button, TextField } from '@mui/material';

function TestBookingFormComponent() {
	const [issueDescription, setIssueDescription] = useState('');
	const [bookingDate, setBookingDate] = useState('');
	const [bookingTime, setBookingTime] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		// Xử lý đặt lịch
	};

	return (
		<>
            <h3 className="text-center my-3 fw- text-blue-800">Đặt Lịch Sửa Chữa</h3>
            <form onSubmit={handleSubmit} className="p-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-4">
                            <TextField
                                label="Mô tả sự cố"
                                fullWidth
                                required
                                multiline
                                rows={3}
                                value={issueDescription}
                                onChange={(e) => setIssueDescription(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <TextField
                                label="Thời gian đặt lịch"
                                type="time"
                                fullWidth
                                required
                                value={bookingTime}
                                onChange={(e) => setBookingTime(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                       <div className="mb-4 d-flex flex-wrap gap-2">
                            {['03/07/2025', '2024-07-04', '2024-07-05', '2024-07-06'].map((date) => (
                                <div
                                    key={date}
                                    onClick={() => setBookingDate(date)}
                                    style={{
                                        padding: '10px 15px',
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        backgroundColor: bookingDate === date ? '#1976d2' : '#fff',
                                        color: bookingDate === date ? '#fff' : '#000',
                                        borderColor: bookingDate === date ? '#1976d2' : '#ccc',
                                    }}
                                >
                                    {date}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: '#1976d2',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        color: '#fff',
                        width: '100%',
                        height: '40px',
                        fontSize: '16px',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                    }}
                >
                    Đặt lịch
                </Button>
            </form>
        </>
	);
}

export default TestBookingFormComponent;
