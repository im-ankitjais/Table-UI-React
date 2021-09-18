import React from 'react';
import "../../assets/css/TableHead.css";

const columns = [
    {
        name: "Rank",
        selector: "rank",
        width: "swd",
        align: "center",
        sortable: true
    },
    {
        name: "Name",
        selector: "name",
        width: "lwd",
        align: "center",
        sortable: false
    },
    {
        name: "Change% (24hr)",
        selector: "change",
        width: "wd",
        align: "center",
        sortable: true
    },
    {
        name: "Price",
        selector: "price",
        width: "wd",
        align: "right",
        sortable: true
    },
    {
        name: "Market Cap",
        selector: "market_cap",
        width: "wd",
        align: "center",
        sortable: true
    },
    {
        name: "Actions",
        selector: "actions",
        width: "swd",
        align: "center",
        sortable: false
    }
  ];
//   
const Head = ({currency}) => {
    return (
        <div className="table_head">
            {columns.map((column) => (
                <div 
                 className={`table_column ${column.width} align-${column.align}`}
                 >
                 {column.name === "Price" ? `${column.name} / ${currency}`:`${column.name}`}
                 </div>
            ))}
        </div>
    )
}

export default Head