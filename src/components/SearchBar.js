import { useState } from "react";

const SearchBar = ({handleSearch}) => {

  const [searchValue, setSearchValue] = useState('');

  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        handleSearch(searchValue);
      }} 
      class="flex items-center">
        <label for="simple-search" class="sr-only">
          Search
        </label>
        <div class="w-full">
          <input
            type="text"
            id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for topics/courses..."
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          class="p-2.5 ms-2 text-sm font-medium text-white bg-[#7179C6] rounded-lg border border-[#7179C6] hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300"
        >
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </form>
  )
}

export default SearchBar