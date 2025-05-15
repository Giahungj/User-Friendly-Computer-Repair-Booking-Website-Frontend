import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import searchService from '../../services/searchService';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

// Styled components
const SearchWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
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
        [theme.breakpoints.up('md')]: {
            width: '30ch',
        },
    },
}));

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const timeoutRef = useRef(null);
    const prevQueryRef = useRef('');
    const navigate = useNavigate();

    // Hàm gọi API tìm kiếm
    const fetchSuggestions = useCallback(async (searchQuery) => {
        if (searchQuery.length <= 1 || searchQuery === prevQueryRef.current) return;

        prevQueryRef.current = searchQuery;

        try {
            setLoading(true);
            setError(null);
            const results = await searchService.searchService(searchQuery);
            setSuggestions(Array.isArray(results.DT) ? results.DT : []);
        } catch (err) {
            setError('Không thể tải gợi ý');
            setSuggestions([]);
            console.error('Lỗi khi tìm kiếm:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Debounce API call
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => fetchSuggestions(query), 500);

        return () => clearTimeout(timeoutRef.current);
    }, [query, fetchSuggestions]);

    // Cập nhật query
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    // Xử lý tìm kiếm khi nhấn Enter hoặc button
    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(query)}`);
            setQuery('');
            setSuggestions([]);
        }
    };

    return (
        <div className="search-container" style={{ position: 'relative' }}>
            <SearchWrapper>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Tìm kiếm bác sĩ..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={query}
                    onChange={handleInputChange}
                    disabled={loading}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                />
                <Button
                    variant="text"
                    color="primary"
                    size="small"
                    onClick={handleSearch}
                    disabled={loading || !query.trim()}
                    sx={{ marginRight: 0.5 }}
                >
                    Tìm
                </Button>
            </SearchWrapper>

            {(suggestions.length > 0 || query.trim() !== '') && (
                <ul className="suggestions-list">
                    {loading && <li>Đang tải ...</li>}
                    {error && <li className="error-text">{error}</li>}
                    {!loading && !error && suggestions.length > 0 && 
                        suggestions.map((item) => (
                            <li key={item._id} onClick={() => { navigate(`/doctors/${item._id}`); setQuery('') }}>
                                {item._source.name} - {item._source.specialty}
                            </li>
                        ))
                    }
                    {!loading && !error && query.trim() !== '' && suggestions.length === 0 && <li>Không tìm thấy liên quan</li>}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;