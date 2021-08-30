import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Table from './Table';
import './Container.css';
import Loader from './Loader';
import Arrow from './Arrow';
import Description from './Description';
import FormAdd from './Form';
import InputForm from './InputForm';


const FullTable = () => {

    const [smallData, setSmallData] = useState([]);

    const [loader, setLoader] = useState(false);

    const infoArr = ['id', 'firstName', 'lastName', 'email', 'phone'];

    const [flag, setFlag] = useState(false);

    const [check, setCheck] = useState(false);

    const [value, setNewValue] = useState('');

    const [currentPage, setCurretPage] = useState(1);

    const [itemsPerPage] = useState(32);

    const [counter, setCounter] = useState(150);

    const [sortedInputData, setSortedInputData] = useState(null)

    const [newValue, setNewAddedValue] = useState(null);

    const [blockData, setBlockData] = useState({})
    let blockArr = [];
    blockArr.push(blockData)

    let lastItemIndex = currentPage * itemsPerPage;
    let firstItemIndex = lastItemIndex - itemsPerPage;
    let currentItem = smallData.slice(firstItemIndex, lastItemIndex);
    console.log(currentItem)
    let pageNumbers = [];

    for (let i = 0; i <= ( smallData.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const [input, setInput] = useState('');

    const [showForm, setShowForm] = useState(false);

    const [requesrUrl, setRequesrUrl] = useState(`http://www.filltext.com/?rows=${counter}&id={number|100}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}&page=${currentPage}`)
     console.log(requesrUrl)

     let howToSortBy = (data, flag) => {
       if(data == 'id') {
        if(flag) {
          smallData.sort((a, b) => {
            return a[data] - b[data];
        })
        } else {
          smallData.sort((a, b) => {
            return b[data] - a[data]
        }
          )}
       } else {
        if(flag) {
          smallData.sort((a, b) => a[data].localeCompare(b[data]))
        } else {
          smallData.sort((a, b) => b[data].localeCompare(a[data]))}

       }
  }

    const setValue = (data) => {
      {flag ? howToSortBy(data, flag) : howToSortBy(data, flag)} 
      setFlag(!flag)
      setCheck(!check);
      setNewValue(data)
    }

    let checker = check == false ? <Arrow className = 'arrow' /> : <Arrow className = 'arrow down' />;

    let displayInfo = infoArr.map((el => {
      return <th onClick = {() => setValue(el)} className={'info'} scope="col">{el} {el == value ? checker : ''}</th>
    }))

    useEffect(() => {
      setLoader(true);
      axios.get(requesrUrl).then((response) => {
        setSmallData(response.data);
        setLoader(false);
      })
    }, [requesrUrl]);

    let getSmallData = () => {
      setRequesrUrl(`http://www.filltext.com/?rows=${counter}&id={number|100}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}&page=${currentPage}`)
    }

    let getBigData = () => {
      setRequesrUrl(`http://www.filltext.com/?rows=300&id={number|300}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}&page=${currentPage}`)
    }
  
    

    
    

    let tableData = currentItem.map((el) => {
      return (<Table key = {el.phone} id = {el.id} firstName = {el.firstName} lastName = {el.lastName} email = {el.email} phone = {el.phone} 
        description = {el.description} adress = {el.address} setBlockData = {setBlockData} />)
  })

  newValue !== null && currentItem.push(newValue);

  let testTableData = newValue == null ? tableData : currentItem.map((el) => {
    return (<Table key = {el.phone} id = {el.id} firstName = {el.firstName} lastName = {el.lastName} email = {el.email} phone = {el.phone} 
      description = {el.description} adress = {el.address} setBlockData = {setBlockData} />)
})

   
   
    let getNumber = (number) => {
      setCurretPage(number)
    }

    let buttons = pageNumbers.map((el) => {
       return (<button onClick={() => getNumber(el)}>{el}</button>)
    })

    let getInputData = (text) => {
      setInput(text.currentTarget.value)
    }

    

    let findItem = () => {
      setSortedInputData(currentItem.filter(item => item.firstName.includes(input) || item.lastName.includes(input)
      || item.email.includes(input)).map((el) => {
        return (<Table key = {el.phone} id = {el.id} firstName = {el.firstName} lastName = {el.lastName} email = {el.email} phone = {el.phone} 
          setBlockData = {setBlockData} description = {el.description} adress = {el.address} />)
    }))
    }

    let showInputForm = () => {
      setShowForm(!showForm)
    }
  
    return (
      <div>
        <div className='choice_buttons'>
        <button onClick={getSmallData}>Small data</button>
        <button onClick={getBigData}>Big data</button>
        </div>
        
        <div>
          <input onChange = {getInputData} value = {input} />
          <button onClick = {() => findItem()}>Find</button>
        </div>
        <div className='add_block'>
          <button onClick={showInputForm}>Add Person</button>
        </div>

        <div className='parend_block'>
        {showForm == true ? <div className='input_block'><InputForm className='input_form' setNewAddedValue ={setNewAddedValue} /></div> : ''}

        </div>
        


      {loader == true ? <Loader /> : 
      <table className="table">
        <thead>
          <tr>
            {displayInfo}
          </tr>
        </thead>
        <tbody>
        {sortedInputData == null || input.length== 0 ? testTableData : sortedInputData}
        </tbody>  
      </table>
      }
      {Object.keys(blockData).length !== 0 ? blockArr.map((el) => {
        return (<Description adress = {el.adress} description = {el.description} />)}) : ''}
     
      <div className='pagination_block'>
      {buttons}
      </div>
      {console.log(smallData.length)}
      
      </div>

    )
      

    
}


export default FullTable
