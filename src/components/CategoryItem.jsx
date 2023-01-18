import { Link } from "react-router-dom";  
function CategoryItem(props) {
   const {idCategory, strCategory, strCategoryThumb, strCategoryDescription} = props;
   return(
      <div className="card">
         <div className="card-image">
            <img src={strCategoryThumb}  alt = {strCategory}/>
            <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
         </div>
         <div className="card-content">
            <h3 className="card-title"><b>{strCategory}</b></h3>
            <p>{strCategoryDescription.slice(0, 60)}...</p>
         </div>
         <div className="card-action">
            <Link  to = {`/category/${strCategory}`} className = "btn"> Watch Category</Link>
         </div>
    </div> 
   )
}
export default CategoryItem;