import {
    Avatar,
    Button,
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
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { signOutRoute } from '../apiRoutes/routes';
import { FaMoon, FaSun } from 'react-icons/fa'

const Header = () => {
    const location = useLocation();
    const { theme } = useSelector(state => state.theme)
    const { currentUser } = useSelector(state => state.user)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const links = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Statistics", path: "/statistics" },
    ];

    const handleSignOut = async () => {
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
        <Navbar fluid rounded className='border-b-4 border-gray-300 bg-transparent'>
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
                        <span className="block text-sm">{currentUser && currentUser.firstName} {currentUser && currentUser.lastName}</span>
                        <span className="block truncate text-sm font-medium">{currentUser && currentUser.email}</span>
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
            <div>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>
            </div>
        </Navbar>
    )
}

export default Header