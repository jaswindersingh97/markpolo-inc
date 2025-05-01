import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const usePaginatedUsers = (page, limit, search) => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
        params: { page, limit, search },
      });
      setUsers(prev => (page === 1 ? data.data : [...prev, ...data.data]));
      setTotal(data.total);
    } catch {
      setError("Error fetching users.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);
  
  useEffect(() => {
    if (users.length >= total && page !== 1) return;
    fetchUsers();
  }, [fetchUsers]);

  return { users, total, loading, error };
};

export default usePaginatedUsers;
