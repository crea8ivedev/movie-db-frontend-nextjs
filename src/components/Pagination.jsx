import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Pagination({ metadata }) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 8;
  const router = useRouter()

  const navigate = (page) =>{
    let url = `/movies?page=${page}`;
    if(limit){
        url += `&limit=${limit}`
    }
    router.push(url)
  }

  return (
    <nav aria-label="Page navigation example">
      <div className="flex items-center h-10 text-base space-x-1">
        <div>
          <button
            onClick={() => navigate(page - 1)}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-200 rounded-s-lg hover:text-gray-300 disabled:cursor-not-allowed"
            disabled={page - 1 < 1}
          >
            <span className="text-sm font-semibold">Prev</span>
          </button>
        </div>

        {Array(metadata.totalPages || 1)
          .fill(null)
          .map((_v, i) => {
            return (
              <div key={i}>
                <button
                  onClick={() => navigate(i + 1)}
                  className={classNames(
                    "flex items-center justify-center px-4 h-10 rounded leading-tight text-gray-100 hover:bg-gray-300 hover:text-gray-400",
                    page == i + 1 ? "bg-primary" : "!bg-primary-darker"
                  )}
                >
                  {i + 1}
                </button>
              </div>
            );
          })}

        <div>
        <div>
          <button
            onClick={() => navigate(+page + 1)}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-200 rounded-s-lg hover:text-gray-300 disabled:cursor-not-allowed"
            disabled={+page + 1 > metadata.totalPages}
          >
            <span className="text-sm font-semibold">Next</span>
          </button>
        </div>
        </div>
      </div>
    </nav>
  );
}
