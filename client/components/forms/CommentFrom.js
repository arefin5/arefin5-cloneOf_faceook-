
const CommentFrom=({addComment,setComment,comment})=>{
    return(
        <form onSubmit={addComment}>
        <input
          type="text"
          className="form-control"
          placeholder="Write Something ..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        
        <button className="btn btn-primary btn-sm btn-block mt-3">Submit</button>
      </form>
    )
}
export default CommentFrom;