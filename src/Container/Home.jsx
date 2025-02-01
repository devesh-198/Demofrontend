import React, { useEffect, useState } from "react";

import classes from './Home.module.css';
import { API_URL } from "../constants";
import axios from "axios";
import ScatteredChart from "../Components/ScatteredChart";
import HistogramChart from "../Components/HistogramChart";
import Barchart from "../Components/Barchart";
import ReactTable from "../Components/ReactTable/Table";

function Home(props) {
    const [controls, setControls] = useState({
        "response": null,
        "loading": true,
        "error": false,
    });

    const loadApiData = (sortBy, order, pageNumber, perPageCount, songTitle) => {
        const baseUrl = API_URL();

        setControls(prevControls => ({...prevControls, "loading": true}));

        let URL = `${baseUrl}api/dance-profiles/`;

        const searchParams = new URLSearchParams();

        if (sortBy) {
            searchParams.append("sortBy", sortBy);
            searchParams.append("order", order);
        }

        if (pageNumber) searchParams.append("pageNumber", pageNumber);
        if (perPageCount) searchParams.append("perPageCount", perPageCount);
        if (songTitle) searchParams.append("songTitle", songTitle);

        const queryParams = searchParams.toString();

        if (queryParams) {
            URL = `${URL}?${queryParams}`
        }

        axios({
            // Endpoint to send files
            url: URL,
            method: "GET",
        })
            // Handle the response from backend here
            .then((res) => {
                console.log("res.data", res.data);
                const data = res.data;

                if (data?.head?.status !== 200) {
                    // Error
                    setControls(prevControls => ({...prevControls, "error": data?.head?.statusDescription, "loading": false}));
                } else {
                    // Success
                    setControls(prevControls => ({...prevControls, "response": data?.body, "error": null, "loading": false}));
                }

            })
            // Catch errors if any
            .catch((err) => {
                setControls(prevControls => ({...prevControls, "error": "Something went wrong.", "loading": false}));
                console.log(err);
            });

        console.log(baseUrl);
    }

    const setRating = (rating, songId) => {
        const baseUrl = API_URL();

        axios({
            url: `${baseUrl}api/dance-rating/`,
            method: "POST",
            data: {rating, songId},
        })
            .then(res => {
                if (res.data?.head?.status === 200) {
                    const apiData = controls.response;

                    loadApiData(apiData?.sortBy, apiData?.sortOrder, apiData?.pageNumber, apiData?.perPageCount);
                }
            })
            .catch(err  => {
                alert("Something went wrong. Please try again.");
            })
    }

    const searchSongCallBack = (searchTerm) => {
        console.log(searchTerm);
        const apiData = controls.response;

        loadApiData(apiData?.sortBy, apiData?.sortOrder, 0, apiData?.perPageCount, searchTerm);
    }

    useEffect(() => {
        loadApiData();
    }, []);

    console.log("controls------------", controls);

    return (
        <div className={classes.Home}>
            <div className={classes.chartContainer}>
                {
                    controls.response?.scatteredChart ? (
                        <ScatteredChart scatteredChart={controls.response?.scatteredChart} />
                    ) : null
                }
                {
                    controls.response?.histogramChart ? (
                        <HistogramChart histogramChart={controls.response?.histogramChart} />
                    ) : null
                }
                {
                    controls.response?.barchart ? (
                        <Barchart barchart={controls.response?.barchart}/>
                    ) : null
                }
            </div>

            {
                controls.response ? (
                    <ReactTable
                        tableData={controls.response.tableData}
                        tableHeaders={controls.response.tableHeaders}
                        sortBy={controls.response?.sortBy}
                        sortOrder={controls.response?.sortOrder}
                        isNextPage={controls.response?.isNextPage}
                        pageNumber={controls.response?.pageNumber}
                        perPageCount={controls.response?.perPageCount}
                        loadApiData={loadApiData}
                        setRating={setRating}
                        searchSongCallBack={searchSongCallBack}
                    />
                ) : null
            }
        </div>
    );
}

export default Home;
