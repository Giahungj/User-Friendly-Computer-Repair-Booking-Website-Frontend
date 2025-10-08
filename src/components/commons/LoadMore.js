// LoadMore.js
import { useEffect } from "react";

const LoadMore = ({ hasMore, onLoadMore }) => {
	useEffect(() => {
		const handleScroll = () => {
			if (!hasMore) return;
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
				onLoadMore();
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [hasMore, onLoadMore]);

	if (!hasMore) return null;

	return (
		<div className="text-center my-3">
			<button className="btn btn-primary" onClick={onLoadMore}>
				Load More
			</button>
		</div>
	);
};

export default LoadMore;
