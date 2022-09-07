import React from 'react';

function Pet({requiredPetFields}) {
  return (
      <div>pet goes here { requiredPetFields.owner }</div>
  )
}

export default Pet;