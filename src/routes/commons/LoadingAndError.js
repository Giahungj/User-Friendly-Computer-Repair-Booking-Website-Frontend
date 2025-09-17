// LoadingAndError.jsx
const Loading = () => {
	return (
		<div className="d-flex justify-content-center align-items-center vh-100">
			<div className="text-center">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				<div className="mt-3 text-muted">Loading...</div>
			</div>
		</div>
	);
};

const Error = () => {
	return (
		<div className="d-flex justify-content-center align-items-center vh-100">
			<div className="text-center">
				<div className="alert alert-danger" role="alert">
					<h4 className="alert-heading">Oops, Something Went Wrong!</h4>
					<p className="mb-0">Please try again later.</p>
				</div>
			</div>
		</div>
	);
};

export default { Loading, Error };