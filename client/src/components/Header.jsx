import { 
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from 'flowbite-react'
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { signOutRoute } from '../apiRoutes/routes';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const links = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Statistics", path: "/statistics" },
    ];

    const handleSignOut = async() => {
        try {
            const result = await axios.get(signOutRoute)
            if (result.status === 200) {
                dispatch(signoutSuccess())
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Navbar fluid rounded className='border-b-4 border-gray-300 bg-transparent dark:bg-gray-800'>
            <NavbarBrand href="https://flowbite-react.com">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">RandGen</span>
            </NavbarBrand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    }
                >
                    <DropdownHeader>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </DropdownHeader>
                    <DropdownItem>Dashboard</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
                </Dropdown>
                <NavbarToggle />
            </div>
            <NavbarCollapse>
                {links.map((link) => (
                    <NavbarLink
                        key={link.path}
                        href={link.path}
                        active={location.pathname === link.path}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(link.path);
                        }}
                    >
                        {link.name}
                    </NavbarLink>
                ))}
            </NavbarCollapse>
        </Navbar>
    )
}

export default Header