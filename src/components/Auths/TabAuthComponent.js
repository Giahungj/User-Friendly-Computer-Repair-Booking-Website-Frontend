import { useState } from 'react';
import LoginForm from './LoginFormComponent';
import RegisterForm from './RegisterComponent';

function AuthTabs() {
	const [activeTab, setActiveTab] = useState('login');
	return (
		<div className="container py-5">
			<ul className="nav nav-tabs border border-0 justify-content-center mb-3">
				<li className="nav-item">
					<button
						className={`nav-link fw-bold fs-5 ${activeTab === 'login' ? 'active' : ''}`}
						onClick={() => setActiveTab('login')}
						style={activeTab === 'login' ? { 
							paddingBottom: '2px', color: '#2196f3', borderBottom: '2px solid #2196f3', borderTop: 'none', borderLeft: 'none', borderRight: 'none' 
						} : { 
							color: '#455a64', border: 'none' 
						}}
					>
						Đăng nhập
					</button>
				</li>
				<li className="nav-item">
					<button
						className={`nav-link fw-bold fs-5 ${activeTab === 'register' ? 'active' : ''}`}
						onClick={() => setActiveTab('register')}
						style={activeTab === 'register' ? { 
							paddingBottom: '2px', color: '#2196f3', borderBottom: '2px solid #2196f3', borderTop: 'none', borderLeft: 'none', borderRight: 'none' 
						} : { 
							color: '#455a64', border: 'none' 
						}}
					>
						Tạo tài khoản
					</button>
				</li>
			</ul>

			<div className="tab-content">
				<div className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`}>
					<LoginForm />
				</div>
				<div className={`tab-pane fade ${activeTab === 'register' ? 'show active' : ''}`}>
					<RegisterForm />
				</div>
			</div>
		</div>
	);
}

export default AuthTabs;
