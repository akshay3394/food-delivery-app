import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBox() {

    const searchKeyWord = useRef()
    const navigate = useNavigate()

    function searchFoodItem(event) {
        event.preventDefault()
        
        const keyWord = searchKeyWord.current.value
        navigate(`/?search=${keyWord}`)
    }

    const [searchParam, setSearchParam] = useSearchParams()
    const search = searchParam.get("search")

    return (
        <div className="col-md-4 col-xs-8 offset-xs-2 " >
            <form onSubmit={searchFoodItem}>
                <div className="input-group">
                    <input className="form-control" type="search" placeholder="Search food items" defaultValue={search} ref={searchKeyWord} />
                    <button className="btn btn-outline-secondary" onClick={searchFoodItem}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </form>
        </div>
    )
}