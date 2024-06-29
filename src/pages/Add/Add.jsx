import { useState } from 'react';
// import images from '../../assets/assets';
import './Add.css';
import { addInterview } from '../../config/adminEndpoints';
import { toast } from 'react-toastify';
import { useEffect } from 'react';


const Add = () => {
//   const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    experience: 1,
    questions: [""]
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(data => ({ ...data, [name]: value }));
  };

  const onQuestionChange = (index, event) => {

    const newQuestions = [...data.questions];
    newQuestions[index] = event.target.value;
    setData({...data,questions: newQuestions} );
  };

// const onQuestionChange = (index, event) => {
//     setData(data => ({
//       questions: [...data.questions].map((question, i) => (i === index ? event.target.value : question))
//     }));
//   };
  

const addQuestion = () => {
    // Add a check to prevent adding empty questions
    if (data.questions[data.questions.length - 1].trim() !== "") {
      setData(data => ({ ...data, questions: [...data.questions, ""] }));
    } else {
      toast.warn("Please fill the existing question field before adding a new one.");
    }
  };

  const removeQuestion = (index) => {
    const newQuestions = data.questions.filter((_, i) => i !== index);
    setData(data => ({ ...data, questions: newQuestions }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    
    formData.append("title", data.title);
    formData.append("experience", data.experience);
    // formData.append("image", image);
    // formData.append("questions", JSON.stringify(data.questions));

    for (let i = 0; i < data.questions.length; i++) {
        formData.append(`questions[${i}]`, data.questions[i]);
      }
    
    for (var key of formData.entries()) {
        console.log(key[0] + ',fffffffgggggg ' + key[1]);
    }


    const response = await addInterview(formData);

    if (response?.success) {
      console.log(response);
      setData({
        title: "",
        experience: 1,
        questions: [""]
      });
    //   setImage(false);
      toast.success(response.message);
    } else {
      console.log("Failed", response.message);
      toast.error(response.message);
    }
  };

 

  

  return (
    <div className='w-[70%] ml-[max(5vw,25px)] mt-[50px] text-[#6d6d6d] text-[16px]'>
      <form onSubmit={onSubmitHandler} className='flexcol gap-5'>
        {/* <div className='flexcol'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img className='w-[120px]' src={image ? URL.createObjectURL(image) : images.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div> */}
        <div className='flexcol w-[max(40%,280px)]'>
          <p>Interview Title</p>
          <input onChange={onChangeHandler} value={data.title} required type="text" name='title' placeholder='Type here' />
        </div>
        <div className='flexcol w-[max(40%,280px)]'>
          <p>Experience Required</p>
          <select onChange={onChangeHandler} value={data.experience} name="experience">
            {[...Array(10).keys()].map(num => (
              <option key={num + 1} value={num + 1}>{num + 1}</option>
            ))}
          </select>
        </div>
        <div className='flexcol w-[max(40%,280px)]'>
          <p>Questions</p>
          {data.questions.map((question, index) => (
            <div key={index} className='flex gap-2 items-center'>
              <input
                type="text"
                value={question}
                onChange={(e) => onQuestionChange(index, e)}
                placeholder={`Question ${index + 1}`}
                className='flex-1'
                required
              />
              {data.questions.length>1?<button type="button" onClick={() => removeQuestion(index)}>Remove</button>:""}
            </div>
          ))}
          <button type="button" onClick={addQuestion}>Add Question</button>
        </div>
        <button className='max-w-[150px] p-[10px] bg-black text-white' type='submit'>ADD INTERVIEW</button>
      </form>
    </div>
  );
};

export default Add;
