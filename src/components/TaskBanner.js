import React from 'react'

export const TaskBanner = props => (
    <h4 className="bg-primary text-white text-center p-4 ">
        {props.userName}'s Task App ({props.taskItems.filter(task => task.done === false).length} tasks to do)
    </h4>
)