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
            <div className="flex space-x-2 w-full md:w-auto justify-center md:ml-2">
                <button type="submit" className="bg-slate-500 rounded-2xl py-2 px-4 hover:bg-slate-700 transition duration-300 w-full md:w-auto">Apply Filters</button>
                <button type="button" onClick={resetFilters} className="bg-slate-500 rounded-2xl py-2 px-4 hover:bg-slate-700 transition duration-300 w-full md:w-auto">Reset Filters</button>
            </div>
        </form>
    );
};

export default Filter;







// import React, { useState } from 'react';

// interface FilterProps {
//     onApply: (filterCountry: string, minHeight: number | null, maxHeight: number | null) => void;
// }

// const Filter: React.FC<FilterProps> = ({ onApply }) => {
//     const [filterCountry, setFilterCountry] = useState<string>('');
//     const [minHeight, setMinHeight] = useState<string>('');
//     const [maxHeight, setMaxHeight] = useState<string>('');

//     const applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         onApply(
//             filterCountry,
//             minHeight ? Number(minHeight) : null,
//             maxHeight ? Number(maxHeight) : null
//         );
//     };

//     const resetFilters = () => {
//         setFilterCountry('');
//         setMinHeight('');
//         setMaxHeight('');
//         onApply('', null, null);
//     };

//     return (
//         <form onSubmit={applyFilters} className="filter-form h-16 flex flex-row items-center justify-between px-12 bg-slate-600">
//             <label htmlFor="country">
//                 <div className="relative">
//                     <input type="text" className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
//                         id="country"
//                         value={filterCountry}
//                         onChange={(e) => setFilterCountry(e.target.value)}
//                         placeholder="Enter country" />

//                     <svg className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-400" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M10 7.88974C11.1046 7.88974 12 6.98912 12 5.87814C12 4.76716 11.1046 3.86654 10 3.86654C8.89543 3.86654 8 4.76716 8 5.87814C8 6.98912 8.89543 7.88974 10 7.88974ZM10 6.5822C10.3866 6.5822 10.7 6.26698 10.7 5.87814C10.7 5.4893 10.3866 5.17408 10 5.17408C9.6134 5.17408 9.3 5.4893 9.3 5.87814C9.3 6.26698 9.6134 6.5822 10 6.5822Z" fill="#000000" fill-rule="evenodd" /><path clip-rule="evenodd" d="M5.15 5.62669C5.15 3.0203 7.37393 1 10 1C12.6261 1 14.85 3.0203 14.85 5.62669C14.85 6.06012 14.8114 6.53528 14.7269 7.03578L18 7.8588L25.7575 5.90818C26.0562 5.83306 26.3727 5.90057 26.6154 6.09117C26.8581 6.28178 27 6.57423 27 6.88395V23.9826C27 24.4441 26.6877 24.8464 26.2425 24.9584L18.2425 26.97C18.0833 27.01 17.9167 27.01 17.7575 26.97L10 25.0193L2.24254 26.97C1.94379 27.0451 1.6273 26.9776 1.38459 26.787C1.14187 26.5964 1 26.3039 1 25.9942V8.89555C1 8.43402 1.3123 8.03172 1.75746 7.91978L5.2731 7.03578C5.18863 6.53528 5.15 6.06012 5.15 5.62669ZM10 2.70986C8.20779 2.70986 6.85 4.06691 6.85 5.62669C6.85 7.21686 7.5125 9.57287 9.40979 11.3615C9.74241 11.6751 10.2576 11.6751 10.5902 11.3615C12.4875 9.57287 13.15 7.21686 13.15 5.62669C13.15 4.06691 11.7922 2.70986 10 2.70986ZM5.80904 8.97453L3.22684 9.62382C3.09349 9.65735 3 9.77726 3 9.91476V24.3212C3 24.5165 3.18371 24.6598 3.37316 24.6121L8.77316 23.2543C8.90651 23.2208 9 23.1009 9 22.9634V13.2506C7.40353 12.024 6.39235 10.4792 5.80904 8.97453ZM11 13.2506V22.9634C11 23.1009 11.0935 23.2208 11.2268 23.2543L16.6268 24.6121C16.8163 24.6598 17 24.5165 17 24.3212V9.91477C17 9.77726 16.9065 9.65735 16.7732 9.62382L14.191 8.97453C13.6076 10.4792 12.5965 12.024 11 13.2506ZM25 22.9634C25 23.1009 24.9065 23.2208 24.7732 23.2543L19.3732 24.6121C19.1837 24.6598 19 24.5165 19 24.3212V9.91477C19 9.77726 19.0935 9.65736 19.2268 9.62382L24.6268 8.26599C24.8163 8.21835 25 8.36159 25 8.55693V22.9634Z" fill="#000000" fill-rule="evenodd" /></svg>
//                 </div>
//             </label>
//             <label htmlFor="minHeight">
//                 <div className="relative">
//                     <input type="number" className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
//                         id="minHeight"
//                         value={minHeight}
//                         onChange={(e) => setMinHeight(e.target.value)}
//                         placeholder="Min height"
//                         min="0" />

//                     <svg className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-400" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M16 10.99L13.1299 14.05C12.9858 14.2058 12.811 14.3298 12.6166 14.4148C12.4221 14.4998 12.2122 14.5437 12 14.5437C11.7878 14.5437 11.5779 14.4998 11.3834 14.4148C11.189 14.3298 11.0142 14.2058 10.87 14.05L8 10.99" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                         <path d="M21 17.4199V7.41992C21 5.21078 19.2091 3.41992 17 3.41992L7 3.41992C4.79086 3.41992 3 5.21078 3 7.41992V17.4199C3 19.6291 4.79086 21.4199 7 21.4199H17C19.2091 21.4199 21 19.6291 21 17.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                     </svg>
//                 </div>


//             </label>
//             <label htmlFor="maxHeight">
//                 <div className="relative">
//                     <input type="number" className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
//                         id="maxHeight"
//                         value={maxHeight}
//                         onChange={(e) => setMaxHeight(e.target.value)}
//                         placeholder="Max height"
//                         min="0" />

//                     <svg className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-400" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M8 13.8599L10.87 10.8C11.0125 10.6416 11.1868 10.5149 11.3815 10.4282C11.5761 10.3415 11.7869 10.2966 12 10.2966C12.2131 10.2966 12.4239 10.3415 12.6185 10.4282C12.8132 10.5149 12.9875 10.6416 13.13 10.8L16 13.8599" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                         <path d="M3 7.41992L3 17.4199C3 19.6291 4.79086 21.4199 7 21.4199H17C19.2091 21.4199 21 19.6291 21 17.4199V7.41992C21 5.21078 19.2091 3.41992 17 3.41992H7C4.79086 3.41992 3 5.21078 3 7.41992Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                     </svg>
//                 </div>
//             </label>
//             <div className="flex space-x-2">
//                 <button type="submit" className='bg-slate-500 rounded-2xl py-2 px-4 hover:bg-slate-700 transition duration-300'>Apply Filters</button>
//                 <button type="button" onClick={resetFilters} className='bg-slate-500 rounded-2xl py-2 px-4 hover:bg-slate-700 transition duration-300'>Reset Filters</button>
//             </div>
//         </form >
//     );
// };

// export default Filter;