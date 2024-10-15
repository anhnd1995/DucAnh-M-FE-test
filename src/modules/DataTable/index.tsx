"use client";
import { getData } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useEffect, useState } from "react";
// import s from "./DataTable.module.scss";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import { IPostData } from "@/services/type";
import { dateBetweenFilterFn } from "@/utils/tableFilter";
import {
  DotsVerticalIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@radix-ui/react-icons";
import type {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  HeaderGroup,
  SortingState,
} from "@tanstack/react-table";
import dayjs from "dayjs";

declare module "@tanstack/table-core" {
  interface FilterFns {
    dateBetweenFilterFn: FilterFn<unknown>;
  }
}

const DataTable = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["getData"],
    queryFn: getData,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 12, //default page size
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    date: true,
    likes: true,
    shares: true,
    comments: true,
    engagement: true,
  });

  const columns = React.useMemo<Array<ColumnDef<IPostData>>>(
    () => [
      {
        accessorKey: "date",
        header: () => "Date",
        cell: (cell) =>
          dayjs(
            cell.getValue() as string | number | Date | null | undefined
          ).format("DD/MM/YYYY"),

        // meta: {
        //   filterVariant: "range",
        // },
        filterFn: "dateBetweenFilterFn",
        // Filter: ,
      },
      {
        accessorKey: "likes",
        header: () => "Likes",
        size: 50,
      },
      {
        accessorKey: "shares",
        header: () => "Shares",
        size: 50,
      },
      {
        accessorKey: "comments",
        header: "Comments",
      },
      {
        accessorKey: "engagement",
        header: "Engagement",
        size: 80,
      },
    ],
    []
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    filterFns: {
      dateBetweenFilterFn,
    },
    state: {
      sorting,
      columnFilters,
      pagination,
      globalFilter,
      columnVisibility,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    debugTable: true,
  });

  const { rows } = table.getRowModel();

  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 20,
  });

  const toggleColumnVisibility = (columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  return (
    <div className="">
      <div className="relative flex items-center justify-between border-b border-neutral dark:border-dark-neutral-border mb-[20px] pb-[16px] min-w-[852px] lg:min-w-fit">
        <p className="text-base leading-5 text-gray-1100 font-semibold dark:text-gray-dark-1100 ">
          Total Interactions Overtime
        </p>
        <div className="filter absolute p-2 right-[16px]">
          <div className="dropdown dropdown-bottom dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-2 opacity-70 text-sm"
            >
              Show / Hide
              <DotsVerticalIcon />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <div
                  className="form-control"
                  onClick={() => toggleColumnVisibility("likes")}
                >
                  <label className="label cursor-pointer pointer-events-none">
                    <input
                      type="checkbox"
                      readOnly
                      checked={columnVisibility.likes}
                      className="checkbox checkbox-primary checkbox-sm mr-2"
                    />
                    <span className="label-text">Likes</span>
                  </label>
                </div>
              </li>
              <li>
                <div
                  className="form-control"
                  onClick={() => toggleColumnVisibility("shares")}
                >
                  <label className="label cursor-pointer  pointer-events-none">
                    <input
                      type="checkbox"
                      readOnly
                      checked={columnVisibility.shares}
                      className="checkbox checkbox-primary checkbox-sm mr-2"
                    />
                    <span className="label-text">Shares</span>
                  </label>
                </div>
              </li>
              <li>
                <div
                  className="form-control"
                  onClick={() => toggleColumnVisibility("comments")}
                >
                  <label className="label cursor-pointer  pointer-events-none">
                    <input
                      type="checkbox"
                      readOnly
                      checked={columnVisibility.comments}
                      className="checkbox checkbox-primary checkbox-sm mr-2"
                    />
                    <span className="label-text">Comments</span>
                  </label>
                </div>
              </li>
              <li>
                <div
                  className="form-control"
                  onClick={() => toggleColumnVisibility("engagement")}
                >
                  <label className="label cursor-pointer  pointer-events-none">
                    <input
                      type="checkbox"
                      readOnly
                      checked={columnVisibility.engagement}
                      className="checkbox checkbox-primary checkbox-sm mr-2"
                    />
                    <span className="label-text">Engagement</span>
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div ref={parentRef} className="container">
        {isClient && (
          <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
            <table
              className="w-full min-w-[852px] lg:min-w-fit"
              suppressHydrationWarning={true}
            >
              <thead>
                {table
                  .getHeaderGroups()
                  .map((headerGroup: HeaderGroup<IPostData>) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <th
                            data-testid={`table-header-${header.id}`}
                            key={header.id}
                            colSpan={header.colSpan}
                            style={{ width: header.getSize() }}
                            className="text-gray-400 leading-4 font-normal text-left pb-3 dark:text-gray-dark-400 text-[14px] first:!w-[50px]"
                          >
                            {header.isPlaceholder ? null : (
                              <>
                                <div
                                  {...{
                                    className: header.column.getCanSort()
                                      ? "cursor-pointer select-none flex items-center  relative"
                                      : "",
                                    onClick:
                                      header.column.getToggleSortingHandler(),
                                  }}
                                >
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                  {/* {{
                                    asc: <TriangleUpIcon />,
                                    desc: <TriangleDownIcon />,
                                  }[header.column.getIsSorted() as string] ??
                                    null} */}
                                  {
                                    <div className="flex flex-col ">
                                      <TriangleUpIcon
                                        className={`translate-y-1 ${
                                          header.column.getIsSorted() === "asc"
                                            ? "opacity-100"
                                            : "opacity-25"
                                        } `}
                                      />
                                      <TriangleDownIcon
                                        className={`-translate-y-1 ${
                                          header.column.getIsSorted() === "desc"
                                            ? "opacity-100"
                                            : "opacity-25"
                                        }  `}
                                      />
                                    </div>
                                  }
                                  {header.column.getCanFilter() ? (
                                    <div
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <Filter
                                        column={header.column}
                                        table={table}
                                      />
                                    </div>
                                  ) : null}
                                </div>
                              </>
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  ))}
              </thead>
              <tbody>
                {isFetching && (
                  <div className="text-center min-h-[600px] grid place-items-center w-[90%] absolute">
                    <span className="loading loading-infinity loading-lg"></span>
                  </div>
                )}
                {!isFetching && rows.length === 0 && (
                  <div className="text-center min-h-[600px] grid place-items-center w-[90%] absolute">
                    <span>No data found</span>
                  </div>
                )}
                {virtualizer.getVirtualItems().map((virtualRow, index) => {
                  const row = rows[virtualRow.index];
                  return (
                    <tr
                      key={row.id}
                      style={{
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${
                          virtualRow.start - index * virtualRow.size
                        }px)`,
                      }}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="mt-[40px]">
        <div className="h-[34px]"></div>
      </div>
      <div className="absolute right-[25px] bottom-[25px]">
        <Pagination table={table} />
      </div>
    </div>
  );
};

export default DataTable;
