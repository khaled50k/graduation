import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FiHome, FiUsers, FiPlus, FiChevronRight, FiBriefcase, FiTag } from 'react-icons/fi';

const menuItems = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: FiHome,
        href: route('dashboard'),
    },
    {
        id: 'users',
        title: 'User Management',
        icon: FiUsers,
        href: route('users.index'),
        submenu: [
            { id: 'users-list', title: 'Users List', href: route('users.index') },
            { id: 'add-user', title: 'Add User', href: route('users.create'), icon: FiPlus },
        ],
    },
    {
        id: 'posts',
        title: 'Posts',
        icon: FiBriefcase,
        href: route('posts.index'),
        submenu: [
            { id: 'posts-list', title: 'Posts List', href: route('posts.index') },
            { id: 'add-post', title: 'Add Post', href: route('posts.create'), icon: FiPlus },
        ],
    },
    {
        id: 'skills',
        title: 'Skills',
        icon: FiTag,
        href: route('skills.index'),
        submenu: [
            { id: 'skills-list', title: 'Skills List', href: route('skills.index') },
            { id: 'add-skill', title: 'Add Skill', href: route('skills.create'), icon: FiPlus },
        ],
    },
];

const MenuItem = ({ item, isActive, isOpen, isCollapsed, onClick, onSubMenuToggle }) => {
    const page = usePage();
    const currentUrl = page?.url || window.location.pathname;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const Icon = item.icon;
    const [hoveredSubItem, setHoveredSubItem] = React.useState(null);

    // Improved route matching logic with error handling
    const isCurrentPath = (() => {
        try {
            // Helper function to get path from URL
            const getPathFromUrl = (url) => {
                if (!url) return '';
                // Remove protocol, domain, and query parameters
                const path = url.replace(/^https?:\/\/[^/]+/, '').split('?')[0];
                // Remove trailing slash
                return path.replace(/\/$/, '');
            };

            // Get clean paths for comparison
            const cleanUrl = getPathFromUrl(currentUrl);
            const cleanItemHref = getPathFromUrl(item.href);

            console.log('Route Matching Debug:', {
                currentUrl,
                cleanUrl,
                itemHref: item.href,
                cleanItemHref,
                hasSubmenu,
                submenuItems: item.submenu?.map(s => s.href)
            });

            // Check exact match first
            if (cleanUrl === cleanItemHref) {
                console.log('Exact match found:', cleanUrl);
                return true;
            }

            // Check if it's a parent of current path
            if (hasSubmenu && item.submenu?.length > 0) {
                const isParent = item.submenu.some(subItem => {
                    if (!subItem.href) return false;
                    const cleanSubItemHref = getPathFromUrl(subItem.href);
                    const isMatch = cleanUrl === cleanSubItemHref || cleanUrl.startsWith(cleanSubItemHref + '/');
                    if (isMatch) {
                        console.log('Submenu match found:', {
                            subItemHref: subItem.href,
                            cleanSubItemHref,
                            cleanUrl
                        });
                    }
                    return isMatch;
                });
                if (isParent) return true;
            }

            // Check if current URL starts with item's href (for nested routes)
            if (cleanItemHref && cleanUrl.startsWith(cleanItemHref + '/')) {
                console.log('Nested route match found:', {
                    cleanItemHref,
                    cleanUrl
                });
                return true;
            }

            console.log('No match found for:', cleanUrl);
            return false;
        } catch (error) {
            console.error('Error in route matching:', {
                error,
                currentUrl,
                itemHref: item.href,
                hasSubmenu
            });
            return false;
        }
    })();

    const mainItem = (
        <div className="relative group">
            {hasSubmenu ? (
                <button
                    onClick={() => onSubMenuToggle(item.id)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all w-full relative overflow-hidden ${
                        isCurrentPath
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400 font-semibold'
                            : 'text-content-default hover:bg-surface-light hover:text-primary-600 dark:text-content-white dark:hover:bg-background-dark/50'
                    }`}
                    title={isCollapsed ? item.title : undefined}
                >
                    <span className="relative z-10">
                        {isCurrentPath && (
                            <span className="absolute -left-1 -top-1 h-7 w-7 animate-ping rounded-full bg-primary-500 opacity-20"></span>
                        )}
                        <Icon className={`h-5 w-5 flex-shrink-0 transition-all duration-200 ${
                            isCurrentPath ? 'text-primary-600 dark:text-primary-400' : 'text-content-light group-hover:text-primary-600 dark:text-content-lighter dark:group-hover:text-primary-400'
                        }`} />
                    </span>
                    {!isCollapsed && (
                        <>
                            <span className="flex-1 relative z-10 text-left">{item.title}</span>
                            <FiChevronRight className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                        </>
                    )}
                    {isCurrentPath && (
                        <span className="absolute left-0 top-0 h-full w-1 bg-primary-500 rounded-r-full" />
                    )}
                </button>
            ) : (
                <Link
                    href={item.href}
                    onClick={() => onClick(item.id)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all relative overflow-hidden ${
                        isCurrentPath
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400 font-semibold'
                            : 'text-content-default hover:bg-surface-light hover:text-primary-600 dark:text-content-white dark:hover:bg-background-dark/50'
                    }`}
                    title={isCollapsed ? item.title : undefined}
                >
                    <span className="relative z-10">
                        {isCurrentPath && (
                            <span className="absolute -left-1 -top-1 h-7 w-7 animate-ping rounded-full bg-primary-500 opacity-20"></span>
                        )}
                        <Icon className={`h-5 w-5 flex-shrink-0 transition-all duration-200 ${
                            isCurrentPath ? 'text-primary-600 dark:text-primary-400' : 'text-content-light group-hover:text-primary-600 dark:text-content-lighter dark:group-hover:text-primary-400'
                        }`} />
                    </span>
                    {!isCollapsed && <span className="flex-1 relative z-10">{item.title}</span>}
                    {isCurrentPath && (
                        <span className="absolute left-0 top-0 h-full w-1 bg-primary-500 rounded-r-full" />
                    )}
                </Link>
            )}
            
            {isCollapsed && (
                <div className="absolute left-full top-0 z-50 ml-2 opacity-0 invisible translate-x-1 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 transition-all duration-200">
                    <div className="relative flex items-center">
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 border-8 border-transparent border-r-white dark:border-r-gray-800"></div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg py-2 px-3 shadow-lg border border-gray-100 dark:border-gray-700 min-w-[180px]">
                            {hasSubmenu ? (
                                <>
                                    <div className="mb-1 font-medium text-gray-900 dark:text-white">
                                        {item.title}
                                    </div>
                                    <div className="mt-1 space-y-1">
                                        {item.submenu.map((subItem) => {
                                            const isSubItemActive = (() => {
                                                try {
                                                    const cleanUrl = (currentUrl || '').split('?')[0].replace(/\/$/, '');
                                                    const cleanSubItemHref = (subItem.href || '').split('?')[0].replace(/\/$/, '');
                                                    return cleanUrl === cleanSubItemHref || cleanUrl.startsWith(cleanSubItemHref + '/');
                                                } catch (error) {
                                                    console.error('Error in submenu route matching:', error);
                                                    return false;
                                                }
                                            })();
                                            
                                            return (
                                                <Link
                                                    key={subItem.id}
                                                    href={subItem.href}
                                                    className={`block px-2 py-1 text-sm rounded transition-colors ${
                                                        isSubItemActive
                                                            ? 'bg-primary-50 text-primary-700 font-medium dark:bg-primary-500/10 dark:text-primary-400'
                                                            : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-primary-500/10'
                                                    }`}
                                                    onClick={() => onClick(subItem.id)}
                                                >
                                                    {subItem.title}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`block px-2 py-1 text-sm rounded transition-colors ${
                                        isCurrentPath
                                            ? 'bg-primary-50 text-primary-700 font-medium dark:bg-primary-500/10 dark:text-primary-400'
                                            : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-primary-500/10'
                                    }`}
                                    onClick={() => onClick(item.id)}
                                >
                                    {item.title}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div>
            {mainItem}
            {hasSubmenu && isOpen && !isCollapsed && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-border-light pl-4 dark:border-border-dark">
                    {item.submenu.map((subItem) => {
                        const isSubItemActive = (() => {
                            try {
                                const cleanUrl = (currentUrl || '').split('?')[0].replace(/\/$/, '');
                                const cleanSubItemHref = (subItem.href || '').split('?')[0].replace(/\/$/, '');
                                return cleanUrl === cleanSubItemHref || cleanUrl.startsWith(cleanSubItemHref + '/');
                            } catch (error) {
                                console.error('Error in submenu route matching:', error);
                                return false;
                            }
                        })();

                        return (
                            <Link
                                key={subItem.id}
                                href={subItem.href}
                                className={`flex items-center rounded-lg px-3 py-2 text-sm transition-colors relative overflow-hidden group/subitem ${
                                    isSubItemActive
                                        ? 'bg-primary-50 font-medium text-primary-700 dark:bg-primary-500/10 dark:text-primary-400'
                                        : 'text-content-default hover:bg-surface-light hover:text-primary-600 dark:text-content-white dark:hover:bg-background-dark/50'
                                }`}
                                onClick={() => onClick(subItem.id)}
                                onMouseEnter={() => setHoveredSubItem(subItem.id)}
                                onMouseLeave={() => setHoveredSubItem(null)}
                            >
                                <span className="relative z-10">{subItem.title}</span>
                                <span className="absolute inset-0 bg-primary-50 dark:bg-primary-500/10 opacity-0 transition-opacity duration-200 group-hover/subitem:opacity-100"></span>
                                {isSubItemActive && (
                                    <span className="absolute left-0 top-0 h-full w-1 bg-primary-500 rounded-r-full transform -translate-x-7"></span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const Navigation = ({ activeMenu, openSubmenus, toggleSubmenu, setActiveMenu, isCollapsed }) => {
    return (
        <nav className="flex-1 space-y-1 px-3 py-4">
            {menuItems.map((item) => (
                <MenuItem
                    key={item.id}
                    item={item}
                    isActive={activeMenu === item.id}
                    isOpen={openSubmenus.includes(item.id)}
                    isCollapsed={isCollapsed}
                    onClick={setActiveMenu}
                    onSubMenuToggle={toggleSubmenu}
                />
            ))}
        </nav>
    );
};

export default Navigation;