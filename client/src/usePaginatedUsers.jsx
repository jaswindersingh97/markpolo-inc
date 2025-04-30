import { useState, useEffect, useCallback } from "react";

const usePaginatedUsers = (page, limit, search) => {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/users?page=${page}&limit=${limit}&search=${search}`);
            const data = await response.json();
            setUsers(data.data);
            setTotal(data.total);
        } catch (error) {
            setError("Error fetching users.");
        } finally {
            setLoading(false);
        }
    }, [page, limit, search]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { users, total, loading, error };
};

export default usePaginatedUsers