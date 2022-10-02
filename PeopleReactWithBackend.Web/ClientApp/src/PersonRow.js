import React from 'react';

export default function PersonRow({ person, onEditButtonClick, onDeleteButtonClick, shouldBeDeleted, checked }) {
    const { firstName, lastName, age, id } = person;
    return (
        <tr>
            <td>
                <input checked={checked} onChange={shouldBeDeleted} className='form-control' type='checkbox' />
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <input type='hidden' name='id' value={id} />
                <button className='btn btn-sm btn-warning btn-block' onClick={onEditButtonClick}>Edit</button>
                <button className='btn btn-sm btn-danger btn-block' onClick={onDeleteButtonClick}>Delete</button>
            </td>
        </tr>

    )
}