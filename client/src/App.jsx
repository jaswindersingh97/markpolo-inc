import React, { useState } from "react";
import usePaginatedUsers from "./usePaginatedUsers"; // Assuming custom hook is created

const App = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const { users, total, loading, error } = usePaginatedUsers(page, 50, search);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1); // Reset page to 1 when search changes
    };

    const handleScroll = (e) => {
        if (e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight) {
            setPage(prev => prev + 1);
        }
    };

    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold">User List</h1>
            </header>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by Name or Email"
                    className="border p-2 rounded w-full"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Phone</th>
                            <th className="px-4 py-2 text-left">Company (City)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="4" className="text-center py-4">Loading...</td>
                            </tr>
                        )}
                        {error && (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-red-600">{error}</td>
                            </tr>
                        )}
                        {users.length === 0 && !loading && (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No users found</td>
                            </tr>
                        )}
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.phone}</td>
                                <td className="px-4 py-2">{user.company.name} ({user.address.city})</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination or Infinite Scroll */}
            <div className="my-4 flex justify-between">
                {loading && (
                    <div className="text-center w-full">
                        <span>Loading more...</span>
                    </div>
                )}

                {!loading && !error && users.length < total && (
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        className="border px-4 py-2 rounded bg-blue-500 text-white"
                    >
                        Load More
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="text-center text-red-600 mt-4">
                    <span>An error occurred. Please try again.</span>
                </div>
            )}
        </div>
    );
};

export default App;
