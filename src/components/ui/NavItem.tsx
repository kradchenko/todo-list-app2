import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface NavItemProps {
    to: string;
    title: string;
}

export const NavItem = ({ to, title }: NavItemProps) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(
                    isActive ? '!text-purple-700 bg-white bg-opacity-70' : null,
                    'flex justify-center items-center flex-shrink-0 h-11 mb-2 rounded-xl border border-white text-white',
                )
            }
        >
            {title}
        </NavLink>
    );
};
