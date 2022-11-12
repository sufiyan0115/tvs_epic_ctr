import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../config/constants";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import SkeletonTable from "../components/ListPages/SkeletonTable";
import ApplicationTable from "../components/ListPages/ApplicationTable";
import TableFooter from "../components/ListPages/TableFooter";
import {
  navigateUrlGenerator,
  UrlGenerator,
} from "../components/ListPages/UrlGenerator";
import { HiSearch } from "react-icons/hi";

function DraftListPage(props: any) {
  const [draftList, setDraftList] = useState<any[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);

  const type = props.templateType;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.has("page") ? parseInt(queryParams.get("page")!) : 1;
  const search = queryParams.has("search") ? queryParams.get("search")! : "";

  //here
  const onDeleteClick = async (e: any, id: string) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const resp = await axios.delete(`${API_URL}template/draft/${id}`, {
        headers: { Authorization: `${user.token}` },
      });
      toast.success(`Template deleted successfully`);
      await fetchDraftList(page);
      setLoading(false);
    } catch (err) {
      toast.error("Template not deleted 😢");
      setLoading(false);
    }
  };

  const [searchContent, setSearchContent] = useState(search);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(searchContent);
    navigate(navigateUrlGenerator(page, searchContent));
  }, [searchContent]);

  useEffect(() => {
    fetchDraftList(page);
  }, [page, type, search]);

  const fetchDraftList = async (page: number) => {
    try {
      const response = await axios.get(UrlGenerator(page, type, search), {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = response.data;
      setDraftList(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  let headingText = "Drafts";
  if (type === "pending") headingText = "Pending Templates";
  if (type === "rejected") headingText = "Rejected Templates";
  if (type === "approved") headingText = "Approved Templates";

  const overflowXClass = totalPages ? "overflow-x-auto" : "";
  const overflowYClass = totalPages ? "overflow-y-auto" : "";

  return (
    <div className="w-full  flex-col flex items-center">
      <div className="w-full">
        <Navbar></Navbar>
      </div>
      <div className="container flex flex-col min-h-screen ">
        <div className=" py-10 flex justify-between">
          <span className="text-4xl font-black text-accent">{headingText}</span>
          {type === "draft" && (
            <button className="btn btn-sm btn-accent hidden lg:flex">
              <Link to={"/template/draft"}>Add New Template</Link>
            </button>
          )}
        </div>

        <div className="w-full py-2">
          <div className="flex w-1/4">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <HiSearch />
            </span>
            <input
              type="text"
              id="website-admin"
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="search"
              value={searchContent}
              onChange={(e) => {
                setSearchContent(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col">
            <div className={`${overflowXClass} sm:-mx-6 lg:-mx-8`}>
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div
                  className={`${overflowXClass} ${overflowYClass} max-h-[500px] rounded-md relative`}
                >
                  {loading && <SkeletonTable />}
                  {!loading && draftList.length === 0 && (
                    <div className="text-3xl">
                      {" "}
                      Looks like you have no{" "}
                      <span className="font-bold"> {headingText}</span>{" "}
                    </div>
                  )}
                  {!loading && draftList.length > 0 && (
                    <ApplicationTable
                      type={type}
                      draftList={draftList}
                      onDeleteClick={onDeleteClick}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {!loading && <TableFooter totalPages={totalPages} page={page} />}
      </div>
    </div>
  );
}

export default DraftListPage;
