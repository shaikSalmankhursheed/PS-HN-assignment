import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillCaretUpFill } from "react-icons/bs";

import "./App.css";

function App() {
  const [page, SetPage] = useState(0);
  const getApidata = (page) => {};
  return (
    <div className="text-center">
      {page}
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
          <tr>
            <th scope="row">200</th>
            <td>150</td>
            <td>
              <span style={{ opacity: "0.5" }}>
                <BsFillCaretUpFill />
              </span>
            </td>
            <td className="text-left">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.{" "}
            </td>
          </tr>
          <tr>
            <th scope="row">200</th>
            <td>150</td>
            <td>
              <span style={{ opacity: "0.5" }}>
                <BsFillCaretUpFill />
              </span>
            </td>
            <td className="text-left">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.{" "}
            </td>
          </tr>
          <tr>
            <th scope="row">200</th>
            <td>150</td>
            <td>
              <span style={{ opacity: "0.5" }}>
                <BsFillCaretUpFill />
              </span>
            </td>
            <td className="text-left">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.{" "}
            </td>
          </tr>
          <tr>
            <th scope="row">200</th>
            <td>150</td>
            <td>
              <span style={{ opacity: "0.5" }}>
                <BsFillCaretUpFill />
              </span>
            </td>
            <td className="text-left">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.{" "}
            </td>
          </tr>
          <tr>
            <th scope="row">200</th>
            <td>150</td>
            <td>
              <span style={{ opacity: "0.5" }}>
                <BsFillCaretUpFill />
              </span>
            </td>
            <td className="text-left">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.{" "}
            </td>
          </tr>
          <tr>
            <th scope="row">200</th>
            <td>150</td>
            <td>
              <span style={{ opacity: "0.5" }}>
                <BsFillCaretUpFill />
              </span>
            </td>
            <td className="text-left">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.{" "}
            </td>
          </tr>
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
      </table>
    </div>
  );
}

export default App;
