import React, { useState } from 'react';

interface FilterProps {
    onApply: (filterCountry: string, minHeight: number | null, maxHeight: number | null) => void;
}

const Filter: React.FC<FilterProps> = ({ onApply }) => {
    const [filterCountry, setFilterCountry] = useState<string>('');
    const [minHeight, setMinHeight] = useState<string>('');
    const [maxHeight, setMaxHeight] = useState<string>('');

    const applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onApply(
            filterCountry,
            minHeight ? Number(minHeight) : null,
            maxHeight ? Number(maxHeight) : null
        );
    };

    return (
        <form onSubmit={applyFilters} className="filter-form">
            <label htmlFor="country">
                Country:
                <input
                    id="country"
                    type="text"
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    placeholder="Enter country"
                />
            </label>
            <label htmlFor="minHeight">
                Min Height (m):
                <input
                    id="minHeight"
                    type="number"
                    value={minHeight}
                    onChange={(e) => setMinHeight(e.target.value)}
                    placeholder="Min height"
                    min="0"
                />
            </label>
            <label htmlFor="maxHeight">
                Max Height (m):
                <input
                    id="maxHeight"
                    type="number"
                    value={maxHeight}
                    onChange={(e) => setMaxHeight(e.target.value)}
                    placeholder="Max height"
                    min="0"
                />
            </label>
            <button type="submit">Apply Filters</button>
        </form>
    );
};

export default Filter;