import { filterProps } from "@mantine/core";
import { format, formatDistance } from "date-fns";
import React from "react";
import { HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import TableFooter from "./TableFooter";

function ApplicationTable({ draftList, onDeleteClick, type }: any) {
  const navigate = useNavigate();
  return (
    <table className="w-full h-full text-center rounded-md">
      <thead className="border-b sticky top-0 bg-white">
        <tr>
          <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4">
            S/L No.
          </th>
          <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4">
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
          <th
            scope="col"
            className="text-sm font-bold text-gray-900 px-6 py-4 "
          >
            {type === "draft" && "Delete"}
            {/* {type === "pending" && "Submitted On"} */}
          </th>
        </tr>
      </thead>
      <tbody className="w-full">
        {draftList.length > 0 && (
          <>
            {draftList.map((draft: any, i: number) => (
              <tr
                key={draft.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  if (type === "draft")
                    navigate(`/template/draft/preview/${draft.id}`);
                  else navigate(`/template/${type}/${draft.id}`);
                }}
                onContextMenu={(e) => {
                  console.log(e);
                }}
              >
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                  {i + 1}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-6 whitespace-nowrap">
                  {draft.name}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-6 whitespace-nowrap">
                  {format(new Date(draft.creationTime), "dd/MM/yyyy")}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-6 whitespace-nowrap">
                  {formatDistance(new Date(draft.lastUpdated), new Date(), {
                    addSuffix: true,
                  })}
                </td>
                {type === "draft" && (
                  <td className="text-sm text-gray-900 font-light px-6 py-6 whitespace-nowrap">
                    <button
                      onClick={(e: any) => {
                        onDeleteClick(e, draft.id);
                      }}
                      type="button"
                      className="text-accent border border-accent hover:bg-accent hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                    >
                      <HiTrash />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}

export default ApplicationTable;
