import React from 'react';

function User() {
  return (
    <div className="card" style={{width: "18rem", "paddingTop": "10px"}}>
      <img src="https://media-exp1.licdn.com/dms/image/C5603AQFjePXbNxBUAg/profile-displayphoto-shrink_800_800/0/1651714011617?e=1667433600&v=beta&t=hnxANu9HGou6nQM-jaUVUb4ZGySOAsv54P61HQdSTts" className="card-img-top" style={{"borderRadius": "10px"}} alt="Lucas Bonner"/>
      <div className="card-body">
        <h5 className="card-title">Lucas Bonner</h5>
        <p className="card-text">Call me beep me if you wanna reach me</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Email: lucas@bonner.com</li>
        <li className="list-group-item">Phone: 111-222-3333</li>
        <li className="list-group-item">Beep: 111-222-3333</li>
      </ul>
    </div>
  )
}

export default User;