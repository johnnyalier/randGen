import { useState } from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <Card className="max-w-md">
                <form className="flex max-w-md flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email2">Your email</Label>
                        </div>
                        <TextInput id="email2" type="email" placeholder="name@flowbite.com" required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password2">Your password</Label>
                        </div>
                        <TextInput id="password2" type="password" required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="repeat-password">Repeat password</Label>
                        </div>
                        <TextInput id="repeat-password" type="password" required shadow />
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
                    <Button type="submit">Register new account</Button>
                </form>
            </Card>
        </div>
    );
}

export default SignUp;