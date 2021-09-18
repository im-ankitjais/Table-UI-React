import "../../assets/css/Filter.css"
const Filter = (props) => {
    const {currency , page, perPage, filterText, setFilterText, changePage, changePerPage, changeCurrency} = props;
    const handleClear = () => {
        if (filterText) {
            setFilterText('');
        }
    };
    return (
        <div className="filter">
            <div className="filter_left">
                <div className="filter_search">
                    <input 
                        id="search"
                        type="text"
                        placeholder="Filter By Name"
                        aria-label="Search Input"
                        className="grid-search-input"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <button onClick={handleClear} type="button" className="grid-search-cross-button">
                        X
                    </button>
                </div>
                <div className="filter_option_currency">
                    <div className={currency === "INR"?"filter_option_button selected_option":"filter_option_button"} name="INR" onClick={(e) => changeCurrency(e)}>
                        INR
                    </div>
                    <div className={currency === "USD"?"filter_option_button selected_option":"filter_option_button"} name="USD" onClick={(e) => changeCurrency(e)}>
                        USD
                    </div>
                    <div className={currency === "EUR"?"filter_option_button selected_option":"filter_option_button"} name="EUR" onClick={(e) => changeCurrency(e)}>
                        EUR
                    </div>
                </div>
            </div>
            <div className="filter_right">
                <div>
                    <select 
                    className="filter_option_select"
                    name="slct"
                    id="slct" 
                    value={perPage}
                    onChange={(e) => changePerPage(e.target.value)} 
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div className="filter_option_page">
                    <div class="pagination">
                        <span aria-disabled onClick={() => changePage("prev")}>&laquo;</span>
                        <span onClick={() => changePage(1)} className={page === 1 ? "active": "" }>1</span>
                        <span onClick={() => changePage(2)} className={page === 2 ? "active": "" }>2</span>
                        <span onClick={() => changePage(3)} className={page === 3 ? "active": "" }>3</span>
                        <span onClick={() => changePage("next")}>&raquo;</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Filter;