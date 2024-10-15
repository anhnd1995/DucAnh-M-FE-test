import { MOCK_DATA } from "../mockData";
import { IPostData } from "./type";

export const getData = async (): Promise<IPostData[] | null> => {
  // simulate a time delay when fetching data

  setTimeout(() => {}, 1000);
  const data = MOCK_DATA;

  return data;
};
