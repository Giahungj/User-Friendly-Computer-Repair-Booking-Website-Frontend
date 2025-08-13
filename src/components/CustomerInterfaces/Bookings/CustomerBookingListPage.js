import { useEffect, useState } from 'react';
import { Skeleton, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useParams, useSearchParams } from 'react-router-dom';
import { getCustomerRepairBookings } from '../../../services/RepairBookingService';
import CustomerBookingCard from './CustomerBookingCard';
import MuiPagination from '../../../components/MuiPanigation/MuiPagination';

const CustomerBookingListPage = () => {
	const { userId } = useParams();
	const [searchParams] = useSearchParams();

    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

	const [statusValue, setStatusValue] = useState(() => searchParams.get('status') || '');
    const [bookingDateValue, setBookingDateValue] = useState(() => searchParams.get('bookingDate') || '');
    const [filteredBookings, setFilteredBookings] = useState([]);
	const [bookings, setBookings] = useState([]);   
    
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const loadBookings = async () => {
			try {
				const res = await getCustomerRepairBookings(userId);
				if (!res) {
					setError(true);
					setLoading(false);
					return;
				} if (res.EC === 0) {
					setBookings(res.DT);
					setFilteredBookings(res.DT)
                    setError(false);
				} else if (res.EC === 1) {
					setBookings([]); 
					setFilteredBookings([])
					setError(false); 
				} else {
					setError(true);
				}
				setTimeout(() => {
					setBookings(res.DT);
					setFilteredBookings(res.DT)
                    setLoading(false);
				}, 1000);
			} catch (error) {
				console.error('Lỗi lấy danh sách đặt lịch:', error);
				setError(true);
				setLoading(false);
			}
		};
		loadBookings();
	}, [userId]);


    useEffect(() => {
        let data = [...bookings];
        if (statusValue) {
            data = data.filter(b => b.status === statusValue);
        }
        if (bookingDateValue) {
            data = data.filter(b => b.booking_date === bookingDateValue);
        }
        setFilteredBookings(data);
    }, [bookings, statusValue, bookingDateValue]);
    
    const currentItems = filteredBookings.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

	return (
		<div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
                <p className="lead mb-0">📋 Danh sách đơn đặt lịch của bạn</p>

                <div className="d-flex gap-2 flex-wrap">
                    <FormControl
                        size="small"
                        sx={{
                            minWidth: 180,
                            opacity: 0,
                            animation: 'fadeIn 0.4s ease forwards',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
                            },
                            '@keyframes fadeIn': {
                                from: { opacity: 0, transform: 'translateY(8px)' },
                                to: { opacity: 1, transform: 'translateY(0)' },
                            },
                        }}
                    >
                        <InputLabel>Sắp xếp</InputLabel>
                        <Select
                            defaultValue="newest"
                            label="Sắp xếp"
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === 'newest') {
                                    setFilteredBookings((prev) =>
                                        [...prev].sort((a, b) => new Date(b.booking_date) - new Date(a.booking_date))
                                    );
                                } else if (val === 'oldest') {
                                    setFilteredBookings((prev) =>
                                        [...prev].sort((a, b) => new Date(a.booking_date) - new Date(b.booking_date))
                                    );
                                }
                            }}
                        >
                            <MenuItem value="newest">Mới nhất</MenuItem>
                            <MenuItem value="oldest">Cũ nhất</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl
                        size="small"
                        sx={{
                            minWidth: 160,
                            opacity: 0,
                            animation: 'fadeIn 0.4s ease forwards',
                            animationDelay: '0.1s',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
                            },
                            '@keyframes fadeIn': {
                                from: { opacity: 0, transform: 'translateY(8px)' },
                                to: { opacity: 1, transform: 'translateY(0)' },
                            },
                        }}
                    >
                        <InputLabel>Trạng thái</InputLabel>
                        <Select
                            defaultValue=""
                            label="Trạng thái"
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val) {
                                    setFilteredBookings(bookings.filter(b => b.status === val));
                                } else {
                                    setFilteredBookings(bookings);
                                }
                            }}
                        >
                            <MenuItem value="">Tất cả trạng thái</MenuItem>
                            <MenuItem value="pending">Đang duyệt</MenuItem>
                            <MenuItem value="in-progress">Đang xử lý</MenuItem>
                            <MenuItem value="completed">Hoàn thành</MenuItem>
                            <MenuItem value="cancelled">Đã hủy</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            {/* Nội dung danh sách */}
            {error ? (
                <div className="card border-0 shadow-sm text-center p-4 w-50 mx-auto">
                    <div className="mb-3">
                        <ErrorOutlineIcon sx={{ fontSize: '5rem', color: 'error.main' }} />
                    </div>
                    <h6 className="fw-bold text-danger mb-2">Đã xảy ra lỗi</h6>
                    <p className="text-muted small mb-4">
                        Không thể tải danh sách đơn đặt lịch. Vui lòng thử lại sau hoặc liên hệ quản trị viên.
                    </p>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor: '#2196f3',
                            textTransform: 'none',
                            px: 3,
                            '&:hover': { backgroundColor: '#1976d2' }
                        }}
                        onClick={() => window.location.reload()}
                    >
                        Thử lại
                    </Button>
                </div>
            ) : loading ? (
                <div className="row row-cols-4 g-4">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <div key={idx} className="col mb-4">
                            <div className="card h-100 shadow-sm border-0 rounded">
                                <Skeleton variant="rectangular" width="100%" height={150} />
                                <div className="card-body d-flex flex-column">
                                    <Skeleton variant="text" width="70%" height={20} className="mb-2" />
                                    <Skeleton variant="text" width="100%" height={16} />
                                    <Skeleton variant="text" width="90%" height={16} className="mb-3" />
                                    <Skeleton variant="text" width="50%" height={16} className="mb-3" />
                                    <Skeleton variant="rounded" width={80} height={30} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredBookings.length === 0 ? (
                <div className="text-center my-4 text-muted">Không có đơn đặt lịch nào!</div>
            ) : (
                <div className="row row-cols-4 g-4">
                    {currentItems.map((booking) => (
                        <div key={booking.booking_id} className="col mb-4">
                            <CustomerBookingCard booking={booking} />
                        </div>
                    ))}
                </div>
            )}

           {!loading && filteredBookings.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-4">
                    <MuiPagination
                        totalItems={filteredBookings.length}
                        itemsPerPage={itemsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
	);
};

export default CustomerBookingListPage;
