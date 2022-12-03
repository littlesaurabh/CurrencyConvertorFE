
import axios from 'axios'
import { url } from '../backendURL'
import { useEffect, useState } from 'react'

export default function CurrencyCard() {

    const [currency, setCurrency] = useState([])
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const [convertedAmount, setConvertedAmount] = useState('')

    useEffect(() => {
        axios.get(`${url}/getRateAllToday`).then(res => {
            
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
        setError('')
        console.log(from,to,amount)
        if(from==to){
            setError("Invalid Conversion! Currency Can't be same.")
        }
        axios.get(`${url}/getRate/${to}/${from}`).then(res=>{
            console.log(res.data[0])
            Calculate(res.data[0].exchangeRate)
        }).catch(err=>{
                console.log(err)
        })
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
                        <td class="center" id="INR">{amount}</td>
                        <td class="center" id="USD">{convertedAmount}</td>
                    </tr>
                </tbody>
            </table>
              }

            </div>
            <div className="card-footer">
                <button class="btn btn-success btn-lg  w-25" onClick={Convert} >Convert</button>
                <div class="text-center text-danger" >
                    <span id="error">{error&&error}</span>
                </div>

            </div>
        </div>
    </>
}