import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useGetTokenQuery } from "../redux/store/accountsApi";
import { setEvent } from "../redux/slices/eventSlice";

function MyTickets() {
    const [account, setAccount] = useState([]);
    const dispatchEvent = useDispatch();
    // const accountInfo = useGetTokenQuery();
    // const accountId = accountInfo.currentData.account.id;

    useEffect(() => {
        const fetchAccountData = async () => {
            const url = `http://localhost:8000/api/accounts/5a148dd8-fe0d-4efd-86b1-af3917a2bdbf`;
            // ${accountId}
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setAccount(data.sales);
            }
        };
        // fetchSaleData();
        fetchAccountData();
    }, []);
    // [accountId]

    return (
        <>
            <h1>Temp list to GET sales</h1>
            <h1 className="text-center">My Tickets</h1>
            <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                        <th
                            scope="col"
                            className=" px-6 py-4 dark:border-neutral-500"
                        >
                            Event
                        </th>
                        <th
                            scope="col"
                            className=" px-6 py-4 dark:border-neutral-500"
                        >
                            Ticket Quantity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {account?.map((sale) => {
                        return (
                          <tr
                            key={sale.sale_id}
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                          >
                            <td className="whitespace-nowrap px-6 py-4">
                                {sale.event_name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {sale.sale_quantity}
                            </td>
                            <td>
                              <Link
                                onClick={() => dispatchEvent(setEvent(sale))}
                                to="/events/detail"
                                className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                type="button"
                              >
                                Details
                              </Link>
                            </td>
                          </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default MyTickets;
