import React from 'react';

const Forms = ({ labelName, type, name, placeholder, value, handleChange, isRandom_PP, handleRandom_PP }) => {
  return (
    <div>
        <div className='flex items-center gap-2 mb-2'>
            <label htmlFor={name} className='block text-sm font-medium text-gray-900'>
                {labelName}
            </label>

            {isRandom_PP && (
                <button type='button' onClick={handleRandom_PP}
                        className='font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black'>
                    Let There Be Magic✨
                </button>
            )}
        </div>

        <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={handleChange} required
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'/>
    </div>
  )
};

export default Forms