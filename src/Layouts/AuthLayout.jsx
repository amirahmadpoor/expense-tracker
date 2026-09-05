import { Outlet } from 'react-router'
import PageTitle from '../components/PageTitle/PageTitle'

const AuthLayout = () => {
    return (
        <>
            <PageTitle />
            <Outlet />
        </>
    )
}

export default AuthLayout