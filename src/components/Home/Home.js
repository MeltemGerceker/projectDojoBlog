import './Home.css';
import BlogList from '../BlogList/BlogList';
import useFetch from '../../customHooks/useFetch';

const Home = () => {
    const {data: blogs, isPending, error} = useFetch("http://localhost:8000/blogs");

    /*
    const handleDelete = (id) => {
        const filteredBlogs = blogs.filter((item) => item.id !== id);
        setBlogs(filteredBlogs);
    };
    */

    
    return (
        <div className="home">
            {
                error && <div>{error}</div>
            }
            {
                isPending && <div>Loading...</div>
            }
            {
                blogs && <BlogList title="All Blogs" blogs={blogs}/>
            }
        </div>
    );
}
 
export default Home;