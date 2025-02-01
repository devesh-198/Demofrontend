import React from "react";
import { CSVLink } from "react-csv";


import classes from './Table.module.css';

const STAR_CHOICES = {
    0: '☆☆☆☆☆',
    1: '★☆☆☆☆',
    2: '★★☆☆☆',
    3: '★★★☆☆',
    4: '★★★★☆',
    5: '★★★★★',
}

function ReactTable(props) {
    return (
        <>
            <div className={classes.tableTopControls}>
                <input 
                    className={classes.searchSong} 
                    placeholder="Search song title" 
                    onChange={(event) => props.searchSongCallBack(event.target.value)}
                />
                <div className={classes.pageSizeBlock}>
                    <select 
                        className={classes.pageSizeDropdown}
                        title="Page Size" 
                        onChange={(event) => props.loadApiData(props.sortBy, props.sortOrder, 0, event.target.value)}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <CSVLink className={classes.csvButton} data={[props.tableHeaders.map(head => head.name), ...props.tableData]}>Download CSV</CSVLink>
            </div>

            <div style={{maxWidth: "100%", overflowX: "scroll", scrollbarWidth: "none"}}>
                <table 
                    style={{width: "100%"}}
                >
                    <thead>
                        <tr className={classes.tableRow}>
                            {
                                props.tableHeaders.map((header, i) => (
                                    <th 
                                        key={header.unique_name}
                                        onClick={() => props.loadApiData(header.unique_name, props.sortOrder === "DESC" ? "ASC" : "DESC", 0, props.perPageCount)}
                                        style={{
                                            // textAlign: i > 0 ? "right" : "left",
                                            color: props?.sortBy === header.unique_name ? "#006aff" : "#202020",
                                        }}
                                        className={classes.tableHead}
                                    >
                                        <div 
                                            className={classes.headBlock}
                                            style={{
                                                justifyContent: i > 0 ? "flex-end" : "flex-start",
                                            }}
                                        >
                                            <span className={classes.headerValue}>{header?.name}</span>
                                            {
                                                props?.sortBy !== header.unique_name ? (
                                                    <i className="fa fa-sort"></i>
                                                ) : props?.sortOrder === "DESC" ? (
                                                    <i className="fa fa-sort-numeric-desc" aria-hidden="true"></i>
                                                ) : <i className="fa fa-sort-numeric-asc" aria-hidden="true"></i>
                                            }
                                        </div>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.tableData.map((data, i) => (
                                <tr key={i} className={classes.tableRow}>
                                    {
                                        data.map((value, idx) => (
                                            <td 
                                                key={idx}
                                                style={{
                                                    textAlign: idx > 0 ? "right" : "left",
                                                }}
                                                className={classes.tableValues}
                                            >
                                                {
                                                    props.tableHeaders[idx]?.type === 'rating' ? (
                                                        <div style={{cursor: "pointer"}} title="Click to add/change rating">
                                                            {
                                                                STAR_CHOICES[value].split('').map((star, starIdx) => (
                                                                    <span 
                                                                        key={starIdx} 
                                                                        onClick={() => props.setRating(starIdx + 1, data[0])}
                                                                    >
                                                                        {star}
                                                                    </span>
                                                                ))
                                                            }
                                                        </div>
                                                    ) : value
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className={classes.pageDetail}>
                Showing result {(props.perPageCount * props.pageNumber) + 1} - {props.perPageCount * (props.pageNumber + 1)}
            </div>

            <div className={classes.paginnationBlock}>
                <button 
                    className={classes.paginationButtton}
                    disabled={props.pageNumber == 0}
                    onClick={() => props.loadApiData(props.sortBy, props.sortOrder, props.pageNumber - 1, props.perPageCount)}
                >
                    Previous
                </button>
                <button 
                    className={classes.paginationButtton}
                    disabled={!props.isNextPage}
                    onClick={() => props.loadApiData(props.sortBy, props.sortOrder, props.pageNumber + 1, props.perPageCount)}
                >
                    Next
                </button>
            </div>

        </>
    );
}

export default ReactTable;