import React from 'react'

const Description = ({adress, description}) => {
    return (
      adress == undefined ? <div>No information about this person</div> :
      <div>
      <div className='description_block'>
          <div>
            <div>streetAddress: {adress.streetAddress} </div>
            <div>city: {adress.city}</div>
            <div>state: {adress.state}</div>
            <div>zip: {adress.zip}</div>
          </div>
          <div>
            <span>Description: {description} </span>
          </div>
        </div>
          </div>
    
    )
}

export default Description
