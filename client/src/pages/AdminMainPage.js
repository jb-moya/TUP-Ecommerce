import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

const AdminMainPage = () => {
    const [orgs, setOrgs] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [admins, setAdmins] = useState([]);

    const [orgCount, setOrgCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [adminCount, setAdminCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageCount, setMaxPageCount] = useState(1);

    const fetchUser = useCallback(
        async (role, setUsers, setCount) => {
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/api/v1/user",
                    {
                        params: {
                            page: currentPage,
                            role: role,
                        },
                    }
                );

                console.log(`HAHAf ${role}`, data);
                setUsers(data.users);
                setCount(data.users.length);
                // setMaxPageCount(Math.ceil(data.count / 10));
            } catch (error) {
                console.error(error);
            } finally {
                toast.success("Products loaded successfully");
            }
        },
        [currentPage]
    );

    useEffect(() => {
        fetchUser("organization", setOrgs, setOrgCount);
        fetchUser("customer", setCustomers, setCustomerCount);
        fetchUser("admin", setAdmins, setAdminCount);
    }, [fetchUser]);

    return <div>AdminMainPage</div>;
};

export default AdminMainPage;
