import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchList, listStatus } from "../../config/adminEndpoints";

const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetchList();

    if (response.success) {
      console.log(response.data);
      setData(response.data);
    } else {
      toast.error(response.message);
    }
  };

  const handleListToggle=async(id)=>{
console.log(id,"lllllllll");
    const response=await listStatus(id)

    if(response.success){
      setData(data.map(item=>item._id===id?{...item,listed:response.listed}:item))
      //we can use fetchData instead of this to update and reload
      toast.success(`Interview ${response.listed ? 'listed' : 'unlisted'} successfully`);
    }
    else {
      toast.error(response.message);
    }
  }

  const formattedDate = (dates) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(dates));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-prime font-bold mb-4">Interviews</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xl text-secondary font-semibold">Title</th>
              <th className="px-4 py-2 text-left text-xl text-secondary font-semibold">Years of Experience</th>
              <th className="px-4 py-2 text-left text-xl text-secondary font-semibold">No of Qstns</th>
              <th className="px-4 py-2 text-left text-xl text-secondary font-semibold">Created Date</th>
              <th className="px-4 py-2 text-left text-xl text-secondary font-semibold">Action</th>
              <th className="px-4 py-2 text-left text-xl text-secondary font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.experience}</td>
                <td className="px-4 py-2">{item.questions.length}</td>
                <td className="px-4 py-2">{formattedDate(item?.createdAt)}</td>
                <td className="px-4 py-2">
                  <button  className=' text-prime px-4 py-2 rounded '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
</button>

                </td>
                <td className="px-4 py-2">
                  <button onClick={()=>{handleListToggle(item._id)}} className={`${item.listed ? "bg-green-500" : "bg-red-500"} text-white px-4 py-2 rounded `}>
  {item.listed ? "listed" : "unlisted"}
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
