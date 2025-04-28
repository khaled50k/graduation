import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import Button from '../Forms/Button';

const SkillFilters = ({
    onClearFilters,
    className = ''
}) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Button
                onClick={onClearFilters}
                variant="secondary"
                className="inline-flex items-center gap-2"
            >
                <FiX className="w-4 h-4" />
                <span>Clear Filters</span>
            </Button>
        </div>
    );
};

export default SkillFilters; 