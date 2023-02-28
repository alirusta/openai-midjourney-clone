import React, { useState, useEffect } from 'react';
import { Cards, Forms, Loader} from '../components';


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // get routes from backend:
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:6969/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        // check for good response:
        if (response.ok) {
          const result = await response.json();

          // reverse to show latest posts first:
          setAllPosts(result.data.reverse());
        }

      } catch (error) {
        alert(error);

      } finally {
        setLoading(false);
      };
    };

    fetchPosts();
  }, []);

  // implement search:
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.prompt.toLowerCase().includes(searchText.toLowerCase()));
  
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  // if data > 0, map it and render cards while passing all post data to each card:
  const CreateCards = ({data, title}) => {
    if (data?.length > 0) {
      return data.map((post) => <Cards key={post._id} {...post} />)
    };

    // else just return the title:
    return (
      <h2 className='mt-5 font-bold text-rose-500 text-2xl uppercase'>
        {title}
      </h2>
    )
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[32px] text-[#c1c1c1]'>
          Share your findings 👾
        </h1>
        <p className='mt-5 text-[#d8d8d8] text-[14px] max-w-[600px]'>
          View other user prompt results on this collective imageboard. Add yours for others to see!
        </p>
      </div>

      <div className='mt-16'>
        <Forms labelName='Search posts' type='text' name='text' placeholder='Search posts'
                value={searchText} handleChange={handleSearchChange} />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing results for <span className='text-[#222328]'>
                  {searchText}
                </span>
              </h2>
            )}

            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <CreateCards data={searchedResults} title='No search results found'/>
              ) : (
                <CreateCards data={allPosts} title='No posts found'/>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
};

export default Home