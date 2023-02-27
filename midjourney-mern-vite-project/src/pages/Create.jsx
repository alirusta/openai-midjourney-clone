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
    image: ''
  });
  const [genImage, setGenImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = () => {

  };

  const handleSubmit = () => {

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
        <h1 className='font-extrabold text-[32px] text-[#222328]'>
          Create💦 
        </h1>
        <p className='mt-5 text-[#666e75] text-[14px] max-w-[600px]'>
        Utilize the capabilities of DALL-E AI to produce captivating and imaginative visuals and share them with others.
        </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <Forms labelName='Your name'
                type='text' name='name'
                placeholder='NFT-Warrior...'
                value={form.name}
                handleChange={handleChange} />

          <Forms labelName='Prompt'
                type='text' name='prompt'
                placeholder='Spongebob Squarepants in the Blair Witch Project'
                value={form.prompt}
                handleChange={handleChange}
                isRandom_PP
                handleRandom_PP={handleRandom_PP} />
          
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.image ? (
              <img src={form.image} alt={form.prompt} className='w-full h-full object-contain' />
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
                    className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
              {genImage ? 'Magic in progress...' : 'Generate'}
            </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>
            Upon successfully producing the image of your preference, you can disseminate it among fellow users on our imageboard
          </p>

          <button type='submit'
                  className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {loading ? 'Even more magic in progress...' : 'Share with others!'}  
          </button>
        </div>
      </form>
    </section>
  )
};

export default Create;