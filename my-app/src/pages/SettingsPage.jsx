import Header from "../components/common/Header";
import Profile from "../components/settings/Profile";
import Sidebar from "../components/common/Sidebar"

const SettingsPage = () => {
	return (

		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			

			<Sidebar />
			<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Settings' />
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Profile />
			</main>
		</div>

		</div>
		
	);
};
export default SettingsPage;
