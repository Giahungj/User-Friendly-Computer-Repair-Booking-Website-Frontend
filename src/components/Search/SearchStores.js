import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchStores = ({ searchTerm, setSearchTerm }) => {
	return (
		<TextField
			variant="outlined"
			size="small"
			placeholder="Tìm cửa hàng..."
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
			sx={{
				width: 300,
				'& .MuiOutlinedInput-root': {
					borderRadius: 3,
					'& fieldset': { borderColor: '#ccc' },
					'&:hover fieldset': { borderColor: '#90caf9' },
					'&.Mui-focused fieldset': { borderColor: '#90caf9' },
				},
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon sx={{ color: '#90caf9' }} />
					</InputAdornment>
				),
			}}
		/>
	);
};


export default SearchStores;
