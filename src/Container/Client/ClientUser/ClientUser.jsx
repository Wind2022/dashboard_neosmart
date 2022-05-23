import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const ClientUser = () => {
    const [allUser, setAllUser] = useState([]);

    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();
    useEffect(() => {
        const getAllUser = async () => {
            try {
                const urlGetAll = "http://localhost:8000/api/auth/getalluser";
                const res = await axios.get(urlGetAll);
                setAllUser(res.data);
            } catch (error) {}
        };
        getAllUser();
    }, []);

    return (
        <div>
            <table className="w-full text-bgButton font-medium">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Role</td>
                    </tr>
                </thead>
                {/* show data Product */}
                <tbody className="text-[rgb(51,51,51)] dark:text-[#fff] font-light">
                    {allUser?.map((item) => (
                        <tr key={item.id} className="dark:hover:hoverButton">
                            <td>{item.id}</td>
                            <td className="flex flex-row justify-start gap-2 w-40 items-center">
                                <p
                                    to="/product/edit"
                                    className="break-words hover:text-bgButton dark:hover:text-lightPrimary"
                                >
                                    {item.name}
                                </p>
                            </td>
                            <td>{item.email}</td>
                            {item.role == 1 ? <td>Admin</td> : <td>Staff</td>}

                            {/* End switched display */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientUser;
