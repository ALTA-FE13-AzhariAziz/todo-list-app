import { FC, FormEvent, useState, useEffect } from "react";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "@/utils/swal";
import { Link } from "react-router-dom";

import Layout from "@/components/Layout";

interface DataType {
  id: string;
  content: string;
  description: string;
}

const Detail: FC = () => {
  const params = useParams();
  const token = "ba59c31e5eadc57fcd44f63624587250eafeead6";
  const [data, setDatas] = useState<DataType>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [objSubmit, setObjSubmit] = useState<Partial<DataType>>({});
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    const { id } = params;

    axios
      .get(`tasks/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setDatas(response.data);
        console.log(response.data);
      })
      .catch(function (error) {});
  }

  function handleChange(value: string, key: keyof typeof objSubmit) {
    let temp = { ...objSubmit }; // duplikat state objSubmit yang nantinya akan dimutasi nilainya
    temp[key] = value;
    // temp["username"] = data.username;
    setObjSubmit(temp);
    console.log("temp", temp);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const { id } = params;

    event.preventDefault();
    // const formData = new FormData();
    // let key: keyof typeof objSubmit;
    // console.log(objSubmit);
    // for (key in objSubmit) {
    //   formData.append(key, objSubmit[key]);
    //   console.log(key, objSubmit[key]);
    // }
    // console.log(formData);
    axios
      .post(`tasks/${id}`, objSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
        setIsEdit(false);
        setObjSubmit({});
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

  return (
    <Layout>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <Link
              to={"/"}
              className="btn  bg-white text-red-600  border-white hover:bg-red-600 hover:border-red-600 hover:text-white btn-xs sm:btn-sm md:btn-md lg:btn-md btn-wide self-center mt-10"
            >
              Back
            </Link>
            <h1 className="text-5xl font-bold mt-10">{data?.content}</h1>
            <p className="py-6">{data?.description}</p>

            <label
              htmlFor="my-modal-3"
              className="btn  bg-red-600 text-white  border-white hover:bg-red-600 hover:border-red-600 hover:text-white btn-xs sm:btn-sm md:btn-md lg:btn-md btn-wide self-center mt-10"
            >
              Edit
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-slate-200">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-lg font-bold mb-5">Edit Task</h1>

          <form onSubmit={(event) => handleSubmit(event)}>
            <label className="mt-5"> Title Task</label>
            <input
              type="text"
              defaultValue={data?.content}
              placeholder="What do you want to do"
              className="input w-full mb-5"
              onChange={(event) => handleChange(event.target.value, "content")}
            />
            <label className="mt-5"> Describe your Task</label>
            <textarea
              defaultValue={data?.description}
              placeholder="Describe here what do you want to do"
              className="textarea textarea-bordered w-full "
              onChange={(event) =>
                handleChange(event.target.value, "description")
              }
            ></textarea>
            <button className="btn  bg-white text-red-600  border-white hover:bg-red-600 hover:border-red-600 hover:text-white btn-xs sm:btn-sm md:btn-md lg:btn-md btn-wide self-center mt-10">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
