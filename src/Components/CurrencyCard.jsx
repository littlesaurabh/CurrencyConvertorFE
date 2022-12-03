
import axios from 'axios'
import { url } from '../backendURL'
import { useEffect, useState } from 'react'
import { currency_list } from './curr'
import moment from 'moment';

export default function CurrencyCard() {

    const [currency, setCurrency] = useState([])
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [fromSymbol, setFromSymbol] = useState('')
    const [toSymbol, setToSymbol] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const [date, setDate] = useState(moment(new Date()).format('DD/MM/YYYY'))
    const [convertedAmount, setConvertedAmount] = useState('')
    const [currencylist,setCurrencyList]=useState(currency_list)
    useEffect(() => {
        axios.get(`${url}/getRateAll`).then(res => {
            
           PopulateUniqueValue(res.data)
        }).catch(err => {
            console.log(err)
        })

    }, [])

    const PopulateUniqueValue=(data)=>{
        let s=new Set()
        data.forEach(d=>{
            s.add(d.to)
        })
        console.log(s)
        setCurrency([...s])
    }
   
    const Convert=()=>{
        console.log( date, moment(new Date()).format('DD/MM/YYYY'))
        setFromSymbol(currencylist.find(c=> c.code==to))
        setToSymbol(currencylist.find(c=> c.code==from))
       console.log(fromSymbol,toSymbol)
        setError('')
        console.log(from,to,amount)
        if(from==to){
            setError("Invalid Conversion! Currency Can't be same.")
        }
       else{
        axios.get(`${url}/getRate/${to}/${from}`).then(res=>{
            let response=res.data
            response=response[response.length-1]
            if(res.data.length)
           {
            console.log(response)
            Calculate(response.exchangeRate)
            setDate(response.date)
           }else{
            setError("Conversion not available")
           }
        }).catch(err=>{
                console.log(err)
        })
       }
    }

    const Calculate=(exchangeRate)=>{
        setConvertedAmount(exchangeRate*amount)
    }
    return <>
        <div className="card" >
            <div className="card-header bg-dark">
                Currency Convertor
            </div>
            <div className="card-body">
                <div class="center currency">
                    <h1>Currency Convertor</h1>
                </div>
                <div className="mb-4" style={{ display: 'flex', gap: 100 }}>
                    <input value={amount} onChange={(e)=>setAmount(e.target.value)} class="input form-control" type="number" id="amount" placeholder="Amount" />
                    <select value={to} onChange={(e)=>setTo(e.target.value)} class="input2 center form-control" id="currency" >
                        <option value="" selected disabled>Convert From</option>
                        {
                            currency.map(c => {
                                return <option value={c}>{c}</option>
                            })
                        }
                    </select>
                    <select value={from} onChange={(e)=>setFrom(e.target.value)}  class="input2 center form-control" id="currency" >
                        <option value="" selected disabled>Convert To</option>
                        {
                            currency.map(c => {
                                return <option value={c}>{c}</option>
                            })
                        }
                    </select>
                </div>
                {/* <label class="bold" for="">Amount</label> */}

                {/* <label class="bold" for="">Currency</label> */}


              {
                convertedAmount&&  <table class="table table-bordered table responsive">
                <thead>
                    <tr>
                        <th style={{ width: 200 }}>
                          {to} 
                      
                        </th>
                        
                        <th style={{ width: 200 }}>
                            {from}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="center" id="to">{fromSymbol.symbol}{amount}</td>
                        <td class="center" id="from">{toSymbol.symbol}{convertedAmount}</td>
                    </tr>
                </tbody>
            </table>
              }

            </div>
            <div className="card-footer">
                <button class="btn btn-success btn-lg  w-25" onClick={Convert} >Convert</button>
                <div class="text-center text-danger" >
                    <span id="error">{error&&error}</span>
                    <span id="error2">{date!= moment(new Date()).format('DD/MM/YYYY')?`Rates are from date ${date}`:''}</span>
                </div>

            </div>
        </div>
    </>
}