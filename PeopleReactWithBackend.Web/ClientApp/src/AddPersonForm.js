import React from 'react';

export default function AddPersonForm({ firstName, lastName, age, onTextChange, isAdding, onAddClick, onCancelButtonClick, onUpdateButtonClick, isEditing }) {
    return <div className='row'>
        <div className='col-md-3'>
            <input value={firstName} onChange={onTextChange} name='firstName' type='text'
                className="form-control" placeholder="First Name" />
        </div>
        <div className='col-md-3'>
            <input value={lastName} onChange={onTextChange} name='lastName' type='text'
                className="form-control" placeholder="Last Name" />
        </div>
        <div className='col-md-3'>
            <input value={age} onChange={onTextChange} name='age' type='text'
                className="form-control" placeholder="Age" />
        </div>
        <div hidden={isEditing} className='col-md-3'>
            <button disabled={isAdding} onClick={onAddClick} className='btn btn-primary btn-block'>Add</button>
        </div>
        <div hidden={!isEditing} className='col-md-3'>
            <button onClick={onUpdateButtonClick} className='btn btn-warning btn-block'>Update</button>
            <button onClick={onCancelButtonClick} className='btn btn-info btn-block'>Cancel</button>
        </div>
    </div>
}