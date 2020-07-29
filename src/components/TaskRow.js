import React from 'react'


export const TaskRow = props => {

    const deleteTask = id => {
        props.handleDelete(props.task.id);
    }

    return (
        <tr key={props.task.name}>
            <td>
                {props.task.name}
            </td>
            <td>
                <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={props.task.done}
                    onChange={() => props.toggleTask(props.task)} />
            </td>
            <td>
                <button className="btn btn-danger" onClick={deleteTask}>Delete</button>
                <button className="btn btn-primary">Update</button>
            </td>
        </tr>
    )
};
