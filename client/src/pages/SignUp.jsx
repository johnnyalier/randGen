import { useState } from "react";
import { Alert, Button, Card, Checkbox, Label, TextInput, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { signUpRoute } from '../apiRoutes/routes'

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [repeatPassword, setRepeatPassword] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            console.log(formData);
            
            return setErrorMessage('Please fill out all fields.');
        }

        if (!(formData.password === repeatPassword)) {
            return setErrorMessage('Passwords do not match')
        }

        try {
            setLoading(true);
            setErrorMessage(null);
            const result = await axios.post(signUpRoute, {
                ...formData
            })
            console.log(result.data)

            setLoading(false)
            if (result.status === 201){
                navigate('/login')
            } else {
                setErrorMessage(result.data.message)
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <Card className="max-w-md">
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="firstName">Your first name</Label>
                        </div>
                        <TextInput id="firstName" type="text" placeholder="John" required shadow onChange={handleChange} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="lastName">Your last name</Label>
                        </div>
                        <TextInput id="lastName" type="text" placeholder="Doe" required shadow onChange={handleChange} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email">Your email</Label>
                        </div>
                        <TextInput id="email" type="email" placeholder="name@flowbite.com" required shadow onChange={handleChange} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password">Your password</Label>
                        </div>
                        <TextInput id="password" type="password" required shadow onChange={handleChange} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="repeat-password">Repeat password</Label>
                        </div>
                        <TextInput id="repeat-password" type="password" required shadow onChange={(e) => setRepeatPassword(e.target.value)} />
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
                                <Spinner size="sm" />
                                <span>Loading...</span>
                            </>
                        ) : 'Register new account'}
                    </Button>
                </form>
                {errorMessage && 
                    <Alert className="mt-5" color="failure">{errorMessage}</Alert>
                }
            </Card>
        </div>
    );
}

export default SignUp;