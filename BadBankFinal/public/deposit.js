function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <>
    <Card
      bgcolor="dark"
      header={(<img src="deposit.jpg" className="img-fluid" alt="Bad Bank Logo"/>)}
      title="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
    </>
  )
}

function DepositMsg(props){
  return (<>
    <h5>Successful Deposit!</h5>
    <button type="submit" 
      className="btn btn-info" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Make Another Deposit
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    fetch(`/account/update/${email}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter Email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Deposit Amount<br/>
    <input type="number" min="1"
      className="form-control" 
      placeholder="$0.00" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-info" 
      onClick={handle}>Deposit Funds</button>

  </>);
}