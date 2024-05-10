import React, { useState, useEffect } from "react";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";

async function fetchData(): Promise<User[]> {
  try {
    const response = await fetch(`/api/prefeituras`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    console.log(data);
    return data.success; // Return the fetched data
  }
  
  catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of error
  }
}

function DemoPage() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    async function fetchDataAndSetData() {
      const fetchedData = await fetchData();
      setData(fetchedData);
    }

    fetchDataAndSetData();
  }, []);

  return (
    <div className="container mx-auto pt-10 ml-1.5">
      {/* <div className="bg-white z-1 relative top-1 text-2xl text-gray-500 font-semibold p-6  font-lato w-[99%] border solid 1px"><span className="p-6 ml-1.5">Status das remessas no período</span></div> */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default DemoPage;
