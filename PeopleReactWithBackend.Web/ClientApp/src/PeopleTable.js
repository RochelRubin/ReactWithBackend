import React from 'react';
import AddPersonForm from './AddPersonForm';
import axios from 'axios';
import PersonRow from './PersonRow';
class PeopleTable extends React.Component {
    state = {
        person: {
            id: '',
            firstName: '',
            lastName: '',
            age: ''
        },
        people: [],
        toDelete: [],
        isEditing: false
    }
    componentDidMount() {
        this.getAllPeople();
    }
    getAllPeople = () => {
        axios.get('/api/people/getall').then(obj => {
            this.setState({
                people: obj.data,
                person: {
                    firstName: '',
                    lastName: '',
                    age: '',
                }
            })
        });
    }
    onAddClick = () => {
        axios.post('/api/people/addperson', this.state.person).then(() => {
            this.getAllPeople();
        })
    }
    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }
    onEditButtonClick = p => {
        this.setState({ person: p });
        this.setState({ isEditing: true });
    }
    onDeleteButtonClick = person => {
        axios.post('/api/people/deleteperson', person).then(() => {
            this.getAllPeople();
        })
    }
    onUpdateButtonClick = person => {
        axios.post('/api/people/updateperson', person).then(() => {
            this.getAllPeople();
            this.setState({ isEditing: false });
        })
    }
    onCancelButtonClick = () => {
        this.getAllPeople();
        this.setState({ isEditing: false });
    }
    deleteAll = () => {
        const {toDelete} = this.state;
        toDelete.forEach(p => {this.onDeleteButtonClick(p)});
        this.getAllPeople();
    }
    checkAll = () => {        
        const { people } = this.state;
        const copy = [];
        people.forEach(p => copy.push(p));
        this.setState({ toDelete: copy })        
    }
    uncheckAll = () => {      
        this.setState({ toDelete: [] });
    }
    shouldBeDeleted = person => {
        const { toDelete } = this.state;
        if (toDelete.includes(person)) {
            this.setState({ toDelete: toDelete.filter(td => td.id !== person.id) })
        }
        else {
            this.setState({ toDelete: [...toDelete, person] })
        }
    }
    generateTable = () => {
        const { people, toDelete } = this.state;
        return <table className='table table-fit table-bordered table-striped mt-3 '>
            <thead>
                <tr>
                    <th className='col-md-1'>
                        <button className='btn btn-danger btn-block' onClick={this.deleteAll}>Delete All</button>
                        <button className='btn btn-info btn-block' onClick={this.checkAll}>Check All</button>
                        <button className='btn btn-info btn-block' onClick={this.uncheckAll}>Uncheck All</button>
                    </th>
                    <th className='col-md-1'>First Name</th>
                    <th className='col-md-1'>Last Name</th>
                    <th className='col-md-1'>Age</th>
                    <th className='col-md-1'>Edit/Delete</th>
                </tr>
            </thead>
            <tbody>
                {people.map(p =>
                    <PersonRow
                        person={p}
                        key={p.id}
                        onEditButtonClick={() => this.onEditButtonClick(p)}
                        onDeleteButtonClick={() => this.onDeleteButtonClick(p)}
                        shouldBeDeleted={() => this.shouldBeDeleted(p)}
                        checked={toDelete.includes(p)} />)}
            </tbody>
        </table>
    }

    render() {
        const { person, isEditing } = this.state;
        const { firstName, lastName, age } = person;
        return (
            <div className='container mt-5'>
                <AddPersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    onUpdateButtonClick={() => this.onUpdateButtonClick(person)}
                    onCancelButtonClick={this.onCancelButtonClick}
                    isEditing={isEditing} />
                {this.generateTable()}
            </div>
        );
    }
}

export default PeopleTable;