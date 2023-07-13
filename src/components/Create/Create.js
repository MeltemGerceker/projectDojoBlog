import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Create.css';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        //console.log(blog);

        setIsPending(true);

        fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("new blog added.");
            setIsPending(false);
            //history.go(-1);   // go to the previous page
            history.push("/");  // go to the home page
        });

        
    };

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="blog-title">Blog title:</label>
                <input type="text" id="blog-title" value={title} onChange={(e) => setTitle(e.target.value)} required/>

                <label htmlFor="blog-body">Blog body:</label>
                <textarea name="blog-body" id="blog-body" cols="30" rows="10" value={body} onChange={(e) => setBody(e.target.value)} required></textarea>

                <label htmlFor="blog-author">Blog author:</label>
                <select name="blog-author" id="blog-author" value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>

                { !isPending && <button>Add Blog</button> }
                { isPending && <button disabled>Adding ...</button>}
               
            </form>
        </div>
     );
}
 
export default Create;