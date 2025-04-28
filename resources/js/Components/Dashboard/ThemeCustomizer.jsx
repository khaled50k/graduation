import React from 'react';
import { FiSun, FiMoon, FiCircle, FiType, FiMaximize, FiLayout } from 'react-icons/fi';
import { useTheme } from '@/Contexts/ThemeContext';
import { colorSchemes, fontSizes, defaultTheme } from '@/Config/theme';

const ColorButton = ({ color, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`relative h-8 w-8 rounded-full transition-transform hover:scale-110 ${
            isActive ? 'ring-2 ring-offset-2 ring-primary-500 dark:ring-offset-gray-800' : ''
        }`}
        style={{ backgroundColor: colorSchemes[color].primary[500] }}
    >
        <span className="sr-only">Use {color} theme</span>
    </button>
);

const OptionButton = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
            isActive
                ? 'bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
        }`}
    >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
    </button>
);

const ThemeCustomizer = () => {
    const { theme, updateTheme } = useTheme();

    return (
        <div className="space-y-6 p-6">
            {/* Color Scheme */}
            <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Color scheme</h3>
                <div className="flex gap-2">
                    {Object.keys(colorSchemes).map((color) => (
                        <ColorButton
                            key={color}
                            color={color}
                            isActive={theme.colorScheme === color}
                            onClick={() => updateTheme({ colorScheme: color })}
                        />
                    ))}
                </div>
            </div>

            {/* Dark Mode */}
            <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Appearance</h3>
                <div className="flex flex-col gap-2">
                    <OptionButton
                        icon={FiSun}
                        label="Light"
                        isActive={!theme.isDark}
                        onClick={() => updateTheme({ isDark: false })}
                    />
                    <OptionButton
                        icon={FiMoon}
                        label="Dark"
                        isActive={theme.isDark}
                        onClick={() => updateTheme({ isDark: true })}
                    />
                </div>
            </div>

            {/* Font Size */}
            <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Font size</h3>
                <div className="flex flex-col gap-2">
                    {Object.entries({
                        compact: 'Compact',
                        default: 'Default',
                        comfortable: 'Comfortable',
                    }).map(([size, label]) => (
                        <OptionButton
                            key={size}
                            icon={FiType}
                            label={label}
                            isActive={theme.fontSize === size}
                            onClick={() => updateTheme({ fontSize: size })}
                        />
                    ))}
                </div>
            </div>

            {/* Border Radius */}
            <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Border radius</h3>
                <div className="flex flex-col gap-2">
                    {Object.entries({
                        none: 'Square',
                        base: 'Default',
                        xl: 'Rounded',
                        full: 'Full',
                    }).map(([radius, label]) => (
                        <OptionButton
                            key={radius}
                            icon={radius === 'none' ? FiMaximize : FiCircle}
                            label={label}
                            isActive={theme.radius === radius}
                            onClick={() => updateTheme({ radius })}
                        />
                    ))}
                </div>
            </div>

            {/* Layout Density */}
            <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Layout density</h3>
                <div className="flex flex-col gap-2">
                    {Object.entries({
                        compact: 'Compact',
                        default: 'Default',
                        comfortable: 'Comfortable',
                    }).map(([spacing, label]) => (
                        <OptionButton
                            key={spacing}
                            icon={FiLayout}
                            label={label}
                            isActive={theme.spacing === spacing}
                            onClick={() => updateTheme({ spacing })}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeCustomizer; 