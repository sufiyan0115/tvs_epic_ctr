import axios from "axios";
import { format, formatDistance } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config/constants";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";

function PendingListPage() {
  const navigate = useNavigate();
  const [pendingList, setPendingList] = useState<any[]>([]);
  const { user } = useAuth();

  const fetchPendingList = async () => {
    try {
      const response = await axios.get(`${API_URL}template/pending`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = response.data;
      console.log(response);
      setPendingList(data);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    fetchPendingList();
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full">
        <Navbar></Navbar>
      </div>

      <div className="container flex flex-col min-h-screen ">
        <div className=" py-10 flex justify-between">
          <span className="text-4xl font-black text-accent">
            Pending Templates
          </span>
        </div>

        <div className="w-full">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-center rounded-md">
                    <thead className="border-b ">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-bold text-gray-900 px-6 py-4"
                        >
                          S/L No.
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-bold text-gray-900 px-6 py-4"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-bold text-gray-900 px-6 py-4 "
                        >
                          Created On
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-bold text-gray-900 px-6 py-4 "
                        >
                          Last Updated
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingList.length > 0 && (
                        <>
                          {pendingList.map((pending, i) => (
                            <tr
                              key={pending.id}
                              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                navigate(`/template/pending/${pending.id}`);
                              }}
                            >
                              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                                {i}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-6 whitespace-nowrap">
                                {pending.name}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-6 whitespace-nowrap">
                                {format(
                                  new Date(pending.creationTime),
                                  "dd/MM/yyyy"
                                )}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-6 whitespace-nowrap">
                                {formatDistance(
                                  new Date(pending.lastUpdated),
                                  new Date(),
                                  { addSuffix: true }
                                )}
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingListPage;
