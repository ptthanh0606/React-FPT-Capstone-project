/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl, checkIsActive } from '../../../../_helpers';
import { useRecoilValue } from 'recoil';

import roleSelector from 'auth/recoil/selectors/role';

const menusOfAdmin = [
  {
    path: '/dashboard',
    title: 'Dashboard',
  },
  {
    path: '/semester',
    title: 'Semester',
  },
  {
    path: '/checkpoint-template',
    title: 'Checkpoint Template',
  },
  {
    path: '/department',
    title: 'Department',
  },
  {
    path: '/lecturer',
    title: 'Lecturer',
  },
  {
    path: '/student',
    title: 'Student',
  },
  {
    path: '/admin',
    title: 'Admin',
  },
];

const menusOfLecturer = [
  {
    path: '/dashboard',
    title: 'Dashboard',
  },
  {
    path: '/topic',
    title: 'Topic',
  },
  {
    path: '/council',
    title: 'Council',
  },
  {
    path: '/my-council',
    title: 'My council',
  },
];

const menusOfStudent = [
  {
    path: '/dashboard',
    title: 'Dashboard',
  },
  {
    path: '/topic',
    title: 'Topic',
  },
  {
    path: '/team',
    title: 'Team',
  },
  {
    path: '/my-team',
    title: 'My Team',
  },
];

export const HeaderMenu = React.memo(function ({ layoutProps }) {
  const role = useRecoilValue(roleSelector);
  const location = useLocation();

  const [menus, setMenus] = React.useState([]);

  React.useEffect(() => {
    if (role === 'admin') setMenus(menusOfAdmin);
    if (role === 'lecturer') setMenus(menusOfLecturer);
    else setMenus(menusOfStudent);
  }, [role]);

  const getMenuItemActive = React.useCallback(
    url => {
      return checkIsActive(location, url) ? 'menu-item-active' : '';
    },
    [location]
  );

  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {menus.map(l1 => {
          return (
            <li
              data-menu-toggle={layoutProps.menuDesktopToggle}
              aria-haspopup={l1.children ? 'true' : 'false'}
              key={l1.path}
              className={`menu-item ${
                l1.children ? 'menu-item-submenu ' : ''
              }menu-item-rel ${getMenuItemActive(l1.path)}`}
            >
              <NavLink
                className={`menu-link ${l1.children ? 'menu-toggle' : ''}`}
                to={l1.path}
              >
                <span className="menu-text">{l1.title}</span>
                {((!l1.children && layoutProps.rootArrowEnabled) ||
                  l1.children) && <i className="menu-arrow" />}
              </NavLink>
              {l1.children && (
                <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                  <ul className="menu-subnav">
                    {l1.children.map(l2 => {
                      return (
                        <li
                          className={`menu-item ${getMenuItemActive(l2.path)}`}
                        >
                          <NavLink className="menu-link" to={l2.path}>
                            <span className="svg-icon menu-icon">
                              <SVG src={toAbsoluteUrl(l2.icon)} />
                            </span>
                            <span className="menu-text">{l2.title}</span>
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
