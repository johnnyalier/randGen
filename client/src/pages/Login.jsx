import { useState } from "react";
import { Alert, Button, Card, Checkbox, Label, TextInput, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { signInRoute } from '../apiRoutes/routes'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'

const Login = () => {
  	const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {loading, error: errorMessage} = useSelector(state => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value })
    }

	const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            return dispatch(signInFailure('Please fill out all fields.'));
        }

        try {
            dispatch(signInStart())
            const result = await axios.post(signInRoute, {
                ...formData
            })
            console.log(result.data)

            if (result.status === 200){
                dispatch(signInSuccess(result.data))
                navigate('/')
            } else {
                dispatch(signInFailure(result.data.message))
            }
        } catch (error) {
            dispatch(signInFailure(error.message))
        }
    }

  	return (
    <div className="flex flex-col justify-center items-center mt-10">
      <Card className="max-w-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email">Your email</Label>
            </div>
            <TextInput id="email" type="email" placeholder="name@flowbite.com" required onChange={handleChange} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password">Your password</Label>
            </div>
            <TextInput id="password" type="password" required onChange={handleChange} />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <div className="flex items-center gap-2">
              <Checkbox id="agree" />
              <Label htmlFor="agree" className="flex">
                  I agree with the&nbsp;
                  <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                      terms and conditions
                  </Link>
              </Label>
          </div>
          <Button type="submit" disabled={loading}>
			{loading? (
				<>
					<Spinner size='sm' />
					<span>Loading...</span>
				</>
			) : 'Sign In'}
		  </Button>
        </form>
		{errorMessage && (
			<Alert className='mt-5' color='failure'>
				{errorMessage}
			</Alert>
		)}
      </Card>
    </div>
  );
}

export default Login;