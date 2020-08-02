import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillCaretUpFill } from "react-icons/bs";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./App.css";

const App = () => {
  const [page, SetPage] = useState(0);
  const [apidata, Setapidata] = useState([]);
  const [lstorage, Setlstorage] = useState([]);

  const getApidata = (page) => {
    let localStorage1 = JSON.parse(localStorage.getItem("apidata"));
    if (localStorage1 == null) {
      axios
        .get(`https://hn.algolia.com/api/v1/search?&page=${page}`)
        .then(function (response) {
          // handle success
          // console.log(response.data.hits);
          Setapidata(response.data.hits);
          localStorage.setItem("apidata", JSON.stringify(response.data.hits));
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // empty for now
        });
    } else {
      Setapidata(localStorage1);
    }
  };
  const IncrementVote = (prep) => {
    let obj = apidata.find((x) => x.objectID == prep);
    console.log(obj);
    let index = apidata.indexOf(obj);
    console.log(index);
    apidata.fill((obj.points = obj.points + 1), index, index++);
    console.log(apidata);
    localStorage.setItem("apidata", JSON.stringify(apidata));
    // window.location.reload(false);
    Setapidata(JSON.parse(localStorage.getItem("apidata")));
  };
  const created_in_hours = (created) => {
    var today1 = new Date();
    // var created = "2013-05-16T20:57:17.000Z"; Testing variable
    var created_format = new Date(created);
    var difference = today1.getTime() - created_format.getTime();
    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);

    return hoursDifference;
  };
  useEffect(() => {
    getApidata(page);
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
                  <span
                    style={{ opacity: "0.5" }}
                    onClick={() => {
                      IncrementVote(d.objectID);
                    }}
                  >
                    <BsFillCaretUpFill />
                  </span>
                </td>
                <td className="text-left" style={{ fontWeight: "bold" }}>
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
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      {" "}
                      {d.author}
                    </span>
                    <span> {created_in_hours(d.created_at)} hours ago</span>
                    <span>
                      [<a style={{ cursor: "pointer", color: "black" }}>hide</a>
                      ]
                    </span>
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
      <hr className="orange" />
      <ResponsiveContainer width={"99%"} height={300}>
        <LineChart
          width={1100}
          height={200}
          data={apidata}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="objectID" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" />

          <Line type="monotone" dataKey="points" stroke="blue" name="Votes" />
        </LineChart>
      </ResponsiveContainer>
      <hr className="orange" />
    </div>
  );
};

export default App;
