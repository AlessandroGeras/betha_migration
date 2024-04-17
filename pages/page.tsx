import React, { useState, useEffect } from "react";
import { Payment, columns } from "./datatables/columns";
import { DataTable } from "./datatables/data-table";

async function fetchData(): Promise<Payment[]> {
  try {
    const response = await fetch(`/api/page`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data.success; // Return the fetched data
  }
  
  catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of error
  }
}

function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    async function fetchDataAndSetData() {
      const fetchedData = await fetchData();
      setData(fetchedData);
    }

    fetchDataAndSetData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default DemoPage;
