import React, {useState, useEffect, useReducer} from 'react'
import Reducer, { Actions } from "./Reducer";
import { DataService } from '../../Services/DataService';
import "../../assets/css/TableRow.css";
import Head from "./Head";
import Filter from './Filter';
import MenuIcon from "../../assets/icons/menu-vertical.png";
import ExternalLinkIcon from "../../assets/icons/external-link.png";
import AnalyzeIcon from "../../assets/icons/analyze.png";
import Error from "../Error/Error";
import Loader from '../Loader/Loader';
//initial state for reducer
const initialState = {
    loading: false,
    data: [],
    currency: 'USD',
    page: 1,
    perPage: 10,
    error: null
};
// serivice class for api operations
const dataService = new DataService();
const Grid = () => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const [filterText, setFilterText] = useState('');
    const getData = async (currency,page,perPage) => {
        try {
            dispatch({
                type: Actions.SET_LOADING,
                payload: true
            });
            // fetching data from api
            const data = await dataService.getData(currency,page,perPage);
            if(data && data.length > 0){
                dispatch({
                    type: Actions.SET_DATA,
                    payload: data
                });
                dispatch({
                    type: Actions.SET_LOADING,
                    payload: false
                });
            }
        } catch (error) {
            dispatch({
                type: Actions.SET_LOADING,
                payload: false
            });
            dispatch({
                type: Actions.SET_ERROR,
                payload: error.message || "Error In Getting Data.",
            });
        }
    }
    useEffect(() => {
        getData(state.currency,state.page,state.perPage);
    },[state.currency,state.page,state.perPage])
    function changePage(payload){
        let page;
        let currentPage = state.page;
        if(payload === "prev" && currentPage > 1) {
            page = --currentPage;
        }else if(payload === "next" && currentPage < 3){
            page = ++currentPage;
        }else if(typeof payload === 'number'){
            page = payload;
        }else{
            return;
        }
        dispatch({
            type: Actions.SET_PAGE,
            payload: page
        });   
    }
    function changePerPage(perPage){
        dispatch({
            type: Actions.SET_PER_PAGE,
            payload: perPage
        });
    }
    function changeCurrency(e){
        let targetCurrency = e.target.getAttribute("name");
        if(e.target.value === "INR" || e.target.value === "USD" || e.target.value === "EUR"){
            targetCurrency = e.target.value;
        }
        dispatch({
            type: Actions.SET_CURRENCY,
            payload: targetCurrency
        });
    }
    function setError(error=null){
        dispatch({
            type: Actions.SET_ERROR,
            payload: error
        });
    }
    return (
        <>
        <Filter
            currency={state.currency}
            page={state.page}
            perPage={state.perPage} 
            filterText={filterText} 
            setFilterText={setFilterText}
            changePage={changePage}
            changePerPage={changePerPage}
            changeCurrency={changeCurrency}
        />
        <div className="table">
            <Head currency={state.currency} />

            {!state.loading && state.data
                .filter((item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()))
                .map((item) => (
                    <Row currency={state.currency} item={item} />
            ))}

            {state.loading && (
                <Loader />
            )}
        </div>
        {state.error !== null && <Error error={state.error} setError={setError} />}
        </>
    )
}
export default Grid

const Row = ({currency, item}) => {
    const symbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : "€";
    const increase = item.price_change_percentage_24h > 0;
    const [ showMenu, setShowMenu ] = useState(false);
    return (
        <div className={showMenu? "table_row":"table_row transition"}>
            <div className="swd align-center">
            {item.market_cap_rank}
            </div>
            <div className="lwd align-left">
                <div className="crypto-info">
                    <div className="crypto-info__img">
                        <img src={item.image} alt="Coin Img" />
                    </div>
                    <div className="crypto-info__basic">
                        <h5 className="crypto-info_symbol">{item.name}</h5>
                        <p className="crypto-info_name text-muted mb-0">{`@ ${item.symbol}`}</p>
                    </div>
                </div>
            </div>
            <div className={`wd align-center ${increase? "up":"down"}`}>
            <span className={`${increase? "success-circle":"danger-circle"}`}> </span> 
                {item.price_change_percentage_24h}
            </div>
            <div className="wd align-right">{`${symbol} ${item.current_price}`}</div>
            <div className="wd align-center">{item.market_cap}</div>
            <div className="swd align-center" onClick={() => setShowMenu(prev => !prev)} >
                <div className="action-menu">
                    <img src={MenuIcon} alt="icon" />
                    <ul className={`dropdown-content ${showMenu ? "show": "hide"}`}>
                        <li  style={{cursor: "pointer"}} >
                            <span className="dropdown-item">
                                <img src={ExternalLinkIcon} alt="icon" style={{marginRight: "12px" }} />
                                Buy / Sell
                            </span>
                        </li>
                        <li style={{cursor: "pointer"}} >
                            <span className="dropdown-item">
                                <img src={AnalyzeIcon} alt="icon" style={{marginRight: "10px" }} />
                                Analyze
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}