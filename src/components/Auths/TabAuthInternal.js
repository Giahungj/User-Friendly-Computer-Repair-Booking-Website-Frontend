import { useState } from 'react';
import TechnicianLoginForm from './TLoginForm';
import StoreManagerLoginForm from './SLoginForm';

function AuthTabs() {
	const [activeTab, setActiveTab] = useState('technician');
	return (
		<div 
			className="container py-5"
			style={activeTab === 'technician' 
			? { backgroundColor: '#e0f2f1' } 
			: { backgroundColor: '#e8eaf6' }}
		>
			<ul className="nav nav-tabs border border-0 justify-content-center mb-3">
				<li className="nav-item">
					<button
						className={`nav-link fw-bold fs-5 ${activeTab === 'login' ? 'active' : ''}`}
						onClick={() => setActiveTab('technician')}
						style={activeTab === 'technician' ? { 
							paddingBottom: '2px', color: '#009688', borderBottom: '2px solid #009688', borderTop: 'none', borderLeft: 'none', borderRight: 'none' 
						} : { 
							color: '#455a64', border: 'none' 
						}}
					>
						Kỹ thuật
					</button>
				</li>
				<li className="nav-item">
					<button
						className={`nav-link fw-bold fs-5 ${activeTab === 'register' ? 'active' : ''}`}
						onClick={() => setActiveTab('storemanager')}
						style={activeTab === 'storemanager' ? { 
							paddingBottom: '2px', color: '#7986cb', borderBottom: '2px solid #7986cb', borderTop: 'none', borderLeft: 'none', borderRight: 'none' 
						} : { 
							color: '#455a64', border: 'none' 
						}}
					>
						Quản lý
					</button>
				</li>
			</ul>

			<div className="tab-content">
				<div className={`tab-pane fade ${activeTab === 'technician' ? 'show active' : ''}`}>
					<TechnicianLoginForm />
				</div>
				<div className={`tab-pane fade ${activeTab === 'storemanager' ? 'show active' : ''}`}>
					<StoreManagerLoginForm />
				</div>
			</div>
		</div>
	);
}

export default AuthTabs;
