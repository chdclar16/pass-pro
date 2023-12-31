import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEvent } from "../redux/slices/eventSlice";
import dayjs from "dayjs";

function MyTickets({ myEvents }) {
    const dispatchEvent = useDispatch();

    return (
        <>
            <h1 className="text-center">My Tickets</h1>
            <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                        <th
                            scope="col"
                            className=" px-6 py-4 dark:border-neutral-500"
                        >
                            Date
                        </th>
                        <th
                            scope="col"
                            className=" px-6 py-4 dark:border-neutral-500"
                        >
                            Venue
                        </th>
                        <th
                            scope="col"
                            className=" px-6 py-4 dark:border-neutral-500"
                        >
                            City
                        </th>
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
                    {myEvents.sales?.length !== 0 ? (
                        myEvents.sales?.map((sale) => (
                            <tr
                                key={sale.sale_id}
                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                            >
                                <td className="whitespace-nowrap px-6 py-4">
                                    {dayjs(sale.date).format("MM/DD/YYYY")}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <Link
                                        className="hover:text-blue-400"
                                        to="/events/detail"
                                        onClick={() =>
                                            dispatchEvent(setEvent(sale))
                                        }
                                    >
                                        {sale.event_name}
                                    </Link>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {sale.venue}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {sale.city}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {sale.sale_quantity}
                                </td>
                                <td>
                                    <Link
                                        onClick={() =>
                                            dispatchEvent(setEvent(sale))
                                        }
                                        to="/events/detail"
                                        className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                        type="button"
                                    >
                                        Details
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                                <Link
                                    className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 ease-in-out duration-300 hover:border-transparent rounded"
                                    type="button"
                                    to="/events/list"
                                >
                                    Checkout our Events Here!
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default MyTickets;
