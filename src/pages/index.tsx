import { FC, FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import { TodoistApi } from "@doist/todoist-api-typescript";
import axios from "axios";

import Layout from "@/components/Layout";
import Swal from "sweetalert2";

interface DataType {
  id: string;
  content: string;
  description: string;
  is_completed: boolean;
}

const Home: FC = () => {
  const MySwal = withReactContent(Swal);

  const [datas, setDatas] = useState<DataType[]>([]);

  const [objSubmit, setObjSubmit] = useState<DataType>({
    id: "",
    content: "",
    description: "",
    is_completed: false,
  });

  const token = "ba59c31e5eadc57fcd44f63624587250eafeead6";

  useEffect(() => {
    fetchData();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post("tasks", objSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        MySwal.fire({
          title: "Success",
          text: `Task Success to Add`,
          showCancelButton: false,
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  }

  function fetchData() {
    axios
      .get("tasks", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setDatas(response.data);
      })
      .catch(function (error) {});
  }

  function handleComplete(param: string) {
    axios
      .post(`tasks/${param}/close`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        MySwal.fire({
          title: "Success",
          text: `Task Was Changed to Complete`,
          showCancelButton: false,
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  }

  function handleDelete(param: string) {
    axios
      .delete(`tasks/${param}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        const { data } = response.data;
        MySwal.fire({
          title: "Success",
          text: `Task Success to Delete`,
          showCancelButton: false,
        });
      })
      .catch(function (error) {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  }

  return (
    <Layout>
      <div className="h-screen container mx-auto mt-10">
        <h1 className="text-5xl font-bold mt-10 text-center">Todos</h1>
        <div className=" container mx-auto">
          <div className="card flex-wrap">
            <section
              id="addTask"
              className=" w-full card-body rounded my-5  shadow-xl"
            >
              <div className=" py-5">
                <p className=" text-xl font-medium">Add a Task</p>
              </div>

              <form
                className="card flex-wrap "
                onSubmit={(event) => handleSubmit(event)}
              >
                <input
                  type="text"
                  placeholder="What do you want to do"
                  className="input w-full my-5"
                  onChange={(event) =>
                    setObjSubmit({
                      ...objSubmit,
                      content: event.target.value,
                    })
                  }
                />
                <textarea
                  placeholder="Describe here what do you want to do"
                  className="textarea textarea-bordered w-full my-5"
                  onChange={(event) =>
                    setObjSubmit({
                      ...objSubmit,
                      description: event.target.value,
                    })
                  }
                ></textarea>

                <button className="btn  bg-white text-red-600  border-white hover:bg-red-600 hover:border-red-600 hover:text-white btn-xs sm:btn-sm md:btn-md lg:btn-md btn-wide self-center mt-10">
                  Submit
                </button>
              </form>
            </section>

            <section
              id="task"
              className=" w-full card-body rounded my-5  shadow-xl"
            >
              <div className=" py-5">
                <p className=" text-xl font-medium">Task</p>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Status</th>
                      <th></th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.map((data) => {
                      return (
                        <tr>
                          <th>
                            <div className="flex items-center space-x-3">
                              <div>
                                <div className="font-bold">{data.content}</div>
                              </div>
                            </div>
                          </th>
                          <td>
                            {data.is_completed == false
                              ? "Not Completed"
                              : "Completed"}
                          </td>
                          <td>
                            <Link
                              to={`/detail/${data.id}`}
                              className="btn btn-ghost btn-xs text-primary"
                            >
                              Detail
                            </Link>
                          </td>
                          <th>
                            <button
                              className="btn btn-ghost btn-xs text-primary"
                              onClick={(event) => handleComplete(data.id)}
                            >
                              Complete
                            </button>
                            <button
                              className="btn btn-ghost btn-xs text-red-600"
                              onClick={(event) => handleDelete(data.id)}
                            >
                              Delete
                            </button>
                          </th>
                        </tr>
                      );
                    })}
                    {/* row 2 */}
                  </tbody>
                  {/* foot */}
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
