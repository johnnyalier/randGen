import Header from './components/Header.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import PrivateRoute from './components/PrivateRoute.jsx';
import About from './pages/About.jsx';

const App = () => {
	

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route element={<PrivateRoute />}>					
					<Route path='/' element={<Home />} />
				</Route>
				<Route path='/about' element={<About />} />
				<Route path='/login' element={<Login />} />
				<Route path='signup' element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
