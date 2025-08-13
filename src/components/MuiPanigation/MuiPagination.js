import { Pagination } from '@mui/material';

const MuiPagination = ({ totalItems, itemsPerPage, page, onPageChange }) => {
	const pageCount = Math.ceil(totalItems / itemsPerPage);

	return (
		<Pagination
			count={pageCount}
			page={page}
			onChange={(_, value) => onPageChange(value)}
			color="primary"
			shape="rounded"
			siblingCount={1}
			boundaryCount={1}
		/>
	);
};

export default MuiPagination;
