import { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { getAllCategories } from "../api"
import CategoryList from "../components/CategoryList"
import Loader from "../components/Loader"
import Search  from "../components/Search"

export default function Home() {
   const [catalog, setCatalog] = useState([])
   const [filteredCatalog, setFilteredcatalog] = useState([ ])
   
   const {patname, search} = useLocation()
   const {push} = useHistory()
   
   const handleSearch = (str) => {
      setFilteredcatalog(catalog.filter(item => item.strCategory.toLowerCase().includes(str.toLowerCase())))
      push({
         patname,
         search: `?search=${str}`
      })
   }



   useEffect(() => {
      getAllCategories().then(data => {
         setCatalog(data.categories)
         setFilteredcatalog(search ? data.categories.filter(item => item.strCategory.toLowerCase().includes(search.split()[1].toLocaleLowerCase()) 
         ): data.categories)
      })
   }, [search])

   return(
     <>
         <Search cb={handleSearch}/>
        {!catalog.length ? (
            <Loader/>
         ):(
            <CategoryList catalog = {filteredCatalog}/>
         )}
     </>
   )
   
}