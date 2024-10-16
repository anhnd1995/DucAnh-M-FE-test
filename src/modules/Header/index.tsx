import useExportFile from "@/hooks/useExportFile";
import { getData } from "@/services/api";
import { DotsVerticalIcon, DownloadIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const { data, error } = useQuery({
    queryKey: ["getData"],
    queryFn: getData,
  });

  console.log("🚀 ~ Header ~ data:", data);

  const { handleExportCSV, handleExportPDF } = useExportFile({
    data: data ?? [],
  });

  if (error) return null;

  return (
    <div
      className="bg-white fixed top-0 left-0 h-[40px] z-10 shadow-md flex items-center justify-end gap-10"
      style={{ width: "calc(100% - 257px)", marginLeft: "257px" }}
    >
      <div className="dropdown dropdown-bottom dropdown-end mr-5">
        <div tabIndex={0} role="button" className="pl-4 pr-5 ">
          <DotsVerticalIcon width={20} height={20} />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li onClick={handleExportCSV}>
            <span>
              <DownloadIcon /> Export CSV
            </span>
          </li>
          <li onClick={handleExportPDF}>
            <span>
              <DownloadIcon /> Export PDF
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
