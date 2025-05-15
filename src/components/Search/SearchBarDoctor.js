import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import searchService from '../../services/searchService';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

// Styled components
const SearchWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: { width: 'auto' },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: { width: '20ch' },
    },
}));

const Search = ({ doctorId }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const timeoutRef = useRef(null);
    const prevQueryRef = useRef('');
    const navigate = useNavigate();

    // Hàm gọi API tìm kiếm với useCallback
    const fetchSuggestions = useCallback(async (searchQuery) => {
        if (searchQuery.length <= 1 || searchQuery === prevQueryRef.current) return;

        prevQueryRef.current = searchQuery; // Lưu query cũ để tránh gọi API lặp lại

        try {
            setLoading(true);
            setError(null);
            const results = await searchService.searchPatientService(searchQuery, doctorId); // Gọi service với doctorId
            setSuggestions(results.DT || []); // Giả định DT là mảng kết quả
        } catch (err) {
            setError('Không thể tải gợi ý');
            setSuggestions([]);
            console.error('Lỗi khi tìm kiếm:', err);
        } finally {
            setLoading(false);
        }
    }, [doctorId]); // Thêm doctorId vào dependency để cập nhật khi thay đổi

    // Debounce API call với useEffect
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => fetchSuggestions(query), 1000);

        return () => clearTimeout(timeoutRef.current);
    }, [query, fetchSuggestions]);

    const handleInputChange = (e) => setQuery(e.target.value);

    const handleSelectSuggestion = (id) => {
        navigate(`/doctor/patient/${id}`); // Điều chỉnh đường dẫn cho bệnh nhân
        setQuery('');
        setSuggestions([]);
    };

    return (
        <SearchWrapper>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Tìm kiếm bệnh nhân..."
                value={query}
                onChange={handleInputChange}
                disabled={loading}
                onKeyDown={(e) => e.key === 'Enter' && query.trim() && console.log('Tìm kiếm:', query)}
            />
            {query.trim() && (
                <ul className="suggestions-list" style={{ position: 'absolute', top: '100%', zIndex: 1 }}>
                    {loading ? (
                        <li>Đang tải...</li>
                    ) : error ? (
                        <li className="error-text">{error}</li>
                    ) : suggestions.length > 0 ? (
                        suggestions.map((item) => (
                            <li
                                key={item._id}
                                onClick={() => handleSelectSuggestion(item._id)}
                            >
                                {item._source.User.name} {/* Hiển thị tên bệnh nhân */}
                            </li>
                        ))
                    ) : (
                        <li>Không tìm thấy kết quả</li>
                    )}
                </ul>
            )}
        </SearchWrapper>
    );
};

export default Search;