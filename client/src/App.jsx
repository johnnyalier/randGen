import Header from './components/Header.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'

const App = () => {
	

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='signup' element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
