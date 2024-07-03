import axiosInstanceWithInterceptor from "./axios";

const adminAxiosInstance = axiosInstanceWithInterceptor();

export const addInterview = async (formData) => {
  try {

    
    const { data } = await adminAxiosInstance.post("api/interview/add", formData, {headers: {
          'Content-Type': 'application/json'
        }});
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    }
  }
}

export const fetchList=async()=>{
  try {
    const{data}=await adminAxiosInstance.get('api/interview/interview-list')
    return data
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    }
  }
}

export const listStatus=async(id)=>{
  try {
    console.log(id,"gggggggg");
    const{data}=await adminAxiosInstance.patch(`api/interview/interview-list/status/${id}`)
    return data
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    }
  }
}