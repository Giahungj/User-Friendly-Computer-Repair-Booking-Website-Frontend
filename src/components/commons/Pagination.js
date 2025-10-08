// PaginationMui.js
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationMui = ({ totalItems, currentPage, onChangePage }) => {
	const totalPages = Math.ceil(totalItems / 2);
	if (totalPages <= 1) return null;

	return (
		<Stack spacing={2} alignItems="center" my={3}>
			<Pagination
				count={totalPages}
				page={currentPage}
				onChange={(e, page) => onChangePage(page)}
				color="primary"
				shape="rounded"
			/>
		</Stack>
	);
};

export default PaginationMui;
