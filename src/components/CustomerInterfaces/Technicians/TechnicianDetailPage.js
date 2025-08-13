import TechnicianInfo from "./TechnicianInfo";
import WorkSchedule from "./WorkSchedule";
import SimilarTechnicians from "./SimilarTechnicians";
import TechnicianReviews from "./TechnicianReviews";

const TechnicianDetailPage = () => {
	return (
		<div className="container py-5">
            <div className="row g-4">
                <div className="col-8">
                    <div className="mb-4">
                        <TechnicianInfo />
                    </div>
                    <div className="mb-4">
                        <WorkSchedule />
                    </div>
                    <TechnicianReviews />
                </div>
                <div className="col-4">
                    <SimilarTechnicians />
                </div>
            </div>
        </div>
	);
};

export default TechnicianDetailPage;
