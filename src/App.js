import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillCaretUpFill } from "react-icons/bs";
import axios from "axios";

import "./App.css";

const App = () => {
  const [page, SetPage] = useState(0);
  const [apidata, Setapidata] = useState([]);

  const getApidata = (page) => {
    axios
      .get(`https://hn.algolia.com/api/v1/search?&page=${page}`)
      .then(function (response) {
        // handle success
        console.log(response.data.hits);
        Setapidata(response.data.hits);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // empty for now
      });
  };

  const created_in_hours = (created) => {
    var today1 = new Date();
    // var created = "2013-05-16T20:57:17.000Z"; Testing variable
    var created_format = new Date(created);
    var difference = today1.getTime() - created_format.getTime();
    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;
    return hoursDifference;
  };
  useEffect(() => {
    getApidata(page);
    created_in_hours();
  }, [page]);

  return (
    <div className="text-center container">
      <table className="table">
        <thead>
          <tr className="tableheading">
            <th scope="col">Comments</th>
            <th scope="col">Votecount</th>
            <th scope="col">Upvotes</th>
            <th scope="col" className="text-left">
              News Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ display: "none" }}>
            <th scope="row">200</th>
            <td>150</td>
            <td>
              <button />
            </td>
            <td>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.{" "}
            </td>
          </tr>

          {apidata.map((d) => {
            return (
              <tr key={d.objectID}>
                <th scope="row">
                  {d.num_comments == null ? 0 : d.num_comments}
                </th>
                <td>{d.points}</td>
                <td>
                  <span style={{ opacity: "0.5" }}>
                    <BsFillCaretUpFill />
                  </span>
                </td>
                <td className="text-left">
                  {d.title == "" || d.title == null
                    ? d._highlightResult.title?.value == null ||
                      d._highlightResult.title?.value == ""
                      ? "Title is empty in the given API"
                      : d._highlightResult.title.value
                    : d.title}
                  <span className="url">
                    {d.url === null ? (
                      ""
                    ) : (
                      <a
                        href={d.url}
                        style={{ textDecoration: "none", color: "grey" }}
                      >
                        (
                        {`${d.url}`.substring(
                          0,
                          `${d.url}`.lastIndexOf("com") + "com".length
                        )}
                        )
                      </a>
                    )}
                    by
                    <span style={{ fontWeight: "bold" }}> {d.author}</span>
                    <span> {created_in_hours(d.created_at)} hours ago</span>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="prev-next ">
              <span>
                <span
                  // style={{ cursor: "pointer" }}

                  style={
                    page == 0 ? { display: "none" } : { cursor: "pointer" }
                  }
                  onClick={() => {
                    SetPage(page - 1);
                  }}
                >
                  {" "}
                  Previous
                </span>
                <span> | </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    SetPage(page + 1);
                  }}
                >
                  Next
                </span>
              </span>
            </td>
          </tr>
        </tfoot>
      </table>{" "}
      {page}
    </div>
  );
};

export default App;
