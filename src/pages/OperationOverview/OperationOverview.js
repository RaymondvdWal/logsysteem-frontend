import "./OperationOverview.css"
import DataTable from "react-data-table-component"
import {useState, useEffect} from "react";

function OperationOverview() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            name: "User ID",
            selector: (row) => row.userId
        },
        {
            name: "Title",
            selector: (row) => row.title
        },
        {
            name: "Completed",
            selector: (row) => row.completed ? "Yes" : "No"
        }
    ]

    useEffect(() => {
        fetchTableData()
    }, [])

    async function fetchTableData() {
        setLoading(true)
        const URL = "https://jsonplaceholder.typicode.com/todos"
        const response = await fetch(URL)

        const users = await response.json();
        setData(users);
        setLoading(false)
    }
    return (
            <DataTable
                className={"rdt_TableCell rdt_TableHeader rdt_TableCol rdt_TableRow rdt_TableHeadRow rdt_Table"}
                title={"Data"}
                columns={columns}
                data={data}
                progressPending={loading}
                pagination
            />

    )
}

export default OperationOverview