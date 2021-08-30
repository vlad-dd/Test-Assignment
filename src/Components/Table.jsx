import React from 'react'

const Table = ({ id, firstName, lastName, email, phone, description, adress, setBlockData}) => {

  let getBlockInfo = () => {
    setBlockData({adress, description})
  }

    return (  
        <tr onClick = {() => getBlockInfo()}>
          <th scope="row">{id}</th>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{email}</td>
          <td>{phone}</td>
        </tr>
        
       
) 
}

export default Table
