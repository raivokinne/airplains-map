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

    const resetFilters = () => {
        setFilterCountry('');
        setMinHeight('');
        setMaxHeight('');
        onApply('', null, null);
    };

    return (
        <form onSubmit={applyFilters} className="filter-form h-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-4 md:py-3 bg-slate-600 space-y-4 md:space-y-0">
            <label htmlFor="country" className="w-full md:w-auto">
                <div className="relative">
                    <input
                        type="text"
                        className="w-full md:w-48 lg:w-56 pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        id="country"
                        value={filterCountry}
                        onChange={(e) => setFilterCountry(e.target.value)}
                        placeholder="Enter country"
                    />
                </div>
            </label>
            <label htmlFor="minHeight" className="w-full md:w-auto">
                <div className="relative">
                    <input
                        type="number"
                        className="w-full md:w-36 lg:w-48 pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        id="minHeight"
                        value={minHeight}
                        onChange={(e) => setMinHeight(e.target.value)}
                        placeholder="Min height"
                        min="0"
                    />
                </div>
            </label>
            <label htmlFor="maxHeight" className="w-full md:w-auto">
                <div className="relative">
                    <input
                        type="number"
                        className="w-full md:w-36 lg:w-48 pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        id="maxHeight"
                        value={maxHeight}
                        onChange={(e) => setMaxHeight(e.target.value)}
                        placeholder="Max height"
                        min="0"
                    />
                </div>
            </label>
            <div className="flex space-x-2 w-full md:w-auto justify-center">
                <button type="submit" className="bg-slate-500 rounded-2xl py-2 px-4 hover:bg-slate-700 transition duration-300 w-full md:w-auto">Apply Filters</button>
                <button type="button" onClick={resetFilters} className="bg-slate-500 rounded-2xl py-2 px-4 hover:bg-slate-700 transition duration-300 w-full md:w-auto">Reset Filters</button>
            </div>
        </form>
    );
};

export default Filter;
