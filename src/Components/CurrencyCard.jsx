export default function CurrencyCard() {
    return <>
        <div className="card" >
            <div className="card-header bg-dark">
                Currency Convertor
            </div>
            <div className="card-body">
                <div class="center currency">
                    <h1>Currency Convertor</h1>
                </div>
                <div className="input mb-4">
                <input class="input form-control" type="number" id="amount"  placeholder="Amount"  />
                <select class="input2 center form-control" id="currency" >
                    <option value="" selected disabled>Convert To</option>
                    {/* <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EURO">EURO</option>
                    <option value="POUND">POUND</option> */}
           
                </select>
                </div>
                {/* <label class="bold" for="">Amount</label> */}
                
                {/* <label class="bold" for="">Currency</label> */}
               

                <table  class="table table-bordered table responsive">
                    <thead>
                        <tr>
                            <th >
                                INR
                            </th>
                            <th >
                                USD
                            </th>
                            <th >
                                EURO
                            </th>
                            <th>
                                POUND
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="center" id="INR">0</td>
                            <td class="center" id="USD">0</td>
                            <td class="center" id="EURO">0</td>
                            <td class="center" id="POUND">0</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div className="card-footer">
                <button class="btn btn-success btn-lg  w-25" >Convert</button>
                <div class="text-center">
                    <span id="error"></span>
                </div>

            </div>
        </div>
    </>
}