import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { random_PP } from '../utilities';
import { Forms, Loader } from '../components';

const Create = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  });

  const [genImage, setGenImage] = useState(false);
  const [loading, setLoading] = useState(false);

  // setup dalle try/fetch:
  const generateImage = async () => {
    if (form.prompt) {

      try {
        setGenImage(true);

        const response = await fetch('http://localhost:6969/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt })
        })

        const data = await response.json();

        // save & render fetched image:
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`});

      } catch (error) {
        alert(error);

      } finally {
        setGenImage(false);
      };

    } else {
      alert('No prompt, no magic. 💀');
    };
  };

  // setup post try/fetch:
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:6969/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // created posts from postRoutes (line 39):
          body: JSON.stringify(form)
        });

        await response.json();

        // go back to home to see created post:
        navigate('/');

      } catch (err) {
        alert(err);

      } finally {
        setLoading(false);
      };

    } else {
      alert('No prompt, no magic. 💀');
    };
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleRandom_PP = () => {
    const randomPP = random_PP(form.prompt);
    setForm({...form, prompt: randomPP});
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[36px] text-[#c1c1c1]'>
          Create something amazing 💦
        </h1>
        <p className='mt-5 text-[#d8d8d8] text-[16px] max-w-[650px]'>
        Utilize the capabilities of DALL-E AI to produce captivating and imaginative visuals.
        </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <Forms labelName='Enter your name'
                type='text' name='name'
                placeholder='NFT-Warrior . . .'
                value={form.name}
                handleChange={handleChange} />

          <Forms labelName='Enter a prompt or'
                type='text' name='prompt'
                placeholder='Spongebob Squarepants in the Blair Witch Project'
                value={form.prompt}
                handleChange={handleChange}
                isRandom_PP
                handleRandom_PP={handleRandom_PP} />
          
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
            ) : (
              <img src={preview} alt='preview' className='w-9/12 h-9/12 object-contain opacity-40' />
            )}

            {genImage && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
            <button type='button' onClick={generateImage}
                    className='text-white bg-pink-600 hover:bg-pink-500 active:bg-pink-700 font-medium rounded-md text-md w-full sm:w-[256.5px] px-5 py-2.5 text-center'>
              {genImage ? 'Magic in progress...' : 'Generate 🎨'}
            </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#d8d8d8] text-[14px]'>
            Exchange your discoveries with other Dall-E enthusiasts on our imageboard.
          </p>

          <button type='submit'
                  className='mt-3 text-white bg-[#6964ff] hover:bg-[#7e79ff] active:bg-[#453fff] font-medium rounded-md text-md w-full sm:w-[502px] px-5 py-2.5 text-center'>
            {loading ? 'Even more magic in progress...' : 'Share with us 💖'}  
          </button>
        </div>
      </form>
    </section>
  )
};

export default Create;