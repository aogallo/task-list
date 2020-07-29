import React, { useState, useEffect } from 'react';
import { TaskRow } from './components/TaskRow'
import { TaskBanner } from './components/TaskBanner';
import { TaskCreator } from './components/TaskCreator';
import { VisibilityControl } from './components/VisibilityControl';
import firebase from 'firebase'
import { ToastMessage } from './components/ToastMessage';

// import db from './Firebase';
// https://googleapis.dev/nodejs/firestore/latest/DocumentReference.html#delete

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDABpzhW2QJJof1uh0BWdW4qQosoOjrfbQ',
  authDomain: 'task-list-10919.firebaseapp.com',
  projectId: 'task-list-10919'
});

var db = firebase.firestore();

function App() {

  const [userName, setUserName] = useState('')
  const [taskItem, setTaskItem] = useState([])
  const [showCompleted, setShowCompleted] = useState(true);
  let data = [];
  let collections = db.collection('tasks');

  const getDocuments = async () => {
    await collections.onSnapshot((snapshot) => {
      const newTask = snapshot.docs.map((doc) => (
        {
          id: doc.id,
          ...doc.data()
        }
      ))
      // console.log("ya al fin", newTask)
      setTaskItem(newTask)
    })

  }

  useEffect(() => {
    setUserName('Allan')

    if (data.length <= 0) {
      // setTaskItem(JSON.parse(data));
      getDocuments();
    }
    // else {
    //   console.log("al cargar la data", data)
    // }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(taskItem));
  //   // getDocuments();
  // }, [taskItem])

  const toggleTask = task => {
    let ref = collections.doc(task.id);
    ref.update({
      done: !task.done
    }).then(() => {
      setTaskItem(taskItem.map(t => (t.name === task.name ? { ...t, done: !task.done } : t)))
    }).catch((error) => console.error("error", error))
  }

  const taskTableRows = doneValue => {
    return taskItem
      .filter(task => task.done === doneValue)
      .map(task =>
        (
          <TaskRow task={task} key={task.name}
            toggleTask={toggleTask}
            handleDelete={deleteTask} />
        )
      )
  }

  const deleteTask = id => {
    // console.log(id)
    collections
      .doc(id)
      .delete()
      .then(() => console.log('borrado'))
  }

  const createNewTask = task => {
    //   db.collection("users").add({
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815
    // })
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });

    if (!taskItem.find(t => t.name === task)) {
      collections.add({
        name: task,
        done: false
      }).then((docRef) => {
        setTaskItem([...taskItem, { name: task, done: false }]);
      }).catch((error) => console.error("Error", error));
    }
  }

  return (
    <div className="container">
      <TaskBanner userName={userName} taskItems={taskItem} />
      <TaskCreator callback={createNewTask} />
      <ToastMessage />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>
      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl
          description="Completed Task"
          isChecked={showCompleted}
          callback={checked => setShowCompleted(checked)}
        />
      </div>

      {
        showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default App;
