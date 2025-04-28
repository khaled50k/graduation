import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import SidebarHeader from './Sidebar/SidebarHeader';
import Navigation from './Sidebar/Navigation';

const Sidebar = ({ isCollapsed, onCollapse }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [openSubmenus, setOpenSubmenus] = useState([]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle mobile menu toggle
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Handle desktop sidebar collapse
    const handleCollapse = () => {
        if (onCollapse) {
            onCollapse(!isCollapsed);
        }
    };

    const toggleSubmenu = (menuId) => {
        setOpenSubmenus(prev => 
            prev.includes(menuId)
                ? prev.filter(id => id !== menuId)
                : [...prev, menuId]
        );
    };

    return (
        <>
            {/* Mobile Menu Overlay */}
            <Transition
                show={isMobileMenuOpen}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="fixed inset-0 z-30 bg-gray-900/50 lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Button */}
            <div className="fixed left-4 top-4 z-50 lg:hidden">
                <SidebarHeader
                    isCollapsed={false}
                    onCollapse={toggleMobileMenu}
                    isMobile={true}
                />
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out
                bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
                ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
                ${isMobileMenuOpen ? 'w-64' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex h-full flex-col">
                    {/* Desktop Header */}
                    <div className="hidden lg:block">
                        <SidebarHeader
                            isCollapsed={isCollapsed}
                            onCollapse={handleCollapse}
                        />
                    </div>

                    {/* Navigation */}
                    <Navigation
                        activeMenu={activeMenu}
                        openSubmenus={openSubmenus}
                        toggleSubmenu={toggleSubmenu}
                        setActiveMenu={setActiveMenu}
                        isCollapsed={isCollapsed}
                    />
                </div>
            </aside>
        </>
    );
};

export default Sidebar; 